import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import RecipeListScreen from './screens/RecipeListScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import DrawerNavigator from './DrawerNavigator';
import PostBeverage from './screens/BeveragePairing';
import DrinksList from './screens/DrinkList';
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="MainHome" component={HomeScreen} />
      <Stack.Screen name="RecipeList" component={RecipeListScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      <Stack.Screen name="DrinksList" component={DrinksList} />
      <Stack.Screen name="BeveragePairing" component={PostBeverage} />
      
    </Stack.Navigator>
  );
};

export default MainStack;