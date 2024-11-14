// CustomDrawerContent.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>Welcome, Chef!</Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#c6cbdf',
    borderRadius:50,
    marginBottom:23,

  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'teal',
    fontFamily:'serif'
  },
});

export default CustomDrawerContent;
