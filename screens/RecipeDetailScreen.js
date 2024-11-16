import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { 
  healthySwaps, 
  getHealthySubstitute, 
  calculateCalorieSavings,
  convertMeasurement,
  adjustQuantity,
  getAdjustedCookingInstructions
} from './RecipeHelper';

const RecipeDetailScreen = ({ route }) => {
  const { recipeId } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [instructionsVisible, setInstructionsVisible] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [ingredientsVisible, setIngredientsVisible] = useState(false);
  const [showHealthySwap, setShowHealthySwap] = useState(false);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [cookingAdjustments, setCookingAdjustments] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchRecipeDetails();
  }, [recipeId]);

  const fetchRecipeDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://cosylab.iiitd.edu.in/recipe/${recipeId}`)
      const { payload } = await response.json();
      setRecipeDetails(payload);
      if (payload.ingredients) {
        const nutrition = calculateNutrition(payload.ingredients);
        setNutritionInfo(nutrition);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatIngredient = (ingredient) => {
    if (showHealthySwap) {
      const healthySubstitute = getHealthySubstitute(ingredient.ingredient);
      if (healthySubstitute) {
        // Adjust quantity based on substitution
        let adjustedAmount = ingredient.quantity;
        if (ingredient.quantity && ingredient.unit) {
          adjustedAmount = adjustQuantity(
            healthySubstitute.ingredient.toLowerCase().replace(/\s+/g, '_'),
            ingredient.quantity
          );
        }
        
        return {
          text: `${adjustedAmount || ''} ${ingredient.unit || ''} ${healthySubstitute.ingredient} ${healthySubstitute.note}`,
          isSwapped: true,
          substitute: healthySubstitute
        };
      }
    }
    
    const parts = [];
    if (ingredient.quantity) parts.push(ingredient.quantity);
    if (ingredient.unit) parts.push(ingredient.unit);
    parts.push(ingredient.ingredient);
    if (ingredient.state) parts.push(`(${ingredient.state})`);
    return {
      text: parts.join(' '),
      isSwapped: false
    };
  };

  const calculateTotalCalorieSavings = () => {
    if (!recipeDetails?.ingredients || !showHealthySwap) return 0;
    
    return recipeDetails.ingredients.reduce((total, ingredient) => {
      const healthySubstitute = getHealthySubstitute(ingredient.ingredient);
      if (healthySubstitute) {
        const substitutionKey = `${ingredient.ingredient.toLowerCase()}_to_${healthySubstitute.ingredient.toLowerCase()}`;
        return total + (calculateCalorieSavings[substitutionKey] || 0) * (ingredient.quantity || 1);
      }
      return total;
    }, 0);
  };

  const updateCookingInstructions = () => {
    if (!showHealthySwap || !recipeDetails?.ingredients) return null;

    const adjustments = recipeDetails.ingredients
      .map(ingredient => {
        const healthySubstitute = getHealthySubstitute(ingredient.ingredient);
        if (healthySubstitute) {
          const substituteName = healthySubstitute.ingredient.toLowerCase().replace(/\s+/g, '_');
          return getAdjustedCookingInstructions(ingredient.ingredient, substituteName);
        }
        return null;
      })
      .filter(adj => adj !== null);

    if (adjustments.length > 0) {
      setCookingAdjustments(adjustments);
    }
  };

  useEffect(() => {
    updateCookingInstructions();
  }, [showHealthySwap, recipeDetails]);

  const toggleHealthySwap = () => {
    setShowHealthySwap(!showHealthySwap);
    if (!showHealthySwap) {
      const calorieSavings = calculateTotalCalorieSavings();
      Alert.alert(
        'Healthy Swap Activated',
        `Ingredients have been replaced with healthier alternatives where possible.\n\nEstimated calorie savings: ${calorieSavings.toFixed(0)} calories\n\nNote: Cooking times and temperatures may need to be adjusted.`,
        [{ text: 'OK' }]
      );
    }
  };

  

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 70 }}>
      {recipeDetails ? (
        <>
          <Image source={{ uri: recipeDetails.img_url }} style={styles.image} />
          <Text style={styles.title}>{recipeDetails.Recipe_title}</Text>
          
          {/* Nutrition Card */}
          {nutritionInfo && (
            <View style={styles.nutritionCard}>
              <Text style={styles.nutritionTitle}>Nutrition Information</Text>
              <View style={styles.nutritionGrid}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>
                    {showHealthySwap ? nutritionInfo.healthy.calories : nutritionInfo.original.calories}
                  </Text>
                  <Text style={styles.nutritionLabel}>Calories</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>
                    {showHealthySwap ? nutritionInfo.healthy.protein : nutritionInfo.original.protein}g
                  </Text>
                  <Text style={styles.nutritionLabel}>Protein</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>
                    {showHealthySwap ? nutritionInfo.healthy.carbs : nutritionInfo.original.carbs}g
                  </Text>
                  <Text style={styles.nutritionLabel}>Carbs</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>
                    {showHealthySwap ? nutritionInfo.healthy.fat : nutritionInfo.original.fat}g
                  </Text>
                  <Text style={styles.nutritionLabel}>Fat</Text>
                </View>
              </View>
            </View>
          )}

          {/* Basic Details Section */}
          <Text style={styles.title2}>DETAILS:</Text>
          <Text style={styles.description}>
            <Text style={{ color: 'teal' }}>⁍ Region: </Text>
            {recipeDetails.Region}
          </Text>
          <Text style={styles.description}>
            <Text style={{ color: 'teal' }}>⁍ Sub region: </Text>
            {recipeDetails.Sub_region}
          </Text>

          {showMoreDetails && (
            <>
              <Text style={styles.description}>
                <Text style={{ color: 'teal' }}>⁍ Cook time: </Text>
                {showHealthySwap && cookingAdjustments?.time 
                  ? `${recipeDetails.cook_time * parseFloat(cookingAdjustments.time.slice(1))} Mins (Adjusted)`
                  : `${recipeDetails.cook_time} Mins`}
              </Text>
              <Text style={styles.description}>
                <Text style={{ color: 'teal' }}>⁍ Prep time: </Text>
                {recipeDetails.prep_time} Mins
              </Text>
              <Text style={styles.description}>
                <Text style={{ color: 'teal' }}>⁍ Total time: </Text>
                {recipeDetails.total_time} Mins
              </Text>
              <Text style={styles.description}>
                <Text style={{ color: 'teal' }}>⁍ Servings: </Text>
                {recipeDetails.servings}
              </Text>
            </>
          )}

          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => setShowMoreDetails(!showMoreDetails)}
          >
            <Text style={styles.showMoreText}>
              {showMoreDetails ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>

          {/* Ingredients Section */}
          <View style={styles.sectionContainer}>
            <TouchableOpacity
              style={styles.dropdownToggle}
              onPress={() => setIngredientsVisible(!ingredientsVisible)}
            >
              <Text style={styles.dropdownToggleText}>
                {ingredientsVisible ? 'Hide Ingredients' : 'Show Ingredients'}
              </Text>
            </TouchableOpacity>

            {ingredientsVisible && (
              <>
                <TouchableOpacity
                  style={[styles.healthySwapButton, showHealthySwap && styles.healthySwapButtonActive]}
                  onPress={toggleHealthySwap}
                >
                  <Text style={styles.healthySwapText}>
                    {showHealthySwap ? 'Show Original Ingredients' : 'Show Healthy Swaps'}
                  </Text>
                </TouchableOpacity>

                <View style={styles.ingredientsContainer}>
                  {recipeDetails.ingredients.map((ingredient, index) => {
                    const formattedIngredient = formatIngredient(ingredient);
                    return (
                      <Text key={index} style={[
                        styles.ingredientText,
                        formattedIngredient.isSwapped && styles.swappedIngredient
                      ]}>
                        • {formattedIngredient.text}
                      </Text>
                    );
                  })}
                </View>
              </>
            )}
          </View>

          {/* Instructions Section */}
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
              <Text style={styles.instructionsText}>
                {recipeDetails.instructions}
              </Text>
              {showHealthySwap && cookingAdjustments && (
                <View style={styles.cookingAdjustments}>
                  <Text style={styles.cookingAdjustmentsTitle}>Cooking Adjustments:</Text>
                  {cookingAdjustments.map((adjustment, index) => (
                    <Text key={index} style={styles.cookingAdjustmentText}>
                      • {adjustment.note || `Adjust temperature by ${adjustment.temp}°F and time by ${adjustment.time.slice(1)}x`}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Beverage Pairing */}
          <View style={styles.beverage}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DrinksList')}
            >
              <Text style={styles.beverageText}>Beverage List</Text>
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
    backgroundColor: 'beige',
    padding: 16,
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 23,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    color: '#2c3e50',
  },
  nutritionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nutritionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#2c3e50',
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  sectionContainer: {
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  dropdownToggle: {
    backgroundColor: '#34495e',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  dropdownToggleText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  healthySwapButton: {
    backgroundColor: '#27ae60',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  healthySwapButtonActive: {
    backgroundColor: '#2ecc71',
  },
  healthySwapText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ingredientsContainer: {
    padding: 16,
    backgroundColor: '#f5f6fa',
    marginHorizontal: 16,
    borderRadius: 8,
  },
  ingredientText: {
    fontSize: 16,
    paddingVertical: 4,
  },
  swappedIngredient: {
    color: '#27ae60',
    fontWeight: '500',
  },
  instructionsContainer: {
    padding: 16,
    backgroundColor: '#f5f6fa',
    marginHorizontal: 16,
    borderRadius: 8,
  },
  instructionsText: {
    fontSize: 16,
    lineHeight: 24,
  },
  showMoreButton: {
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  showMoreText: {
    color: '#3498db',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  beverage: {
    backgroundColor: '#e74c3c',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  beverageText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    padding: 16,
  },
});

export default RecipeDetailScreen;