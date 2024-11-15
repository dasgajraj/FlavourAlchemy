import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const allergies = [
  { id: 1, name: 'Peanuts', severity: 'Severe', image: 'https://as2.ftcdn.net/v2/jpg/01/46/56/39/1000_F_146563965_rrIH5hfzH5HE14ZupVpNzFu5Bny1wgbd.jpg' },
  { id: 2, name: 'Shellfish', severity: 'Moderate', image: 'https://as2.ftcdn.net/v2/jpg/06/33/75/41/1000_F_633754197_QWU7SL0d6GKzseJTNCfiHHrayooQFJs8.jpg' },
  { id: 3, name: 'Lactose', severity: 'Mild', image: 'https://as2.ftcdn.net/v2/jpg/10/36/81/95/1000_F_1036819565_dwIt3v4W98A7mgePf8i2s3oHMJIz3Hk5.jpg' },
  { id: 4, name: 'Wheat', severity: 'Severe', image: 'https://as1.ftcdn.net/v2/jpg/01/60/57/36/1000_F_160573622_vXgBJ0sou1iFZbPNCodTkCde4SkC5v8r.jpg' },
];

const MyAllergiesPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Allergies</Text>
      <FlatList
        data={allergies}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.allergiesGrid}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={[styles.allergyCard, styles.shadowEffect]}>
            <Image source={{ uri: item.image }} style={styles.allergyImage} />
            <Text style={styles.allergyName}>{item.name}</Text>
            <Text style={[styles.allergySeverity, styles.severityColor(item.severity)]}>
              {item.severity}
            </Text>
            <TouchableOpacity style={[styles.manageButton, styles.shadowEffect]}>
              <Text style={styles.manageButtonText}>Manage</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 20,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    textTransform: 'uppercase',
    fontFamily: 'Playfair Display',
  },
  allergiesGrid: {
    justifyContent: 'space-between',
  },
  allergyCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  shadowEffect: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  allergyImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  allergyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Playfair Display',
  },
  allergySeverity: {
    fontSize: 14,
    marginBottom: 10,
  },
  severityColor: (severity) => ({
    color: severity === 'Severe' ? '#FF0000' : severity === 'Moderate' ? '#FFA500' : '#008000',
  }),
  manageButton: {
    backgroundColor: 'rgba(40, 167, 69, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  manageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
});

export default MyAllergiesPage;