import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from '../components/Datetimepicker';
import styles from '../styles/styles';

// Sovelluksen etusivu, jossa voi lisätä uusia harjoituksia ja tallentaa ne AsyncStorageen


export default function Home({ navigation }) { // useState tallentaa syöttämät tiedot
    const [sport, setSport] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    
    useEffect(() => {  // useEffect lataa tallennetut harjoitukset
        loadExercises();
    }, []);

    const saveExercise = async (newExercise) => {   // Harjoitukset tallennetaan
        try {
            const storedExercises = await AsyncStorage.getItem('exercises');
            const exercises = storedExercises ? JSON.parse(storedExercises) : [];
            const updatedExercises = [...exercises, newExercise];
            await AsyncStorage.setItem('exercises', JSON.stringify(updatedExercises));
        } catch (error) {
            console.error('Error saving exercise', error);
        }
    };

    const loadExercises = async () => { // LoadExercises tarkistaa onko AsynStoragessa tallennettuja harjoituksia
        try {
            const storedExercises = await AsyncStorage.getItem('exercises');
            if (storedExercises) {
                console.log('Loaded exercises', JSON.parse(storedExercises));
            }
        } catch (error) {
            console.error('Error loading exercises', error);
        }
    };

    const addExercise = async () => { // Lisää uuden harjoitukset
        if (sport.trim() && distance.trim() && duration.trim() && date) {
            Keyboard.dismiss();
            
            const newExercise = {
                sport,
                distance,
                duration,
                date: date.toDateString(),
            };

            await saveExercise(newExercise);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000); 

            setSport('');
            setDistance('');
            setDuration('');
            setDate(null);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerBox}>
                <Text style={styles.mainTitle}>Welcome to Workout Diary</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.subTitle}>Add new exercise</Text>
                
                <TextInput 
                    style={styles.input} 
                    placeholder='Enter sport type' 
                    value={sport} 
                    onChangeText={setSport} 
                    onBlur={Keyboard.dismiss}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder='Distance (km)' 
                    value={distance} 
                    onChangeText={setDistance} 
                    keyboardType='numeric'
                    onBlur={Keyboard.dismiss}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder='Duration (min)' 
                    value={duration} 
                    onChangeText={setDuration} 
                    keyboardType='numeric'
                    onBlur={Keyboard.dismiss}
                />

                <DatePicker selectedDate={date} onDateChange={(newDate) => setDate(newDate)} />
                {date && <Text style={styles.selectedDate}>{date.toDateString()}</Text>}

                <TouchableOpacity style={styles.addButton} onPress={addExercise}>
                    <Text style={styles.addButtonText}>ADD EXERCISE</Text>
                </TouchableOpacity>

                {showAlert && <View style={styles.successMessage}>
                    <Text style={styles.successText}>Workout saved!</Text>
                </View>}
            </View>
        </View>
    );
}