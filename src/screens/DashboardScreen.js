import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardScreen = ({ route }) => {
  const { selectedItem } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.text}>You have selected: {selectedItem.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#262698',
  },
  text: {
    fontSize: 18,
    color: '#262698',
  },
});

export default DashboardScreen;
