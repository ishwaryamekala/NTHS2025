import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { getUserName } from "../ecoService";
import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

export default function HomeScreen({ navigation }: any) {
  const [ecoScore, setEcoScore] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [friends, setFriends] = useState<{ name: string; ecoScore: number }[]>([]);

  useEffect(() => {
    async function fetchUserName() {
      const name = await getUserName();
      setUserName(name);
    }
    fetchUserName();
  }, []);

  useEffect(() => {
    if (!auth.currentUser) return;
  
    const userRef = doc(db, "users", auth.currentUser.uid);
  
    const unsubscribe = onSnapshot(userRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        setEcoScore(docSnapshot.data().ecoScore || 0);
        const friendsIds: string[] = docSnapshot.data().friends || [];
  
        console.log("✅ Friends IDs Retrieved:", friendsIds);
  
        if (friendsIds.length > 0) {
          try {
            const friendScores = await Promise.all(
              friendsIds.map(async (friendId) => {
                const friendRef = doc(db, "users", friendId);
                const friendSnap = await getDoc(friendRef);
  
                if (friendSnap.exists()) {
                  const friendData = {
                    name: friendSnap.data().name || "Unknown",
                    ecoScore: friendSnap.data().ecoScore || 0,
                  };
  
                  console.log(`✅ Data for ${friendId}:`, friendData);
                  return friendData;
                } else {
                  console.log(`❌ Friend ID ${friendId} not found.`);
                  return null;
                }
              })
            );
  
            // ✅ Filter out null values & update state
            const validFriends = friendScores.filter((f) => f !== null);
            setFriends(validFriends.sort((a, b) => b!.ecoScore - a!.ecoScore));
  
            console.log("✅ Final Processed Friends Data:", validFriends);
          } catch (error) {
            console.error("❌ Error fetching friends' data:", error);
          }
        }
      }
    });
  
    return () => unsubscribe();
  }, []);


  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {userName}!</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="account-circle" size={30} color="#2ecc71" />
        </TouchableOpacity>
      </View>

      {/* Sustainability Score Section */}
      <View style={styles.scoreContainer}>
        <AnimatedCircularProgress size={200} width={15} fill={ecoScore ? ecoScore : 0} tintColor="#2ecc71" backgroundColor="#ecf0f1">
          {(fill) => (
            <View style={styles.scoreContent}>
              <Text style={styles.scoreText}>{ecoScore}</Text>
              <Text style={styles.scoreLabel}>Eco Score</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      {/* Monthly Impact Section */}
      <View style={styles.impactContainer}>
        <Text style={styles.sectionTitle}>Your Impact This Month</Text>
        <View style={styles.impactCard}>
          <View style={styles.impactItem}>
            <Icon name="recycle" size={30} color="#2ecc71" />
            <Text style={styles.impactValue}>4.2 kg</Text>
            <Text style={styles.impactLabel}>E-Waste Recycled</Text>
          </View>
          <View style={styles.impactItem}>
            <Icon name="lightning-bolt" size={30} color="#f1c40f" />
            <Text style={styles.impactValue}>78.5 kWh</Text>
            <Text style={styles.impactLabel}>Energy Used by Devices</Text>
          </View>
        </View>
      </View>

      {/* ✅ Quick Actions Restored Below */}
      <View style={styles.actionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionGrid}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Recycle")}>
          <Icon name="recycle" size={40} color="#2ecc71" />
          <Text style={styles.actionText}>Recycle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("UtilityBill")}>
          <Icon name="file-document" size={40} color="#2ecc71" />
          <Text style={styles.actionText}>Add Utility Bill</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("ChatBot")}>
          <Icon name="qrcode-scan" size={40} color="#2ecc71" />
          <Text style={styles.actionText}>Chat with EcoBot!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("ResellItems")}>
          <Icon name="store" size={40} color="#2ecc71" />
          <Text style={styles.actionText}>Resell Items</Text>
        </TouchableOpacity>
      </View>
    </View>

      {/* ✅ Leaderboard Now Works */}
      <View style={styles.leaderboardContainer}>
        <Text style={styles.sectionTitle}>Leaderboard</Text>
        {friends.length > 0 ? (
          <FlatList
            data={friends}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.leaderboardItem}>
                <Text style={styles.rank}>{index + 1}.</Text>
                <Text style={styles.friendName}>{item.name}</Text>
                <Text style={styles.friendScore}>{item.ecoScore} pts</Text>
              </View>
            )}
          />
        ) : (
          <Text>No friends found. Add friends to compare scores!</Text>
        )}
      </View>
    </ScrollView>
  );
}

