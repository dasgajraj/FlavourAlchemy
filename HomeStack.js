import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import RecipeListScreen from './screens/RecipeListScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown:false,
        }} 
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RecipeList" component={RecipeListScreen} />      
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
