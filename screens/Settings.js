import React from 'react';
import { View, Text, Switch, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  return (
    <ScrollView style={styles.container}>
   
      <View style={styles.header}>
        <Ionicons name="settings-outline" size={38} color="white" style={styles.icon} />
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/78.jpg' }} // Sample profile image
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Nishant Garg</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Edit profile</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Change password</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="gray" />
        </TouchableOpacity>
        <View style={styles.option}>
          <Text style={styles.optionText}>Push notifications</Text>
          <Switch />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>More</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>About us</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Privacy policy</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Terms and conditions</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7F50',
    padding: 20,
    paddingTop: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30,
    marginLeft: 10,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: -30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    color: 'gray',
    marginVertical: 10,
    fontWeight: '600',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginTop: -30, // Adjust this value as needed to move the icon up
  },
});

export default SettingsScreen;
