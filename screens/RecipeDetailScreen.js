import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator,ScrollView } from 'react-native';

const RecipeDetailScreen = ({ route }) => {
  const { recipeId } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <Image source={{ uri: recipeDetails.Recipe_img_url }} style={styles.image} />
          <Text style={styles.title}>{recipeDetails.Recipe_title}</Text>
          <Text style={styles.description}>Calories: {recipeDetails.Calories}</Text>
          <Text style={styles.description}>Continent: {recipeDetails.Continent}</Text>
          <Text style={styles.description}>Calories: {recipeDetails.Calories}</Text>
          <Text style={styles.description}>Calories: {recipeDetails.Calories}</Text>
          <Text style={styles.description}>Calories: {recipeDetails.Calories}</Text>
          <Text style={styles.description}>Calories: {recipeDetails.Calories}</Text>
          <Text style={styles.description}>Calories: {recipeDetails.Calories}</Text>
          <Text style={styles.description}>Calories: {recipeDetails.Calories}</Text>
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
    padding: 20, 
    backgroundColor:'beige'
},
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
},
  errorText: { 
    fontSize: 16, 
    color: 'red', 
    textAlign: 'center', 
    marginTop: 20 
},
  image: { 
    width: '100%', 
    height: 200, 
    borderRadius: 10 
},
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginVertical: 10,
    alignSelf:'center',
    fontFamily:'serif',
    fontWeight:"semibold",
},
  description: { 
    fontSize: 16,
     
    color: '#555' 
    },
});

export default RecipeDetailScreen;