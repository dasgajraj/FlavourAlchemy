// import React, { useState } from "react";
// import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const navigation = useNavigation();

//   // Function to display modal with error messages
//   const showModal = (message) => {
//     setModalMessage(message);
//     setModalVisible(true);
//   };

//   // Handle Login functionality
//   const handleLogin = async () => {
//     if (!email || !password) {
//       showModal("Please enter email and password");
//       return;
//     }

//     const API_URL = "http://192.168.161.106:8000/api/token/";  // Include port


//     try {
//       const response = await axios.post(API_URL, {
//         username: email, // Ensure the correct field name for the backend
//         password: password,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//       });

//       if (response.data.access && response.data.refresh) {
//         await AsyncStorage.setItem("access_token", response.data.access);
//         await AsyncStorage.setItem("refresh_token", response.data.refresh);
//         console.log('Tokens stored successfully');
//         navigation.replace("MainHome");
//       } else {
//         showModal("Unexpected server response");
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.detail ||
//         error.response?.data?.message ||
//         error.message ||
//         "Invalid credentials or error in login";
//       showModal(errorMessage);
//     }
//   };

//   // Test API connection (Optional for debugging)
//   const testConnection = async () => {
//     try {
//       const response = await axios.get(const API_URL = "http://192.168.161.106:8000/api/token/");
//       console.log('Test connection successful:', response.data);
//       return true;
//     } catch (error) {
//       console.log('Test connection failed:', error.message);
//       return false;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Your email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>LOGIN</Text>
//       </TouchableOpacity>

//       {/* Modal for error messages */}
//       <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} transparent={true}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalMessage}>{modalMessage}</Text>
//             <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Optional debug button to test connection */}
//       <TouchableOpacity style={styles.button} onPress={testConnection}>
//         <Text style={styles.buttonText}>Test Connection</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: "80%",
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: "#FF6E40",
//     padding: 15,
//     borderRadius: 5,
//     width: "80%",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContainer: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   modalMessage: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   closeButton: {
//     backgroundColor: "#FF6E40",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   closeButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

// export default LoginScreen;
