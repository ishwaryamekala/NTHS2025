import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FAF1', // Lighter green background
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'transparent', 
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F6031',
    textAlign: 'center',
    marginTop: 10,
  },
  profileButton: {
    position: 'absolute',
    right: 15,
  },
  scoreContainer: {
    alignItems: 'center',
    padding: 20,
  },
  scoreContent: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2F6031',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#4C9A2A',
  },
  impactContainer: {
    padding: 20,
    backgroundColor: '#E8F5E9', // Lighter impact section background
    borderRadius: 15,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F6031',
    marginBottom: 10,
  },
  impactCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F0FAF1', // Softer green for contrast
    borderRadius: 15,
    padding: 20,
  },
  impactItem: {
    alignItems: 'center',
    flex: 1,
  },
  impactValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F6031',
    marginTop: 5,
  },
  impactLabel: {
    fontSize: 12,
    color: '#4C9A2A',
    marginTop: 5,
  },
  actionsContainer: {
    paddingVertical: 20,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%', 
    backgroundColor: '#F8FFF5', // Even lighter green for a soft feel
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#4C9A2A', // Dark green border for contrast
  },
  actionText: {
    marginTop: 10,
    color: '#2F6031',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: '#2E7D32', 
    textAlign: 'center',
  },
  ecoScore: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#388E3C', 
    marginVertical: 20, 
  },
});

export default styles;
