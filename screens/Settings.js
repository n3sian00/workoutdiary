import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/styles';

export default function Settings({ navigation }) {
    const [cleared, setCleared] = useState(false);
    const [updateHistory, setUpdateHistory] = useState(false); 

    const clearExercises = async () => {
        Alert.alert(
            'Clear all exercises?',
            'This will permanently delete all saved exercises',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: async () => {
                        await AsyncStorage.removeItem('exercises'); 
                        setCleared(true);
                        setUpdateHistory(prev => !prev);
                        setTimeout(() => setCleared(false), 2000);
                    }
                }
            ]
        );
    };

    useFocusEffect(
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