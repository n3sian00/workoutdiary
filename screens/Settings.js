import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/styles';

// Settings sivulla voi poistaa kaikki tallennetut harjoitukset

export default function Settings({ navigation }) {
    const [cleared, setCleared] = useState(false);
    const [updateHistory, setUpdateHistory] = useState(false); 

    const clearExercises = async () => { // Tyhjentää tallennetut harjoitutukset
        Alert.alert(
            'Clear all exercises?',
            'This will permanently delete all saved exercises',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: async () => {
                        await AsyncStorage.removeItem('exercises'); // Poistaa tallennetut harjoitukset AsyncStoragesta
                        setCleared(true);
                        setUpdateHistory(prev => !prev);
                        setTimeout(() => setCleared(false), 2000);
                    }
                }
            ]
        );
    };

    useFocusEffect( // Nollaa näkymän
        useCallback(() => {
            setCleared(false);
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.settingsHeaderBox}>
                <Text style={styles.mainTitle}>Settings</Text>
            </View>
            <TouchableOpacity style={styles.clearButton} onPress={clearExercises}>
                <Text style={styles.clearButtonText}>Clear all exercises</Text>
            </TouchableOpacity>

            {cleared && <View style={styles.successMessage}>
                <Text style={styles.successText}>All exercises deleted!</Text>
            </View>}
        </View>
    );
}