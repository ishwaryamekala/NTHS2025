import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ResellItems({ navigation }: any) {
  // State to store items (Now dynamic)
  const [items, setItems] = useState([
    {
      id: "1",
      name: "iPhone 11",
      price: "250",
      imageUrl: "https://images.unsplash.com/photo-1571805342402-d36a8e1c3dc4",
    },
    {
      id: "2",
      name: "MacBook Pro 2017",
      price: "600",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    },
  ]);

  // Function to add new item (called when coming back from PostItem)
  const handleAddItem = (newItem: any) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resell Your E-Waste</Text>
      <Text style={styles.subtitle}>
        Give your old electronics a second life. Sell them to others instead of throwing them away.
      </Text>

      {/* Categories */}
      <View style={styles.card}>
        <Icon name="cellphone" size={40} color="#2F6031" />
        <Text style={styles.cardTitle}>Phones & Tablets</Text>
        <Text style={styles.cardText}>Sell old smartphones and tablets to reduce e-waste.</Text>
      </View>

      <View style={styles.card}>
        <Icon name="laptop" size={40} color="#2F6031" />
        <Text style={styles.cardTitle}>Laptops & Computers</Text>
        <Text style={styles.cardText}>Resell used laptops and desktops instead of discarding.</Text>
      </View>

      {/* Post an Item Button (Pass handleAddItem function) */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PostItem", { addItem: handleAddItem })}
      >
        <Text style={styles.buttonText}>Post an Item for Sale</Text>
      </TouchableOpacity>

      {/* Grid View for Selling Items */}
      <Text style={styles.marketplaceTitle}>Marketplace Listings</Text>
      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCard}
            onPress={() => navigation.navigate("ItemDetails", { item })}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4FAF1", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#2F6031", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 14, color: "#4C9A2A", marginBottom: 20, textAlign: "center" },
  card: { backgroundColor: "#F8FFF5", borderRadius: 15, padding: 20, marginBottom: 15, borderWidth: 2, borderColor: "#4C9A2A", alignItems: "center" },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#2F6031", marginTop: 10 },
  cardText: { fontSize: 14, color: "#4C9A2A", textAlign: "center" },
  button: { backgroundColor: "#4C9A2A", borderRadius: 25, paddingVertical: 12, alignItems: "center", marginTop: 20 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  marketplaceTitle: { fontSize: 22, fontWeight: "bold", color: "#2F6031", marginTop: 20, marginBottom: 10 },
  itemCard: { flex: 1, backgroundColor: "#FFFFFF", margin: 5, padding: 10, borderRadius: 10, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  itemImage: { width: 100, height: 100, borderRadius: 10 },
  itemName: { fontSize: 16, fontWeight: "bold", color: "#2F6031", marginTop: 5 },
  itemPrice: { fontSize: 14, color: "#4C9A2A" },
});
