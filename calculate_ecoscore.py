import fitz  # PyMuPDF
import re
import pandas as pd
from sklearn.linear_model import LinearRegression

# Function to extract text directly from a PDF
def extract_text_from_pdf(pdf_path):
    document = fitz.open(pdf_path)
    text = " ".join(page.get_text("text") for page in document)  # Extract text from all pages
    return text

# Function to parse extracted text
def parse_utility_data(text):
    electricity = re.findall(r"(\d[\d,]*)\s*KWH", text, re.IGNORECASE)
    water = re.findall(r"(\d[\d,]*)\s*CGAL", text, re.IGNORECASE)

    electricity_usage = int(electricity[0].replace(',', '')) if electricity else 0
    water_usage = int(water[0].replace(',', '')) if water else 0
    return electricity_usage, water_usage

# Function to calculate carbon footprint
def calculate_carbon_footprint(electricity, water, e_waste):
    return electricity * 0.92 + water * 0.001 + e_waste * 1.5

# Training dataset with diverse values
training_data = {
    "electricity": [200, 500, 800, 1200, 1500, 1800, 2200, 2500, 3000],
    "water": [500, 700, 900, 1100, 1300, 1500, 2000, 2500, 3000],
    "carbon_footprint": [180, 450, 700, 1050, 1400, 1700, 2100, 2500, 3000],
    "eco_score": [20, 18, 16, 12, 9, 7, 5, 3, 1]  # Lower score for higher usage
}

df = pd.DataFrame(training_data)

# Train ML models
carbon_model = LinearRegression()
carbon_model.fit(df[['electricity', 'water']], df['carbon_footprint'])

eco_model = LinearRegression()
eco_model.fit(df[['electricity', 'water']], df['eco_score'])

# Function to calculate eco-score with adjustments
def calculate_eco_score(electricity, water):
    input_data = pd.DataFrame([[electricity, water]], columns=['electricity', 'water'])
    eco_score = eco_model.predict(input_data)[0]

    # Scale the score between 1-20 and apply penalty for high usage
    eco_score = max(1, min(20, round(eco_score)))
    if electricity > 1000:
        eco_score = max(1, eco_score - 3)  # Apply penalty for high electricity usage
    if water > 1200:
        eco_score = max(1, eco_score - 2)  # Apply penalty for high water usage
    return eco_score

# Function to provide suggestions
def provide_suggestions(electricity, water, e_waste):
    suggestions = []
    if electricity > 800:
        suggestions.append("Reduce electricity usage (switch to LED, use power-saving modes).")
    if water > 1000:
        suggestions.append("Reduce water usage (fix leaks, use efficient appliances).")
    if e_waste > 10:
        suggestions.append("Recycle e-waste properly or donate old electronics.")
    return suggestions

# Main function
def main():
    pdf_path = "input/utility_bill.pdf"
    text = extract_text_from_pdf(pdf_path)
    electricity, water = parse_utility_data(text)
    e_waste = 5  # Assume a fixed or user-provided e-waste weight

    carbon_footprint = calculate_carbon_footprint(electricity, water, e_waste)
    eco_score = calculate_eco_score(electricity, water)
    suggestions = provide_suggestions(electricity, water, e_waste)

    print(f"Electricity: {electricity} kWh, Water: {water} gallons, E-Waste: {e_waste} kg")
    print(f"Carbon Footprint: {carbon_footprint:.2f} kg CO2")
    print(f"Eco-Score: {eco_score}/20")
    print("Suggestions:", suggestions if suggestions else "No suggestions needed!")

if __name__ == "__main__":
    main()
