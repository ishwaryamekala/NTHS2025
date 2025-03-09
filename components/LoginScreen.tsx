import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { login, signUp } from "../authService";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    console.log("Login button pressed");
    login(email, password, navigation);
  };

  return (
    <View style={styles.container}>
      {/* Eco-Themed Logo or Icon */}
      <Image source={require("../assets/images/eco-logo.png")} style={styles.logo} />

      <Text style={styles.title}>Welcome to EcoMate</Text>
      <Text style={styles.subtitle}>Track, Recycle, and Reduce Waste</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        placeholderTextColor="#8F8F8F"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        placeholderTextColor="#8F8F8F"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => signUp(email, password, navigation)}
      >
        <Text style={styles.signupText}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E8F5E9", // Soft eco-friendly green background
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#4CAF50",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#A5D6A7",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#2E7D32",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  signupText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
  },
});
