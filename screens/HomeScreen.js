import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ScrollView,Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput, FlatList } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import foodCategory from './data/food-categories.json';
import { useNavigation } from '@react-navigation/native';
import SeasonalDish from './data/SeasonalDish.json';
import { StatusBar } from 'expo-status-bar';


const HomeScreen = () => {

  const localImages = {
    "a.png": require('./data/a.png'),
    "b.png": require('./data/b.png'),
    "background.png": require('../assets/background.png'),

  };
  const [selectedCategory, setSelectedCategory] = useState(foodCategory[1]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [seasonal, setSeasonal] = useState(SeasonalDish.seasonalDishes);
  const [recipeOfTheDay, setRecipeOfTheDay] = useState(null);
  const navigation = useNavigation()
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('https://cosylab.iiitd.edu.in/recipe/recipeOftheDay')
      .then((response) => response.json())
      .then((data) => {
        if (data.success === "true") {
          setRecipeOfTheDay(data.payload); // Save payload data
        } else {
          console.error("Failed to fetch Recipe of the Day");
        }
      })
      .catch((error) => console.error("Error fetching Recipe of the Day:", error));
  }, []);
  const handleSearch = () => {
    console.log('Search button pressed');
    if (searchText.trim()) {
      console.log('Navigating to RecipeList with query:', searchText);
      navigation.navigate('RecipeList', { query: searchText });
    } else {
      console.log('Search text is empty');
    }
  };


  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  return (
    <ImageBackground
      source={localImages['background.png']}
      style={styles.backgroundImage}
    >
      <ScrollView 
      contentContainerStyle={{ paddingBottom: 70 }}
      nestedScrollEnabled={true} style={styles.container}>
         <View style={styles.orangeCircle} />
         <View style={styles.orangeCircle_up} />

        <Ionicons name="search" size={20} color="#888" style={styles.icon} />

        <TextInput
          style={styles.searchBar}
          placeholder="Cook Something........"
          value={searchText}
          onChangeText={setSearchText}
        />

        <TouchableOpacity
          style={styles.goButton}
          onPress={handleSearch}
        >
          <Text style={styles.goButtonText}>GO</Text>
        </TouchableOpacity>

        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={styles.category}
            horizontal={true}
            data={foodCategory}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryInside,
                  {
                    backgroundColor: selectedCategory?.id === item.id ? 'beige' : 'white',
                  },
                ]}
                key={item.id}
                onPress={() => handleCategoryPress(item)}
              >
                <Image
                  source={
                    item.image.startsWith("http")
                      ? { uri: item.image }
                      : localImages[item.image.split('/').pop()]
                  }
                  style={styles.image}
                />
                <Text
                  style={[
                    styles.name,
                    { color: selectedCategory?.id === item.id ? 'green' : 'black' },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />

          {searchResults.length > 0 && (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.resultItem}>
                  <Text>{item.name}</Text>
                </View>
              )}
            />
          )}

          {/* FlatList for updated items based on the selected category */}
          <View style={styles.selectedCategoryContainer}>
            < Text style={styles.selectedCategoryTitle}>Items in {selectedCategory.name}</Text>
            <FlatList
              showsHorizontalScrollIndicator={true}
              style={styles.updated}
              horizontal={true}
              data={selectedCategory.items}
              renderItem={({ item }) => (
                <View style={styles.categoryInsideUpdated}>
                  <Image source={{ uri: item.image }} style={styles.image_updated} />
                  <Text style={styles.name_updated}>{item.name}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>

          {/* Recipe of the Day Section */}
          {recipeOfTheDay && (
            <View style={styles.recipeOfTheDayContainer}>
              {/* Recipe Item */}
              <FlatList
                data={[recipeOfTheDay]} // Wrapping in an array for FlatList
                horizontal={true}
                renderItem={({ item }) => (
                  <View style={styles.categoryInsideUpdated}>
                    <Image source={{ uri: item.img_url }} style={styles.image_updated} />
                    <Text style={styles.name_updated_up}>{item.Recipe_title}</Text>
                  </View>
                )}
                keyExtractor={(item) => item._id}
              />

              {/* Recipe of the Day Title */}
              <Text style={styles.recipeOfTheDayTitle}>Recipe of the Day</Text>
            </View>
          )}


          <View>
            <Text style={{ fontFamily: 'serif', fontSize: 24, marginLeft: 15 }}>Seasonal Dishes - Winter</Text>
            <FlatList
              showsHorizontalScrollIndicator={true}
              style={styles.updated}
              horizontal={true}
              data={seasonal}
              renderItem={({ item }) => (
                <View style={styles.categoryInsideUpdated}>
                  <Image source={{ uri: item.image }} style={styles.image_updated} />
                  <Text style={styles.name_updated}>{item.name}</Text>
                </View>
              )}

            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: Platform.OS === "ios" ? 60 : 70,
    paddingBottom:50,
  },
  recipeOfTheDayContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 10, 
    paddingHorizontal: 10, 
  },
  recipeOfTheDayTitle: {
    fontSize: 29,
    fontFamily: 'serif',
    marginLeft: 10, 
    color: '#333', 
    flex: 2, 
  },
  orangeCircle: {
    position: 'absolute',
    top: -35, 
    right: -99, 
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'orange',
    opacity: 0.7, 
    zIndex: 0, 
  },
  orangeCircle_up: {
    position: 'absolute',
    top: -120, 
    left: -90, 
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'orange',
    opacity: 0.7, 
    zIndex: 0, 
  },

  goButton: {
    backgroundColor: 'teal',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    height: 50,
    position: 'relative',
    right: -295,
    top: -50
  },
  goButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    height: 50,
    borderWidth: 1,
    borderColor: "teal",
    marginTop: 10,
    shadowOffset: 5,
    paddingLeft: 50,
    borderRadius: 10,
    fontFamily: 'serif',
    fontSize: 16,
    width: '80%',
  },
  icon: {
    position: 'absolute',
    left: 20,
    top: 25,
  },
  category: {

    alignSelf: 'center',

    borderRadius: 25,
    shadowColor: "thistle",
    marginBottom: 19,
  },
  categoryInside: {
    marginRight: 15,
    padding: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 25,
    height: 120,
    fontSize: 3,
    flexDirection: 'column',
    width: 60,
    marginVertical: 10,
    elevation: 10
  },
  image: {
    width: 59,
    height: 59,
    borderRadius: 50,
    borderWidth: 2,
    position: 'relative',
    top: -13,
    left: -10.5,
    elevation: 30
  },
  image_updated: {

    width: '100%',
    height: '100%',
    borderRadius: 23,
    borderWidth: 1,


  },
  name: {
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  updated: {
    paddingHorizontal: 10,
    marginRight: 15,
    borderRadius: 25,
    height: 200,
    flexDirection: 'row',
    overflow: 'visible',
    shadowColor: 'thistle',
    shadowOpacity: 1,
    shadowOffset: {
      x: 9,
    }
  },
  item: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  selectedCategoryContainer: {
    borderRadius: 25,
  },
  categoryInsideUpdated: {

    marginRight: 15,
    borderWidth: 1,
    borderRadius: 25,
    height: 160,
    flexDirection: "column",
    width: 150,
    marginVertical: 10,
  },
  categoryInsideUpdated_up: {
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 25,
    height: 160,
    flexDirection: "column",
    width: 150,
    marginVertical: 10,
    zIndex: -1,
  },
  selectedCategoryTitle: {
    fontSize: 20,
    fontFamily: 'serif',
    fontWeight: "700",
    paddingLeft: 14,
  },
  name_updated: {
    fontFamily: 'serif',
    color: 'white',
    position: "relative",
    top: -22,
    left: 10,
  },
  name_updated_up: {
    fontFamily: 'serif',
    color: '#FF8C00',
    fontSize:13,
    position: "relative",
    top: -150,
    left: 10,
  },
})