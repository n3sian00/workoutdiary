import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import WorkoutModal from '../components/WorkoutModal';
import styles from '../styles/styles';

export default function History() {
    const [exercises, setExercises] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [totalDistance, setTotalDistance] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    useFocusEffect(
        useCallback(() => {
            loadExercises();
        }, [])
    );

    const loadExercises = async () => {
        try {
            const storedExercises = await AsyncStorage.getItem('exercises');
            if (storedExercises) {
                const parsedExercises = JSON.parse(storedExercises);
                setExercises(parsedExercises);

                const totalDist = parsedExercises.reduce((sum, item) => sum + parseFloat(item.distance), 0);
                const totalDur = parsedExercises.reduce((sum, item) => sum + parseFloat(item.duration), 0);

                setTotalDistance(totalDist);
                setTotalDuration(totalDur);
            } else {
                setExercises([]);
                setTotalDistance(0);
                setTotalDuration(0);
            }
        } catch (error) {
            console.error('Error loading exercises', error);
        }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.historyHeaderBox}>
                <Text style={styles.mainTitle}>Workout History</Text>
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.historyButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.historyButtonText}>Tap to see all exercises</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.historyButton}>
                    <Text style={styles.historyButtonText}>
                        Total: {totalDistance.toFixed(1)} km, {totalDuration} min
                    </Text>
                </TouchableOpacity>
            </View>
            <WorkoutModal visible={modalVisible} onClose={() => setModalVisible(false)} exercises={exercises} />
        </View>
    );
}