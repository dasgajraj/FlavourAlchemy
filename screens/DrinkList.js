import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  RefreshControl,
} from 'react-native';

const staticData = [
  {
    Recipe_id: 1,
    Recipe_title: 'Tomato Soup',
    image: 'https://as2.ftcdn.net/v2/jpg/08/60/02/91/1000_F_860029137_wJu8lP7PqNNu5C6WmVku8fLHdCqgN5bo.jpg',
  },
  {
    Recipe_id: 2,
    Recipe_title: 'Lemonade',
    image: 'https://as1.ftcdn.net/v2/jpg/05/09/57/94/1000_F_509579473_NBZo6D0mT6liXdkkenuWGNUf032i63Pb.jpg',
  },
  {
    Recipe_id: 3,
    Recipe_title: 'Orange Juice',
    image: 'https://as2.ftcdn.net/v2/jpg/01/12/44/75/1000_F_112447537_c9rFQ186salogZw0SKSwv5QOFspEM14o.jpg',
  },
  {
    Recipe_id: 4,
    Recipe_title: 'Cocktail Delight',
    image: 'https://as2.ftcdn.net/v2/jpg/09/15/12/71/1000_F_915127153_8TrInn9Hd1F5WovT1sRRWuJfgEOl32xM.jpg',
  },
  {
    Recipe_id: 5,
    Recipe_title: 'Vinigar Tonic', // Intentional typo
    image: 'https://as1.ftcdn.net/v2/jpg/10/62/19/92/1000_F_1062199256_ttHCWAVNwC64W0MVyTO20Yi11oDci6vk.jpg',
  },
  {
    Recipe_id: 6,
    Recipe_title: 'Mango Smoothie',
    image: 'https://as1.ftcdn.net/v2/jpg/09/49/31/56/1000_F_949315678_74KeWHW1v7d03CZniFhF6NwR4532jWJG.jpg',
  },
  {
    Recipe_id: 7,
    Recipe_title: 'Mocktail Surprise',
    image: 'https://as1.ftcdn.net/v2/jpg/10/25/57/86/1000_F_1025578623_oVkBhVPXo0d28oQehtUbRxZcWnWxIojw.jpg',
  },
  {
    Recipe_id: 8,
    Recipe_title: 'Chocolate Shake',
    image: 'https://as1.ftcdn.net/v2/jpg/08/26/32/72/1000_F_826327270_UuGcDi6Jf0kCoLHFM7C6pBEOIoUW72Ko.jpg',
  },
];

const drinkKeywords = [
  'Soup',
  'Lemonade',
  'Juice',
  'Cocktail',
  'Vinegar',
  'vinigar',
  'Smoothie',
  'Mocktail',
  'Shake',
];

const isDrinkRecipe = (recipe) => {
  return drinkKeywords.some(keyword =>
    recipe.Recipe_title?.toLowerCase().includes(keyword.toLowerCase())
  );
};

const DrinksList = ({ navigation }) => {
  const [drinks, setDrinks] = useState(
    staticData.filter(recipe => isDrinkRecipe(recipe))
  );
  const [refreshing, setRefreshing] = useState(false);

  const navigateToRecipeDetail = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setDrinks(staticData.filter(recipe => isDrinkRecipe(recipe)));
      setRefreshing(false);
    }, 1000); 
  };

  const renderDrinkItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigateToRecipeDetail(item)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.Recipe_title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={drinks}
      renderItem={renderDrinkItem}
      keyExtractor={item => item.Recipe_id.toString()}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      ListHeaderComponent={() => (
        <Text style={styles.headerTitle}>Drink Recipes</Text>
      )}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No drinks found</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3, 
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default DrinksList;
