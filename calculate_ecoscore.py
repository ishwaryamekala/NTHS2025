from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import fitz  # PyMuPDF
import re
import os
import pandas as pd
from sklearn.linear_model import LinearRegression

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Training data and models
training_data = {
    "electricity": [200, 500, 800, 1200, 1500, 1800, 2200, 2500, 3000],
    "water": [500, 700, 900, 1100, 1300, 1500, 2000, 2500, 3000],
    "carbon_footprint": [180, 450, 700, 1050, 1400, 1700, 2100, 2500, 3000],
    "eco_score": [20, 18, 16, 12, 9, 7, 5, 3, 1]
}

df = pd.DataFrame(training_data)
carbon_model = LinearRegression()
carbon_model.fit(df[['electricity', 'water']], df['carbon_footprint'])

eco_model = LinearRegression()
eco_model.fit(df[['electricity', 'water']], df['eco_score'])

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    document = fitz.open(pdf_path)
    text = " ".join(page.get_text("text") for page in document)
    return text

# Parse utility bill data
def parse_utility_data(text):
    electricity = re.findall(r"(\d[\d,]*)\s*KWH", text, re.IGNORECASE)
    water = re.findall(r"(\d[\d,]*)\s*CGAL", text, re.IGNORECASE)

    electricity_usage = int(electricity[0].replace(',', '')) if electricity else 0
    water_usage = int(water[0].replace(',', '')) if water else 0
    return electricity_usage, water_usage

# Calculate carbon footprint
def calculate_carbon_footprint(electricity, water, e_waste):
    return electricity * 0.92 + water * 0.001 + e_waste * 1.5

# Calculate eco score
def calculate_eco_score(electricity, water):
    input_data = pd.DataFrame([[electricity, water]], columns=['electricity', 'water'])
    eco_score = eco_model.predict(input_data)[0]

    eco_score = max(1, min(20, round(eco_score)))
    if electricity > 1000:
        eco_score = max(1, eco_score - 3)
    if water > 1200:
        eco_score = max(1, eco_score - 2)
    return eco_score

# Provide sustainability suggestions
def provide_suggestions(electricity, water, e_waste):
    suggestions = []
    if electricity > 800:
        suggestions.append("Reduce electricity usage (switch to LED, use power-saving modes).")
    if water > 1000:
        suggestions.append("Reduce water usage (fix leaks, use efficient appliances).")
    if e_waste > 10:
        suggestions.append("Recycle e-waste properly or donate old electronics.")
    return suggestions

@app.route("/upload", methods=["POST"])
def upload_pdf():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    text = extract_text_from_pdf(file_path)
    electricity, water = parse_utility_data(text)
    e_waste = 5  # Assume user input for now

    carbon_footprint = calculate_carbon_footprint(electricity, water, e_waste)
    eco_score = calculate_eco_score(electricity, water)
    suggestions = provide_suggestions(electricity, water, e_waste)

    return jsonify({
        "electricity": electricity,
        "water": water,
        "carbon_footprint": round(carbon_footprint, 2),
        "eco_score": eco_score,
        "suggestions": suggestions
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
