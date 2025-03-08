import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { logout } from "../authService";

export default function HomeScreen({ navigation }: any) {
  console.log("Successfully navigated to Home Screen!");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home Screen!</Text>
      <Text>You have successfully logged in.</Text>
      <Button title="Logout" onPress={() => logout(navigation)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
