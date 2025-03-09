import { registerRootComponent } from "expo";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../components/LoginScreen";
import HomeScreen from "../../components/HomeScreen"; // Ensure this exists or update the path
import UtilityBill from "@/components/UtilityBill";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UtilityBill" component={UtilityBill}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
