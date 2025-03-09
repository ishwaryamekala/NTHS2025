import { registerRootComponent } from "expo";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../components/LoginScreen";
import HomeScreen from "../../components/HomeScreen"; // Ensure this exists or update the path
import UtilityBill from "@/components/UtilityBill";
import ResellItems from "../../components/ResellItems";
import Recycle from "../../components/Recycle";
import ItemDetails from "../../components/ItemDetails";
import PostItem from "../../components/PostItem";
import ChatBot from "../../components/ChatBot";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UtilityBill" component={UtilityBill}/>
        <Stack.Screen name="ResellItems" component={ResellItems}/>
        <Stack.Screen name="Recycle" component={Recycle}/>
        <Stack.Screen name="ItemDetails" component={ItemDetails} />
        <Stack.Screen name="PostItem" component={PostItem} />
        <Stack.Screen name="ChatBot" component={ChatBot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
