import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // To check token
import MainStack from "./MainStack";
import LoginScreen from './LoginScreen'; // Import the login screen

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("access_token"); // Check if the token exists
      if (token) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <MainStack />
      {/* {isLoggedIn ? <MainStack /> : <LoginScreen />} If logged in, show MainStack, otherwise show Login */}
    </NavigationContainer>
  );
};

export default App;
