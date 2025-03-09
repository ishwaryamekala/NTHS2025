import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function ItemDetails({ route, navigation }: any) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      {/* Item Image */}
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />

      {/* Item Details Card */}
      <View style={styles.detailsCard}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>

        <Text style={styles.description}>
          This item is available for resale. Contact the seller for more details.
        </Text>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FAF1",
    padding: 20,
    alignItems: "center",
  },
  itemImage: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  itemName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F6031",
    textAlign: "center",
  },
  itemPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4C9A2A",
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    color: "#4C9A2A",
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#4C9A2A",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
