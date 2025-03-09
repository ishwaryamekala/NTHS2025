import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { logout } from "../authService";
import { getUserName, getEcoScore } from "../ecoService";
import {auth} from "../firebaseConfig";
import {
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

export default function HomeScreen({ navigation }: any) {
  const [ecoScore, setEcoScore] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEcoScore() {
      const score = await getEcoScore();
      setEcoScore(score);
      console.log("EcoScore:", score);
    }
    fetchEcoScore();
  }, []);

  useEffect(() => {
    async function fetchUserName() {
      const name = await getUserName();
        setUserName(name);
        console.log("User Name:", name);
    }
    fetchUserName();
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
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="qrcode-scan" size={30} color="#2ecc71" />
            <Text style={styles.actionText}>Scan Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="file-document" size={30} color="#2ecc71" />
            <Text style={styles.actionText}>Add Bill</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="recycle" size={30} color="#2ecc71" />
            <Text style={styles.actionText}>Disposal Guide</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="store" size={30} color="#2ecc71" />
            <Text style={styles.actionText}>Resell Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
