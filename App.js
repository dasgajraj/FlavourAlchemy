import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import screens
import HomeScreen from './screens/HomeScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import RecipeListScreen from './screens/RecipeListScreen';
import LoadingScreen from './screens/LoginStructure/LoadingScreen';
import LoginScreen from './LoginScreen';
import GetStartedScreen from './screens/LoginStructure/GetStartedScreen';
import CustomDrawerContent from "./screens/CustomDrawerConten";
import MyProfile from "./screens/DrawerScreens/MyProfile";
import MyTaste from "./screens/DrawerScreens/MyTaste";
import MyAllergies from "./screens/DrawerScreens/MyAllergies";
import ContactUs from "./screens/DrawerScreens/ContactUs";
import Help from "./screens/DrawerScreens/Help";
import Favorites from "./screens/TabScreens/Favorites";
import Recents from "./screens/TabScreens/Recents";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: "teal",
        tabBarInactiveTintColor: 'grey',
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={Favorites} 
        options={{
          tabBarLabel: "Favourites",
          tabBarIcon: ({color}) => <Ionicons name="heart" size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="Recents" 
        component={Recents}
        options={{
          tabBarLabel: "Recents",
          tabBarIcon: ({color}) => <Ionicons name="time" size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={MyProfile}
        options={{
          tabBarLabel: "My Profile",
          tabBarIcon: ({color}) => <Ionicons name="person" size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  );
};

// Authentication Stack Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MainApp" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

// Main Stack Navigator (for the app content)
const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainHome" component={HomeScreen} />
      <Stack.Screen name="RecipeList" component={RecipeListScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </Stack.Navigator>
  );
};

// Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: '#f5f5f5',
          width: 280,
        },
        drawerActiveTintColor: '#6a1b9a',
        drawerInactiveTintColor: '#555',
        drawerActiveBackgroundColor: '#e1bee7',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          title: 'Dashboard',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="MyTaste"
        component={MyTaste}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="MyAllergies"
        component={MyAllergies}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="medical" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactUs}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="call" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

// Root App Component
const App = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default App;