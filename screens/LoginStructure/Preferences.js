// Fixed Food Preferences Screen

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Modal,
  ImageBackground,
} from "react-native";
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, set, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxWTmBsslJZ80e7mEbDBtCi7FNlrMSuJE",
  authDomain: "ecanteen-4ab1b.firebaseapp.com",
  databaseURL: "https://ecanteen-4ab1b-default-rtdb.firebaseio.com",
  projectId: "ecanteen-4ab1b",
  storageBucket: "ecanteen-4ab1b.firebasestorage.app",
  messagingSenderId: "65494167458",
  appId: " 1:65494167458:web:d3cdfbbafce02a6c5b8cfb",
  measurementId: "G-P52Q86NJ83",
};

// Initialize Firebase
let app;
try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export default function PreferencesScreen() {
  const navigation = useNavigation();
  const [database, setDatabase] = useState(null);
  const [foodOptions, setFoodOptions] = useState([
    "Pizza",
    "Burger",
    "Pasta",
    "Salad",
    "Sushi",
    "Fried Chicken",
    "Rice",
    "Sandwich",
  ]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [newFood, setNewFood] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const allergyOptions = [
    "Peanuts",
    "Gluten",
    "Lactose",
    "Shellfish",
    "Soy",
    "Eggs",
    "Tree Nuts",
  ];

  useEffect(() => {
    // Initialize database reference
    try {
      const db = getDatabase(app);
      setDatabase(db);
    } catch (error) {
      console.error("Error initializing database:", error);
      Alert.alert("Error", "Failed to initialize database");
    }
  }, []);

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!database) return;

      const user = getAuth(app).currentUser;
      if (!user) {
        Alert.alert("Error", "User is not authenticated");
        setInitializing(false);
        return;
      }

      try {
        const userRef = ref(database, `users/${user.uid}/preferences`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          setSelectedFoods(data.favoriteFoods || []);
          setSelectedAllergies(data.allergies || []);
          
          if (data.customFoods && Array.isArray(data.customFoods)) {
            setFoodOptions(prevOptions => {
              const defaultOptions = prevOptions.slice(0, 8);
              const uniqueCustomFoods = data.customFoods.filter(
                food => !defaultOptions.includes(food)
              );
              return [...defaultOptions, ...uniqueCustomFoods];
            });
          }
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
        Alert.alert("Error", "Could not load preferences: " + error.message);
      } finally {
        setInitializing(false);
      }
    };

    if (database) {
      fetchPreferences();
    }
  }, [database]);

  const handleFoodSelect = (food) => {
    setSelectedFoods((prevSelectedFoods) =>
      prevSelectedFoods.includes(food)
        ? prevSelectedFoods.filter((item) => item !== food)
        : [...prevSelectedFoods, food]
    );
  };

  const handleAllergySelect = (allergy) => {
    setSelectedAllergies((prevSelectedAllergies) =>
      prevSelectedAllergies.includes(allergy)
        ? prevSelectedAllergies.filter((item) => item !== allergy)
        : [...prevSelectedAllergies, allergy]
    );
  };

  const addNewFood = () => {
    if (!newFood.trim()) {
      Alert.alert("Error", "Please enter a valid food name.");
      return;
    }

    if (foodOptions.includes(newFood.trim())) {
      Alert.alert("Error", "This food is already in your list.");
      return;
    }

    setFoodOptions((prevOptions) => [...prevOptions, newFood.trim()]);
    setSelectedFoods((prevSelectedFoods) => [...prevSelectedFoods, newFood.trim()]);
    setNewFood("");
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    if (!database) {
      Alert.alert("Error", "Database not initialized");
      return;
    }

    const user = getAuth(app).currentUser;
    if (!user) {
      Alert.alert("Error", "User is not authenticated");
      return;
    }

    setLoading(true);
    const userRef = ref(database, `users/${user.uid}/preferences`);

    try {
      await set(userRef, {
        favoriteFoods: selectedFoods,
        allergies: selectedAllergies,
        customFoods: foodOptions.slice(8),
        lastUpdated: new Date().toISOString(),
      });

      Alert.alert("Success", "Your preferences have been saved.");
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("Error saving preferences:", error);
      Alert.alert("Error", "Could not save preferences: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6E40" />
        <Text style={styles.loadingText}>Loading your preferences...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Your Favorite Foods</Text>
          <View style={styles.optionsContainer}>
            {foodOptions.map((food) => (
              <TouchableOpacity
                key={food}
                style={[
                  styles.optionButton,
                  selectedFoods.includes(food) && styles.selectedOption,
                ]}
                onPress={() => handleFoodSelect(food)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    selectedFoods.includes(food) && styles.selectedOptionText
                  ]}
                >
                  {food}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add Custom Food</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Your Allergies</Text>
          <View style={styles.optionsContainer}>
            {allergyOptions.map((allergy) => (
              <TouchableOpacity
                key={allergy}
                style={[
                  styles.optionButton,
                  selectedAllergies.includes(allergy) && styles.selectedAllergy,
                ]}
                onPress={() => handleAllergySelect(allergy)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    selectedAllergies.includes(allergy) && styles.selectedOptionText
                  ]}
                >
                  {allergy}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Save Preferences</Text>
          )}
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Food</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter food name"
                value={newFood}
                onChangeText={setNewFood}
                autoCapitalize="words"
                maxLength={30}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.addModalButton]}
                  onPress={addNewFood}
                >
                  <Text style={styles.modalButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#FF6E40",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6E40",
    marginVertical: 15,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  optionButton: {
    backgroundColor: "#ddd",
    padding: 10,
    margin: 5,
    borderRadius: 8,
    minWidth: "40%",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#FF6E40",
  },
  optionText: {
    color: "#333",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#FF6E40",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: "#ccc",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#FF6E40",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#FF6E40",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});
