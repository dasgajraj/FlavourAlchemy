import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './screens/LoginStructure/LoadingScreen';
import GetStartedScreen from './screens/LoginStructure/GetStartedScreen';
import LoginScreen from './LoginScreen';
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

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

export default AuthStack;