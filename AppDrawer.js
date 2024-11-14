import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./screens/HomeScreen";
import Settings from "./screens/Settings";
import HomeStack from "./HomeStack";
import CustomDrawerContent from "./screens/CustomDrawerConten";
import MyProfile from "./screens/DrawerScreens/MyProfile";
import MyTaste from "./screens/DrawerScreens/MyTaste";
import MyAllergies from "./screens/DrawerScreens/MyAllergies";
import ContactUs from "./screens/DrawerScreens/ContactUs";
import Help from "./screens/DrawerScreens/Help";
import { HeaderTitle } from "@react-navigation/elements";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
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
                    name="HomeScreen"
                    component={HomeStack}
                    options={{
                        title: 'Dashboard',
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="dashboard" color={color} size={size} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="MyProfile"
                    component={MyProfile}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="person" color={color} size={size} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="MyTaste"
                    component={MyTaste}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="favorite" color={color} size={size} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="MyAllergies"
                    component={MyAllergies}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="healing" color={color} size={size} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Contact"
                    component={ContactUs}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="contact-support" color={color} size={size} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="settings" color={color} size={size} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Help"
                    component={Help}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="help" color={color} size={size} />
                        ),
                    }}
                />
            </Drawer.Navigator>
    );
}
