import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { db, auth } from "../firebaseConfig"; // Import Firestore functions
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore functions

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
        setSelectedFile(result.assets[0]); // Select the first file
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
      const response = await fetch(selectedFile.uri); // Fetch the file as a blob
      const blob = await response.blob(); // Convert to Blob
  
      formData.append("file", blob, selectedFile.name); // Append Blob with filename
  
      const apiResponse = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      const newEcoScore = apiResponse.data.eco_score;
      setEcoScore(newEcoScore);
      setCarbonFootprint(apiResponse.data.carbon_footprint);
      setSuggestions(apiResponse.data.suggestions);
  
      // ✅ Debug: Print received ecoScore
      console.log("New ecoScore from API:", newEcoScore);
  
      // ✅ Ensure Firebase reference is correct
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists()) {
        const currentEcoScore = userDoc.data().ecoScore || 0;
  
        console.log("Current ecoScore in Firebase:", currentEcoScore);
          await updateDoc(userRef, {
          ecoScore: Number(currentEcoScore) + Number(newEcoScore),
        });
  
        console.log(`Updated ecoScore: ${currentEcoScore} + ${newEcoScore} = ${currentEcoScore + newEcoScore}`);
      } else {
        await setDoc(userRef, { ecoScore: newEcoScore });
        console.log("New user document created with ecoScore:", newEcoScore);
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

      <TouchableOpacity style={styles.button} onPress={pickDocument}>
        <Text style={styles.buttonText}>Select PDF</Text>
      </TouchableOpacity>

      {selectedFile && (
        <TouchableOpacity style={styles.button} onPress={uploadDocument}>
          <Text style={styles.buttonText}>Upload & Analyze</Text>
        </TouchableOpacity>
      )}

      {loading && <ActivityIndicator size="large" color="#2ecc71" />}

      {ecoScore !== null && (
        <View>
          <Text style={styles.resultText}>Eco Score: {ecoScore}/20</Text>
          <Text style={styles.resultText}>Carbon Footprint: {carbonFootprint} kg CO₂</Text>
          <Text style={styles.resultText}>Suggestions:</Text>
          {suggestions.map((s, index) => (
            <Text key={index} style={styles.suggestion}>• {s}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "#2ecc71", padding: 15, marginVertical: 10, alignItems: "center", borderRadius: 5 },
  buttonText: { color: "#fff", fontSize: 16 },
  resultText: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  suggestion: { fontSize: 16, color: "gray" },
});
