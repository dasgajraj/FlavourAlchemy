import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

const RecipeDetailScreen = ({ route }) => {
  const { recipeId } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [instructionsVisible, setInstructionsVisible] = useState(false); // For dropdown
  const navigation = useNavigation()

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`https://cosylab.iiitd.edu.in/recipe/${recipeId}`);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const { payload } = await response.json();
        setRecipeDetails(payload);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {recipeDetails ? (
        <>
          <Image source={{ uri: recipeDetails.img_url }} style={styles.image} />
          <Text style={styles.title}>{recipeDetails.Recipe_title}</Text>
          <Text style={styles.description}>Continent: {recipeDetails.Continent}</Text>
          <Text style={styles.description}>Region: {recipeDetails.Region}</Text>
          <Text style={styles.description}>Sub region: {recipeDetails.Sub_region}</Text>
          <Text style={styles.description}>Calories: {recipeDetails.Calories}</Text>
          <Text style={styles.description}>Cook time: {recipeDetails.cook_time} Mins</Text>
          <Text style={styles.description}>Prep time: {recipeDetails.prep_time} Mins</Text>
          <Text style={styles.description}>Total time: {recipeDetails.total_time} Mins</Text>
          <Text style={styles.description}>Servings: {recipeDetails.servings}</Text>
          {/* Dropdown for Instructions */}
          <TouchableOpacity
            style={styles.dropdownToggle}
            onPress={() => setInstructionsVisible(!instructionsVisible)}
          >
            <Text style={styles.dropdownToggleText}>
              {instructionsVisible ? 'Hide Instructions' : 'Show Instructions'}
            </Text>
          </TouchableOpacity>

          {instructionsVisible && (
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsText}>{recipeDetails.instructions}</Text>
            </View>
          )}

          <View style={styles.beverage}>
            <TouchableOpacity onPress={() => navigation.navigate('BeveragePairing')}>
              <Text style={styles.beverageText}>Beverage Pairing</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>No recipe details available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: 'beige',
    paddingBottom: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    alignSelf: 'center',
    fontFamily: 'serif',
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  dropdownToggle: {
    marginVertical: 10,
    backgroundColor: '#D8BFD8',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  dropdownToggleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B0082',
  },
  instructionsContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 3,
  },
  instructionsText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  beverage: {
    backgroundColor: 'thistle',
    height: 40,
    width: 140,
    margin: 10,
    borderWidth: 1,
    borderRadius: 25,
    padding: 6,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
  beverageText: {
    fontFamily: 'serif',
    alignSelf: 'center',
  },
});

export default RecipeDetailScreen;
