import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  Animated,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Firebase config remains the same
const firebaseConfig = {
  apiKey: "AIzaSyDxWTmBsslJZ80e7mEbDBtCi7FNlrMSuJE",
  authDomain: "ecanteen-4ab1b.firebaseapp.com",
  databaseURL: "https://ecanteen-4ab1b-default-rtdb.firebaseio.com",
  projectId: "ecanteen-4ab1b",
  storageBucket: "ecanteen-4ab1b.firebasestorage.app",
  messagingSenderId: "65494167458",
  appId: " 1:65494167458:web:d3cdfbbafce02a6c5b8cfb",
  measurementId: "G-P52Q86NJ83",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// AlertModal component remains the same
const AlertModal = ({ visible, message, onClose }) => {
  const [animation] = React.useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      animation.setValue(0);
      Animated.spring(animation, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.7, 1],
  });

  return (
    <Modal transparent visible={visible} onRequestClose={onClose} animationType="none">
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.overlayBackground, { opacity }]} />
        <Animated.View
          style={[styles.modalContainer, { transform: [{ translateY }] }]}
        >
          <View style={styles.modalContent}>
            <View style={styles.iconContainer}>
              <View style={styles.warningIcon} />
            </View>
            <Text style={styles.modalTitle}>Alert</Text>
            <Text style={styles.modalMessage}>{message}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const showModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const navigateToMainApp = () => {
    // Navigate to MainApp screen which contains the drawer navigator
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });
  };

  const handleLogin = () => {
    if (!email || !password) {
      showModal("Please enter email and password");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Reset navigation state and navigate to MainApp
        navigateToMainApp();
      })
      .catch((error) => showModal(error.message));
  };

  const handleSignUp = () => {
    if (!email || !password) {
      showModal("Please enter email and password");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        showModal("Account created successfully");
        // Reset navigation state and navigate to MainApp
        navigateToMainApp();
        setIsSignUp(false);
      })
      .catch((error) => showModal(error.message));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        source={require("./assets/bg_main.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{isSignUp ? "Sign Up" : "Login"}</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={isSignUp ? handleSignUp : handleLogin}
              >
                <Text style={styles.buttonText}>
                  {isSignUp ? "SIGN UP" : "LOGIN"}
                </Text>
              </TouchableOpacity>
            </View>

            {!isKeyboardVisible && (
              <Text style={styles.signInText}>
                {isSignUp ? (
                  <>
                    Already have an account?{" "}
                    <Text style={styles.link} onPress={() => setIsSignUp(false)}>
                      Login
                    </Text>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <Text style={styles.link} onPress={() => setIsSignUp(true)}>
                      Sign Up
                    </Text>
                  </>
                )}
              </Text>
            )}

            <AlertModal
              visible={modalVisible}
              message={modalMessage}
              onClose={() => setModalVisible(false)}
            />
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    color: "#000",
    borderWidth: 1, // Adding a border
    borderColor: "#ccc", // Light gray border for better readability
  },
  buttonContainer: {
    width: "80%",
  },
  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6E40",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInText: {
    color: "#fff",
    marginTop: 20,
  },
  link: {
    color: "#FF6E40",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  overlayBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    opacity: 0.7,
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalContent: {
    alignItems: "center",
  },
  warningIcon: {
    width: 30,
    height: 30,
    backgroundColor: "#FF6E40",
    borderRadius: 15,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalMessage: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#FF6E40",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
