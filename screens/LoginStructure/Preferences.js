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
import { getDatabase, ref, set, get, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function PreferencesScreen() {
  const navigation = useNavigation();

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
    const fetchPreferences = async () => {
      const user = getAuth().currentUser;
      if (!user) {
        Alert.alert("Error", "User is not authenticated");
        setInitializing(false);
        return;
      }

      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}/preferences`);

      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setSelectedFoods(data.favoriteFoods || []);
          setSelectedAllergies(data.allergies || []);

          // Load saved custom food items if they exist
          if (data.customFoods) {
            setFoodOptions((prevOptions) => [
              ...prevOptions,
              ...data.customFoods,
            ]);
          }
        }
      } catch (error) {
        Alert.alert("Error", "Could not load preferences: " + error.message);
      } finally {
        setInitializing(false);
      }
    };

    fetchPreferences();
  }, []);

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
    setFoodOptions((prevOptions) => [...prevOptions, newFood]);
    setSelectedFoods((prevSelectedFoods) => [...prevSelectedFoods, newFood]);
    setNewFood("");
    setModalVisible(false);
  };

  const handleSubmit = () => {
    const user = getAuth().currentUser;
    if (!user) {
      Alert.alert("Error", "User is not authenticated");
      return;
    }

    setLoading(true);
    const db = getDatabase();
    const userRef = ref(db, `users/${user.uid}/preferences`);
    console.log("Selected Food: ", selectedFoods);
    console.log("Selected Allergies: ", selectedAllergies);
    navigation.navigate("HomeScreen");
    set(userRef, {
      favoriteFoods: selectedFoods,
      allergies: selectedAllergies,
      customFoods: foodOptions.slice(8), // Only save custom foods to avoid duplicating default items
    })
      .then(() => {
        Alert.alert(
          "Success",
          "Your preferences and allergies have been saved."
        );
      })
      .catch((error) => {
        Alert.alert("Error", "Could not save preferences: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
        <Text style={styles.title}>Select Your Favorite Foods</Text>
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
              <Text style={styles.optionText}>{food}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Food</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Select Your Allergies</Text>
        <View style={styles.optionsContainer}>
          {allergyOptions.map((allergy) => (
            <TouchableOpacity
              key={allergy}
              style={[
                styles.optionButton,
                selectedAllergies.includes(allergy) && styles.selectedOption,
              ]}
              onPress={() => handleAllergySelect(allergy)}
            >
              <Text style={styles.optionText}>{allergy}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Save Preferences</Text>
          )}
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add a New Favorite Food</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter food name"
                value={newFood}
                onChangeText={setNewFood}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={addNewFood}>
                  <Text style={styles.modalButtonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
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
