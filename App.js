import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import DrawerNavigator from "./DrawerNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <MainStack/>
    
    </NavigationContainer>
  );
};

export default App;