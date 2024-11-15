import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import MyProfile from "./screens/DrawerScreens/MyProfile";
import Settings from "./screens/Settings";
import Favorites from "./screens/TabScreens/Favorites"
import Recents from "./screens/TabScreens/Recents"
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator()

export default function App() {
    
    return (
        <Tab.Navigator screenOptions={{
            headerShown:false,
                tabBarLabelPosition:"below-icon",
                // tabBarShowLabel:false, //--default value(True)
                tabBarActiveTintColor:"thistle",
                tabBarInactiveTintColor:'teal',
            }}>
                <Tab.Screen name="Home" component={HomeStack} />
                
               
                <Tab.Screen name="Favorites" component={Favorites} options ={{
                    headerShown:false,
                }}/>
                 <Tab.Screen name="Recents" component={Recents} />
                <Tab.Screen name="MyProfile" component={MyProfile} options={{
                    tabBarLabel:"MY Profile",
                    tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />
                    // tabBarBadge:1
                }} />
        </Tab.Navigator>      

    )
}