import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Recycle({ navigation }: any) {
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Find Nearby Recycling Centers</Text>
      </TouchableOpacity>
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
});
