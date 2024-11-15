import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ImageBackground 
} from 'react-native';

const GetStartedScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../../assets/bg_main.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        {/* Logo */}
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text style={styles.titleText}>FLAVOUR ALCHEMY</Text>
        
        {/* Characters Image */}
        <View style={styles.charactersContainer}>
          <Image 
            source={require('../../assets/character1.png')} 
            style={styles.character1}
            resizeMode="contain"
          />
          <Image 
            source={require('../../assets/character2.png')} 
            style={styles.character2}
            resizeMode="contain"
          />
        </View>

        {/* Get Started Button */}
        <TouchableOpacity 
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 30,
  },
  charactersContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  character1: {
    width: 250,
    height: 250,
  },
  character2: {
    width: 250,
    height: 250,
  },
  textContainer: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 40,
  },
  titleText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: 'white',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fc460b',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GetStartedScreen;
