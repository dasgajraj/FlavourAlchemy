import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import {
  healthySwaps,
  getHealthySubstitute,
  calculateCalorieSavings,
  convertMeasurement,
  adjustQuantity,
  getAdjustedCookingInstructions
} from './RecipeHelper';

const isDrinkRecipe = (recipe) => {
  const drinkKeywords = [
    'drink', 'juice', 'smoothie', 'shake', 'tea',
    'coffee', 'latte', 'cocktail', 'punch', 'wine',
    'beer', 'liquor', 'beverage', 'milk', 'lemonade'
  ];

  const titleMatch = drinkKeywords.some(keyword =>
    recipe.Recipe_title.toLowerCase().includes(keyword)
  );

  const drinkCharacteristics = (
    recipe.prep_time <= 15 &&
    (recipe.Processes?.toLowerCase().includes('blend') ||
      recipe.Processes?.toLowerCase().includes('pour') ||
      recipe.Processes?.toLowerCase().includes('stir')) &&
    parseFloat(recipe.nutritions?.Water) > 200
  );

  return titleMatch || drinkCharacteristics;
};

const DrinksList = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDrinks = async (pageNum = 1, shouldRefresh = false) => {
    try {
      const response = await fetch(`https://cosylab.iiitd.edu.in/recipe/?page=${pageNum}`);
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const drinkItems = data.payload.filter(recipe => isDrinkRecipe(recipe));

      if (shouldRefresh) {
        setDrinks(drinkItems);
      } else {
        setDrinks(prevDrinks => [...prevDrinks, ...drinkItems]);
      }

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, []);

  const renderDrinkItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToRecipeDetail(item.Recipe_id)}>
      <Text>{item.Recipe_title}</Text>
    </TouchableOpacity>
  );

  const navigateToRecipeDetail = (recipeId) => {
    navigation.navigate('RecipeDetail', { recipeId });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchDrinks(1, true);
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
      fetchDrinks(page + 1);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 70 }}>
      <FlatList
        data={drinks}
        renderItem={renderDrinkItem}
        keyExtractor={item => item.Recipe_id}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => (
          <Text style={styles.headerTitle}>Drink Recipes</Text>
        )}
        ListEmptyComponent={() => (
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No drinks found</Text>
            </View>
          )
        )}
        ListFooterComponent={() => (
          loading && <ActivityIndicator style={styles.loader} />
        )}
      />
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default DrinksList;
