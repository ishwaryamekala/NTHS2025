import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FAF1",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2F6031",
  },
  profileButton: {
    backgroundColor: "#D5E8D4",
    borderRadius: 50,
    padding: 10,
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  scoreContent: {
    alignItems: "center",
  },
  scoreText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2F6031",
  },
  scoreLabel: {
    fontSize: 16,
    color: "#4C9A2A",
  },
  impactContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F6031",
    marginBottom: 10,
  },
  impactCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  impactItem: {
    alignItems: "center",
    flex: 1,
    padding: 10,
  },
  impactValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#27ae60",
  },
  impactLabel: {
    fontSize: 14,
    color: "#4C9A2A",
  },
  actionsContainer: {
    marginTop: 20,
  },
  actionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: "#D5E8D4",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    margin: 5,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2F6031",
    marginTop: 5,
  },
  leaderboardContainer: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  leaderboardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#27ae60",
  },
  friendName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#34495e",
    flex: 1,
    textAlign: "center",
  },
  friendScore: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2ecc71",
  },
});

export default styles;
