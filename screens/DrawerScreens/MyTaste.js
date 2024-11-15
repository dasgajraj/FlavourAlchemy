import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

const chosenRecipes = [
  { id: 1, title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish.', image: 'https://via.placeholder.com/350x200/0000FF/808080?text=Spaghetti+Carbonara' },
  { id: 2, title: 'Grilled Chicken', description: 'Delicious grilled chicken with herbs.', image: 'https://via.placeholder.com/350x200/FF6347/FFFFFF?text=Grilled+Chicken' },
  { id: 3, title: 'Vegetable Stir Fry', description: 'A healthy vegetable stir fry.', image: 'https://via.placeholder.com/350x200/FFD700/FFFFFF?text=Vegetable+Stir+Fry' },
  { id: 4, title: 'Tacos', description: 'Mexican tacos with fresh ingredients.', image: 'https://via.placeholder.com/350x200/32CD32/FFFFFF?text=Tacos' },
  { id: 5, title: 'Sushi Rolls', description: 'Fresh and delicious sushi rolls.', image: 'https://via.placeholder.com/350x200/8A2BE2/FFFFFF?text=Sushi+Rolls' },
];

const MyTastePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Taste</Text>
      <ScrollView contentContainerStyle={styles.recipeGrid}>
        {chosenRecipes.map((recipe) => (
          <View key={recipe.id} style={[styles.recipeCard, styles.shadowEffect]}>
            <ImageBackground source={{ uri: recipe.image }} style={styles.recipeImage} imageStyle={styles.recipeImageStyle}>
              <View style={styles.overlay}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeDescription}>{recipe.description}</Text>
                <TouchableOpacity style={[styles.viewButton, styles.shadowEffect]}>
                  <Text style={styles.viewButtonText}>View Recipe</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 20,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    textTransform: 'uppercase',
    fontFamily: 'Playfair Display',
  },
  recipeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recipeCard: {
    width: '48%',
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    transform: [{ scale: 1 }],
    marginRight: '2%',
  },
  shadowEffect: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recipeImage: {
    width: '100%',
    height: 220,
    justifyContent: 'flex-end',
    borderRadius: 15,
    overflow: 'hidden',
  },
  recipeImageStyle: {
    borderRadius: 15,
    opacity: 0.9,
  },
  overlay: {
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    fontFamily: 'Playfair Display',
  },
  recipeDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  viewButton: {
    backgroundColor: 'rgba(40, 167, 69, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
});

export default MyTastePage;