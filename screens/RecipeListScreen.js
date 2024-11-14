import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RecipeListScreen() {
  const route = useRoute();
  const { query } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedRecipes = await fetchRecipes(query);
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Error during fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const fetchRecipes = async (query) => {
    try {
      const response = await fetch('https://cosylab.iiitd.edu.in/recipe?pageSize=100&page=1');
      const { payload } = await response.json();

      if (!payload?.data || !Array.isArray(payload.data)) {
        console.error('Data not found or unexpected format:', payload);
        return [];
      }

      const recipesData = payload.data;

      if (!query || query.trim() === '') {
        return recipesData;
      }

      const filteredRecipes = recipesData.filter((recipe) =>
        recipe.Recipe_title?.toLowerCase().includes(query.toLowerCase())
      );

      return filteredRecipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  };

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipeId: recipe.Recipe_id });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.Recipe_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.recipeContainer}
             onPress={() => handleRecipePress(item)} >
                 <Text style={styles.recipeTitle}>{item.Recipe_title}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No recipes found for "{query}"</Text>
          }
        />

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  recipeContainer: {
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
}); 