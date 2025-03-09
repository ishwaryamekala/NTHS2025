import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { logout } from "../authService";
import { getUserName, getEcoScore } from "../ecoService";
import {auth} from "../firebaseConfig";

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
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userName}!</Text>
      <Text>You have successfully logged in.</Text>

      <Text style={styles.ecoScore}>🌱 Your EcoScore: {ecoScore ?? "Loading..."}</Text>

      <Button title="Logout" onPress={() => logout(navigation)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#E8F5E9" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#2E7D32" },
  ecoScore: { fontSize: 20, fontWeight: "bold", color: "#388E3C", marginVertical: 20 },
});
