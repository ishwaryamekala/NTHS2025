import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { getUserName } from "../ecoService";
import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore"; // Import real-time listener
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './styles';

export default function HomeScreen({ navigation }: any) {
  const [ecoScore, setEcoScore] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserName() {
      const name = await getUserName();
      setUserName(name);
    }
    fetchUserName();
  }, []);

  useEffect(() => {
    if (!auth.currentUser) return;

    const userRef = doc(db, "users", auth.currentUser.uid);
    
    const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setEcoScore(docSnapshot.data().ecoScore || 0);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  console.log("Successfully navigated to Home Screen!");
  console.log("User ID (auth.uid):", auth.currentUser?.uid);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {userName}!</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="account-circle" size={30} color="#2ecc71" />
        </TouchableOpacity>
      </View>

      {/* Sustainability Score Section */}
      <View style={styles.scoreContainer}>
        <AnimatedCircularProgress
          size={200}
          width={15}
          fill={ecoScore ? ecoScore : 0}
          tintColor="#2ecc71"
          backgroundColor="#ecf0f1"
        >
          {(fill) => (
            <View style={styles.scoreContent}>
              <Text style={styles.scoreText}>{ecoScore}</Text>
              <Text style={styles.scoreLabel}>Eco Score</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      {/* Carbon Impact Section */}
      <View style={styles.impactContainer}>
        <Text style={styles.sectionTitle}>Today's Impact</Text>
        <View style={styles.impactCard}>
          <View style={styles.impactItem}>
            <Icon name="car" size={24} color="#2ecc71" />
            <Text style={styles.impactValue}>2.5 kg CO₂</Text>
            <Text style={styles.impactLabel}>= 10 miles driving</Text>
          </View>
          <View style={styles.impactItem}>
            <Icon name="lightning-bolt" size={24} color="#f1c40f" />
            <Text style={styles.impactValue}>1.8 kWh</Text>
            <Text style={styles.impactLabel}>Energy Used</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Recycle")}>
            <Icon name="recycle" size={30} color="#2ecc71" />
            <Text style={styles.actionText}>Recycle</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => navigation.navigate("UtilityBill")}
          >
            <Icon name="file-document" size={30} color="#2ecc71" />
            <Text style={styles.actionText}>Add Utility Bill</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="qrcode-scan" size={30} color="#2ecc71" />
            <Text style={styles.actionText}>Chat with EcoBot!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("ResellItems")}>
            <Icon name="store" size={30} color="#2ecc71" />
            <Text style={styles.actionText}>Resell Items</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
