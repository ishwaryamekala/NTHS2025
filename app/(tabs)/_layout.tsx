import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import HomeScreen from '../../components/HomeScreen';
// import ScanScreen from '../screens/ScanScreen';
// import UtilitiesScreen from '../screens/UtilitiesScreen';
// import ResellScreen from '../screens/ResellScreen';
// import LeaderboardScreen from '../screens/LeaderboardScreen';
// import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
            elevation: 10,
            height: 60,
          },
          tabBarActiveTintColor: '#2ecc71',
          tabBarInactiveTintColor: '#95a5a6',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Scan"
          //component={ScanScreen}
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="qrcode-scan" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Utilities"
          //component={UtilitiesScreen}
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="lightning-bolt" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Resell"
          //component={ResellScreen}
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="store" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Leaderboard"
          //component={LeaderboardScreen}
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="trophy" size={26} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 