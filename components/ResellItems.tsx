import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ResellItems({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resell & Give Items a New Life</Text>
      <Text style={styles.subtitle}>Sell or donate items to reduce waste and support a circular economy.</Text>

      {/* Resell Categories */}
      <View style={styles.card}>
        <Icon name="tshirt-crew" size={40} color="#2F6031" />
        <Text style={styles.cardTitle}>Clothing</Text>
        <Text style={styles.cardText}>Sell gently used clothes on sustainable marketplaces.</Text>
      </View>

      <View style={styles.card}>
        <Icon name="laptop" size={40} color="#2F6031" />
        <Text style={styles.cardTitle}>Electronics</Text>
        <Text style={styles.cardText}>Resell old laptops, phones, and gadgets instead of discarding them.</Text>
      </View>

      <View style={styles.card}>
        <Icon name="sofa" size={40} color="#2F6031" />
        <Text style={styles.cardTitle}>Furniture</Text>
        <Text style={styles.cardText}>Donate or resell furniture to avoid landfill waste.</Text>
      </View>

      {/* Button to Post an Item */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Post an Item for Resale</Text>
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
