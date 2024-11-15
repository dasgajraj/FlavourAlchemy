import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    // Here you can add functionality to send the message (e.g., to an API or email)
    Alert.alert('Message Sent', 'Thank you for contacting us! We will get back to you soon.');
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleCallSupport = () => {
    Linking.openURL('tel:8800475404');
  };

  const handleEmailSupport = () => {
    Linking.openURL('mailto:0264nishu@gmail.com');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>

      {/* Contact Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Your Message"
          value={message}
          onChangeText={setMessage}
          multiline
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSendMessage}
        >
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Options */}
      <View style={styles.contactOptions}>
        <Text style={styles.contactText}>Or reach us via:</Text>
        <TouchableOpacity onPress={handleCallSupport}>
          <Text style={styles.contactMethod}>Call Support: +91 8800475404</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEmailSupport}>
          <Text style={styles.contactMethod}>Email Support: 0264nishu@gmail.com</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f7fc',
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2a2a2a',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1.2,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  contactOptions: {
    marginTop: 30,
    alignItems: 'center',
  },
  contactText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 12,
  },
  contactMethod: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 12,
    textDecorationLine: 'underline',
  },
});

export default ContactUsPage;
