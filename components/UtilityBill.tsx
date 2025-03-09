import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { db, auth } from "../firebaseConfig"; 
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore"; 

export default function UtilityBill() {
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [ecoScore, setEcoScore] = useState<number | null>(null);
  const [carbonFootprint, setCarbonFootprint] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
      if (result && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const uploadDocument = async () => {
    if (!selectedFile || !auth.currentUser) return;
  
    setLoading(true);
    const formData = new FormData();
  
    try {
      const response = await fetch(selectedFile.uri);
      const blob = await response.blob();
  
      formData.append("file", blob, selectedFile.name);
  
      const apiResponse = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      const newEcoScore = apiResponse.data.eco_score;
      setEcoScore(newEcoScore);
      setCarbonFootprint(apiResponse.data.carbon_footprint);
      setSuggestions(apiResponse.data.suggestions);
  
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists()) {
        const currentEcoScore = userDoc.data().ecoScore || 0;
        await updateDoc(userRef, {
          ecoScore: Number(currentEcoScore) + Number(newEcoScore),
        });
      } else {
        await setDoc(userRef, { ecoScore: newEcoScore });
      }
  
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your Utility Bill</Text>
      <Text style={styles.subtitle}>
        Analyze your electricity and water usage to calculate your environmental impact.
      </Text>

      <View style={styles.card}>
        <TouchableOpacity style={styles.button} onPress={pickDocument}>
          <Text style={styles.buttonText}>📄 Select PDF</Text>
        </TouchableOpacity>

        {selectedFile && (
          <TouchableOpacity style={styles.button} onPress={uploadDocument}>
            <Text style={styles.buttonText}>Analyze</Text>
          </TouchableOpacity>
        )}

        {loading && <ActivityIndicator size="large" color="#2F6031" style={styles.loading} />}
      </View>

      {ecoScore !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Results</Text>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Eco Score:</Text>
            <Text style={styles.resultValue}>{ecoScore}/20</Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Carbon Footprint:</Text>
            <Text style={styles.resultValue}>{carbonFootprint} kg CO₂</Text>
          </View>

          <Text style={styles.suggestionsTitle}>Suggestions:</Text>
          {suggestions.length > 0 ? (
            suggestions.map((s, index) => (
              <Text key={index} style={styles.suggestionText}>• {s}</Text>
            ))
          ) : (
            <Text style={styles.suggestionText}>No suggestions needed! ✅</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    backgroundColor: "#F4FAF1", // Light green eco-friendly background
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2F6031", // Deep green for contrast
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#4C9A2A",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2F6031",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  loading: {
    marginVertical: 15,
  },
  resultContainer: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2F6031",
    textAlign: "center",
    marginBottom: 10,
  },
  resultCard: {
    backgroundColor: "#ECF0F1",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#34495E",
  },
  resultValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#27AE60",
  },
  suggestionsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F6031",
    marginTop: 15,
    marginBottom: 5,
  },
  suggestionText: {
    fontSize: 16,
    color: "#4C9A2A",
    marginBottom: 3,
  },
});
