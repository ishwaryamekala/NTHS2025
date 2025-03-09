import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  profileButton: {
    padding: 5,
  },
  scoreContainer: {
    alignItems: 'center',
    padding: 20,
  },
  scoreContent: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  impactContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  impactCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
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
    color: '#2c3e50',
    marginTop: 5,
  },
  impactLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  actionsContainer: {
    padding: 20,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  actionText: {
    marginTop: 10,
    color: '#2c3e50',
    fontSize: 14,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: '#2E7D32', 
  },
  ecoScore: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#388E3C', 
    marginVertical: 20, 
  },
});

export default styles;
