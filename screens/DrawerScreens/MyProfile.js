import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
    const [firstName, setFirstName] = useState('Alice');
    const [lastName, setLastName] = useState('Johnson');
    const [email, setEmail] = useState('alice.johnson@example.com');

    const handleSaveChanges = () => {
        Alert.alert('Profile Updated', `Name: ${firstName} ${lastName}\nEmail: ${email}`);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/women/79.jpg' }} 
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>Profile Information</Text>
            </View>

            {/* User Information Section */}
            <View style={styles.infoContainer}>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="First Name"
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Last Name"
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                    placeholderTextColor="#888"
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FF7F50',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    infoContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 4,
        marginHorizontal: 15,
        marginTop: 10,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#f8f8f8',
    },
    saveButton: {
        backgroundColor: '#FF7F50',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;