import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const PostBeverage = () => {
  const [beverage, setBeverage] = useState('');
  const [pairingNotes, setPairingNotes] = useState('');
  const [meal, setMeal] = useState('');

  const handlePost = async () => {
    const data = {
      beverage,
      pairing_notes: pairingNotes,
      meal,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/beverage-pairings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      Alert.alert('Success', `Response: ${JSON.stringify(result)}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Beverage Pairing</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Beverage"
        value={beverage}
        onChangeText={setBeverage}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Pairing Notes"
        value={pairingNotes}
        onChangeText={setPairingNotes}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Meal"
        value={meal}
        onChangeText={setMeal}
      />
      <Button title="Submit" onPress={handlePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default PostBeverage;
