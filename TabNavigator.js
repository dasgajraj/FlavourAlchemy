import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from './screens/HomeScreen';
import Preferences from "./screens/LoginStructure/Preferences";
import Recents from "./screens/TabScreens/Recents";
import MyProfile from "./screens/DrawerScreens/MyProfile";

const Tab = createBottomTabNavigator();

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
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
                }}
            />
            <Tab.Screen
                name="Preferences"
                component={Preferences}
                options={{
                    tabBarLabel: "Favourites",
                    tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />
                }}
            />
            <Tab.Screen
                name="Recents"
                component={Recents}
                options={{
                    tabBarLabel: "Recents",
                    tabBarIcon: ({ color }) => <Ionicons name="time" size={24} color={color} />
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={MyProfile}
                options={{
                    tabBarLabel: "My Profile",
                    tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />
                }}
            />
        </Tab.Navigator>

        // </Tab.Navigator>
    );
};

export default TabNavigator;