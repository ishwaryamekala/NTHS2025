import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, Linking, StyleSheet, Modal, AppState } from "react-native";
import { auth, db } from "../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Recycle({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Detect when the user returns from Google Maps
    const appStateListener = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        setModalVisible(true); // Show modal when user returns
      }
    });

    return () => appStateListener.remove(); // Cleanup listener
  }, []);

  const openGoogleMaps = () => {
    const utdLat = 32.9858;
    const utdLng = -96.7501;
    const mapsUrl = `https://www.google.com/maps/search/Recycling+Centers/@${utdLat},${utdLng},14z`;

    Linking.openURL(mapsUrl); // Redirect to Google Maps
  };

  const handleRecycled = async (didRecycle: boolean) => {
    setModalVisible(false); // Close modal

    if (didRecycle) {
      try {
        const userRef = doc(db, "users", auth.currentUser?.uid || "");
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const currentEcoScore = userDoc.data().ecoScore || 0;
          await updateDoc(userRef, { ecoScore: currentEcoScore + 10 });

          Alert.alert("Success!", "You've earned +10 EcoScore! 🌱");
        }
      } catch (error) {
        console.error("Error updating EcoScore:", error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Recycling Guide</Text>
      <Text style={styles.subtitle}>Properly dispose of your waste to reduce your environmental impact.</Text>

      {/* Recycling Categories */}
      <View style={styles.card}>
        <Icon name="recycle" size={40} color="#2F6031" />
        <Text style={styles.cardTitle}>Plastics</Text>
        <Text style={styles.cardText}>Recycle plastics labeled #1 and #2. Rinse containers before recycling.</Text>
      </View>

      <View style={styles.card}>
        <Icon name="glass-fragile" size={40} color="#2F6031" />
        <Text style={styles.cardTitle}>Glass</Text>
        <Text style={styles.cardText}>Recycle clear, green, and brown glass bottles and jars.</Text>
      </View>

      <View style={styles.card}>
        <Icon name="newspaper" size={40} color="#2F6031" />
        <Text style={styles.cardTitle}>Paper & Cardboard</Text>
        <Text style={styles.cardText}>Flatten boxes and avoid contaminated paper products.</Text>
      </View>

      {/* Button to Find Recycling Centers */}
      <TouchableOpacity style={styles.button} onPress={openGoogleMaps}>
        <Text style={styles.buttonText}>Find Nearby Recycling Centers</Text>
      </TouchableOpacity>

      {/* Pop-Up Modal for Confirmation (After Returning from Maps) */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Did you recycle?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => handleRecycled(true)}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.noButton]} onPress={() => handleRecycled(false)}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FAF1",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F6031",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#4C9A2A",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#F8FFF5",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#4C9A2A",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2F6031",
    marginTop: 10,
  },
  cardText: {
    fontSize: 14,
    color: "#4C9A2A",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4C9A2A",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#F8FFF5",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4C9A2A",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2F6031",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#2F6031",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  noButton: {
    backgroundColor: "#D9534F",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
