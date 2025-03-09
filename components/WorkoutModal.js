import React from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

// Modaali ikkuna, joka näyttää tallennetut harjoitukset ns pop up- ikkunana

export default function WorkoutModal({ visible, onClose, exercises }) { // visible määrittää näkyykö modaali
  return (  // animationType slide luo animaation, jossa modaali tulee esiin
    <Modal visible={visible} animationType='slide' transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>All exercises</Text>

          {exercises.length === 0 ? (
            <Text style={styles.text}>No workouts added yet</Text>
          ) : (
            <FlatList data={exercises} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => ( // flatlist listaa kaikki tallennetut harjoitukset
              <View style={styles.listItem}>
                <Text style={styles.historyText}>{item.date}</Text>
                <Text style={styles.historyText}>{item.sport}</Text>
                <Text style={styles.historyText}>{item.distance} km</Text>
                <Text style={styles.historyText}>{item.duration} min</Text>
              </View>
            )}
            />
          )}
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}> 
            <Text style={styles.modalCloseButtonText}>Close</Text> 
          </TouchableOpacity>
        </View> 
      </View>
    </Modal>
  );
}