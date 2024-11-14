import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput, FlatList, Button } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import foodCategory from './data/food-categories.json';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(foodCategory[1]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const navigation = useNavigation();

  const handleSearch = async () => {
    // You can now pass searchText to navigate to the RecipeList screen
    if (searchText.trim()) {  // Check if the searchText is not empty
      navigation.navigate('RecipeList', { query: searchText });
    }
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
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
          style={styles.category}
          horizontal={true}
          data={foodCategory}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryInside,
                {
                  backgroundColor: selectedCategory?.id === item.id ? 'thistle' : 'white',
                },
              ]}
              key={item.id}
              onPress={() => handleCategoryPress(item)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
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
        {selectedCategory && (
          <View style={styles.selectedCategoryContainer}>
            <Text style={styles.selectedCategoryTitle}>Items in {selectedCategory.name}</Text>
            <FlatList
              style={styles.updated}
              horizontal={true}
              data={selectedCategory.items}  // Assuming 'items' is an array in each category
              renderItem={({ item }) => (
                <View style={styles.categoryInside}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )}
      </View>

      <View>
        <Text style={{ fontFamily: 'serif', fontSize: 24, marginLeft: 15 }}>Seasonal Dishes - Winter</Text>
        <Text>seasonal item FlatList</Text>
      </View>
    </View>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'beige',
      padding:16,
        
    },
    goButton: {
      backgroundColor: 'teal',
      borderRadius: 13,
      alignItems: 'center',
      justifyContent: 'center',
      width: '15%',
      height: 50,
      position:'relative',
      right:-325,
      top:-50
    },
    goButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    searchBar:{
        height:50,
        borderWidth:1,
        borderColor:"teal",
        marginTop:10,
        shadowOffset:5,    
        paddingLeft:50,
        borderRadius:10,    
        fontFamily:'serif',
        fontSize:16,
    },
    icon: {
        position: 'absolute',
        left:20,
        top:45,
    },
    category:{
        paddingVertical: 20,
        alignSelf: 'center',
        // marginHorizontal: 30,
        borderRadius: 25,
        shadowColor: "thistle",
        marginBottom:19,
    },
    categoryInside: {
        marginRight: 15,
        padding: 10,
        borderWidth:1,
        borderRadius: 25, 
        height: 50, 
        flexDirection: 'column',
        width: 125,
        marginVertical: 10,
      },
      image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth:2,
        position:'relative',
        top:-11,
        left:-10,
      },
      name:{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      updated: {
        marginRight: 15,
        padding: 10,
        borderWidth:1,
        borderRadius: 25, 
        height: 200, 
        flexDirection: 'column',
      
        width: '100%',
        marginVertical: 10,
      },
      item: {
        alignItems: 'center',
        marginHorizontal: 10,
      },
      selectedCategoryContainer:{
        borderRadius: 25,
      },
})