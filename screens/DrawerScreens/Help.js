import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Linking,
} from 'react-native';

const HelpPage = () => {
  const [searchText, setSearchText] = useState('');
  const [faqs, setFaqs] = useState([
    {
      id: '1',
      question: 'How do I search for recipes?',
      answer: 'Use the search bar on the home page to enter ingredients or dish names.',
      expanded: false,
    },
    {
      id: '2',
      question: 'How do I filter recipes by season?',
      answer: 'Select "Seasonal Dishes" in the menu to browse recipes by season.',
      expanded: false,
    },
    {
      id: '3',
      question: 'Can I save my favorite recipes?',
      answer: 'Yes, tap the heart icon on any recipe to add it to your favorites.',
      expanded: false,
    },
    {
      id: '4',
      question: 'How do I find beverages that pair with my dish?',
      answer: 'In the "Beverage Selection" section, enter your dish name or choose a category.',
      expanded: false,
    },
    {
      id: '5',
      question: 'Can I customize recipes to adjust ingredient quantities?',
      answer: 'Yes, use the "Adjust Ingredients" button in the recipe view to customize quantities.',
      expanded: false,
    },
    {
      id: '6',
      question: 'What does the sessional food feature offer?',
      answer: 'It provides recipes and dishes that are perfect for the current season or festival.',
      expanded: false,
    },
  ]);
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredFaqs(faqs);
    } else {
      setFilteredFaqs(
        faqs.filter((faq) =>
          faq.question.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const toggleFaq = (id) => {
    setFilteredFaqs((prevFaqs) =>
      prevFaqs.map((faq) =>
        faq.id === id ? { ...faq, expanded: !faq.expanded } : faq
      )
    );
  };

  const handleSendMessage = (message) => {
    if (message.trim() === '') return;
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { type: 'user', text: message },
      { type: 'bot', text: 'Thank you for reaching out! Our team will respond shortly.' },
    ]);
  };

  const submitFeedback = () => {
    Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
    setFeedbackModalVisible(false);
    setFeedbackText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help Center</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for help topics..."
        value={searchText}
        onChangeText={handleSearch}
      />

      {/* FAQ Section */}
      <FlatList
        data={filteredFaqs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.faqItem}>
            <TouchableOpacity onPress={() => toggleFaq(item.id)}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
            </TouchableOpacity>
            {item.expanded && <Text style={styles.faqAnswer}>{item.answer}</Text>}
          </View>
        )}
      />

      {/* Live Chat Button */}
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => setIsChatOpen(true)}
      >
        <Text style={styles.chatButtonText}>Live Chat</Text>
      </TouchableOpacity>

      {/* Feedback Section */}
      <TouchableOpacity
        style={styles.feedbackButton}
        onPress={() => setFeedbackModalVisible(true)}
      >
        <Text style={styles.feedbackButtonText}>Leave Feedback</Text>
      </TouchableOpacity>

      {/* Contact Options */}
      <View style={styles.contactOptions}>
        <TouchableOpacity
          onPress={() => Linking.openURL('tel:8800475xxx')}
        >
          <Text style={styles.contactText}>Call Support</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:0264nishu@gmail.com')}
        >
          <Text style={styles.contactText}>Email Support</Text>
        </TouchableOpacity>
      </View>

      {/* Live Chat Modal */}
      <Modal visible={isChatOpen} animationType="slide">
        <View style={styles.chatContainer}>
          <FlatList
            data={chatMessages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Text
                style={[
                  styles.chatMessage,
                  item.type === 'user' ? styles.userMessage : styles.botMessage,
                ]}
              >
                {item.text}
              </Text>
            )}
          />
          <TextInput
            style={styles.chatInput}
            placeholder="Type your message..."
            onSubmitEditing={(event) =>
              handleSendMessage(event.nativeEvent.text)
            }
          />
          <TouchableOpacity
            style={styles.closeChatButton}
            onPress={() => setIsChatOpen(false)}
          >
            <Text style={styles.closeChatText}>Close Chat</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Feedback Modal */}
      <Modal visible={feedbackModalVisible} animationType="fade">
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackHeader}>We value your feedback!</Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Write your feedback here..."
            multiline
            value={feedbackText}
            onChangeText={setFeedbackText}
          />
          <TouchableOpacity
            style={styles.submitFeedbackButton}
            onPress={submitFeedback}
          >
            <Text style={styles.submitFeedbackText}>Submit Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeFeedbackButton}
            onPress={() => setFeedbackModalVisible(false)}
          >
            <Text style={styles.closeFeedbackText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#bcc4cc' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  searchBar: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 20, backgroundColor: '#fff' },
  faqItem: { marginBottom: 15, padding: 10, borderRadius: 8, backgroundColor: '#fff', elevation: 3 },
  faqQuestion: { fontSize: 16, fontWeight: 'bold', color: '#333',height:40 },
  faqAnswer: { marginTop: 5, fontSize: 14, color: '#555' },
  chatButton: { backgroundColor: '#007bff', padding: 12, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  chatButtonText: { color: '#fff', fontSize: 16 },
  feedbackButton: { backgroundColor: '#28a745', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  feedbackButtonText: { color: '#fff', fontSize: 16 },
  contactOptions: { marginTop: 20, alignItems: 'center' },
  contactText: { fontSize: 16, color: '#007bff', marginTop: 10 },
  chatContainer: { flex: 1, padding: 20, backgroundColor: '#fff' },
  chatMessage: { marginVertical: 5, padding: 10, borderRadius: 8, maxWidth: '75%' },
  userMessage: { backgroundColor: '#007bff', color: '#fff', alignSelf: 'flex-end' },
  botMessage: { backgroundColor: '#f1f1f1', color: '#333', alignSelf: 'flex-start' },
  chatInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginTop: 10, backgroundColor: '#f8f9fa' },
  closeChatButton: { marginTop: 10, backgroundColor: '#dc3545', padding: 10, borderRadius: 8, alignItems: 'center' },
  closeChatText: { color: '#fff', fontSize: 16 },
  feedbackContainer: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  feedbackHeader: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  feedbackInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, backgroundColor: '#f8f9fa', height: 100 },
  submitFeedbackButton: { backgroundColor: '#28a745', padding: 12, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  submitFeedbackText: { color: '#fff', fontSize: 16 },
  closeFeedbackButton: { marginTop: 10, alignItems: 'center' },
  closeFeedbackText: { color: '#dc3545', fontSize: 16 },
});

export default HelpPage;
