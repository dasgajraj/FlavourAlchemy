import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStack from "./MainStack";
import LoginScreen from './LoginScreen';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        setIsLoggedIn(true); 
      } else {
        setIsLoggedIn(false);
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
