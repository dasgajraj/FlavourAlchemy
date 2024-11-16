import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from "./screens/CustomDrawerConten";
import MyProfile from "./screens/DrawerScreens/MyProfile"
import MyTaste from "./screens/DrawerScreens/MyTaste";
import MyAllergies from "./screens/DrawerScreens/MyAllergies";
import ContactUs from "./screens/DrawerScreens/ContactUs";
import Help from "./screens/DrawerScreens/Help";
import SettingsScreen from "./screens/Settings";
import TabNavigator from "./TabNavigator";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: true,
                headerTitle: '', 
                headerTransparent: true,
                drawerStyle: {
                    backgroundColor: '#bcc4cc',
                    width: 280,
                },
                drawerActiveTintColor: '#6a1b9a',
                drawerInactiveTintColor: '#555',
                drawerActiveBackgroundColor: '#e1bee7',
                drawerLabelStyle: {
                    fontSize: 16,
                    fontWeight: '500',
                },
                headerStyle: {
                    backgroundColor: '#bcc4cc', 
                    elevation: 0, 
                    shadowOpacity: 0, 
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
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name="cogs" size={size} color={color} />)
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;