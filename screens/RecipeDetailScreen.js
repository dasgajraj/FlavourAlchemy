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
          <Text style={styles.description}>Energy(kcal): {recipeDetails.Energy (kcal)}</Text>
          <Text style={styles.description}>Protein (g): {recipeDetails.Protein (g)}</Text>
          {/* <Text style={styles.description}>Total lipid (fat) (g): {recipeDetails.Total lipid (fat) (g)}</Text> */}
          <Text style={styles.description}>cook time: {recipeDetails.cook_time}</Text>
          <Text style={styles.description}>prep time: {recipeDetails.prep_time}</Text>
          <Text style={styles.description}>servings: {recipeDetails.servings}</Text>
          <Text style={styles.description}>Recipe title: {recipeDetails.Recipe_title}</Text>
          <Text style={styles.description}>total_time: {recipeDetails.total_time}</Text>
          <Text style={styles.description}>Calories: {recipeDetails.Calories}</Text>
          <Text style={styles.description}>url: {recipeDetails.url}</Text>
          <Text style={styles.description}>Region: {recipeDetails.Region}</Text>
          <Text style={styles.description}>Sub region: {recipeDetails.Sub_region}</Text>
          <Text style={styles.description}>img_url: {recipeDetails.img_url}</Text>
          {/* <Text style={styles.description}>Carbohydrate: {recipeDetails.Carbohydrate, by difference (g)}</Text> */}
          <Text style={styles.description}>Processes: {recipeDetails.Processes}</Text>
          {/* <Text style={styles.description}>Sugars, total (g): {recipeDetails.Sugars, total (g)}</Text> */}
          <Text style={styles.description}>Glucose (dextrose) (g): {recipeDetails.Glucose (dextrose) (g)}</Text>
          {/* <Text style={styles.description}>Calcium, Ca (mg): {recipeDetails.Calcium, Ca (mg)}</Text> */}
          <Text style={styles.description}>Energy (kJ): {recipeDetails.Energy (kJ)}</Text>
          {/* <Text style={styles.description}>Alcohol, ethyl (g): {recipeDetails.Alcohol, ethyl (g)}</Text> */}

          <View>
            <Text style={styles.description}>Calories: {recipeDetails.Calories}</Text>
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