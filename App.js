import { StyleSheet} from 'react-native';
import AppDrawer from './AppDrawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStack from './HomeStack';


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <AppDrawer Homestack={HomeStack}/>
    </NavigationContainer>
  );
}
