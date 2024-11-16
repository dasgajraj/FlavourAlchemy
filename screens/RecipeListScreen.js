import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Button, SafeAreaView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
export default function RecipeListScreen() {
  const route = useRoute();
  const { query = '' } = route.params || {};  
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const fetchData = async () => {
    setLoading(true);
    setError(null); 
    try {
      const fetchedRecipes = await fetchRecipes(query);
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error('Error during fetch operation:', error);
      setError('Failed to load recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, [query]);

  const fetchRecipes = async (query) => {
    try {
      const response = await fetch('https://cosylab.iiitd.edu.in/recipe?pageSize=100&page=1');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

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
      throw new Error('Network error');
    }
  };

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipeId: recipe.Recipe_id });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="beige" />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button title="Retry" onPress={fetchData} />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={recipes}
            keyExtractor={(item) => item.Recipe_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.recipeContainer} onPress={() => handleRecipePress(item)}>
                <Text style={styles.recipeTitle}>{item.Recipe_title}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No recipes found for "{query}"</Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'beige',
    paddingTop: Platform.OS === 'android' ? 55 : 0, 
  },
  container: {
    flex: 1,
    backgroundColor: 'beige',
    marginTop: 20, 
  },
  listContainer: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20, 
  },
  recipeContainer: {
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
});