import React, { useEffect, useState } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const LoadingScreen = () => {
  const [fadeAnim1] = useState(new Animated.Value(0)); 
  const [fadeAnim2] = useState(new Animated.Value(0)); 
  const [fadeAnim3] = useState(new Animated.Value(0)); 
  const navigation = useNavigation();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(1000),

      Animated.parallel([
        Animated.timing(fadeAnim1, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim3, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1000),

      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000), 

    ]).start(() => {
      navigation.replace('GetStartedScreen');
    });
  }, [fadeAnim1, fadeAnim2, fadeAnim3, navigation]);

  return (
    <ImageBackground 
      source={require('../../assets/bg_main.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Animated.View style={[styles.imageContainer, { opacity: fadeAnim2, top: height * 0.25 - 50 }]}>
          <Image source={{ uri: 'https://i.ibb.co/grbDpNG/load1.png' }} style={styles.image} />
        </Animated.View>
        <Animated.View style={[styles.imageContainer, { opacity: fadeAnim1, top: height * 0.5 - 50 }]}>
          <Image source={{ uri: 'https://i.ibb.co/41ytG1f/load2.png' }} style={styles.image} />
        </Animated.View>
        <Animated.View style={[styles.imageContainer, { opacity: fadeAnim3, top: height * 0.75 - 50 }]}>
          <Image source={{ uri: 'https://i.ibb.co/W0zD7wT/289-2897785-healthy-meal-food-top-view-png-1-photoaidcom-cropped.png' }} style={styles.image} />
        </Animated.View>
      </View>
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
  },
  imageContainer: {
    position: 'absolute',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default LoadingScreen;
