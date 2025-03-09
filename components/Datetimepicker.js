import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles/styles';

export default function DatePicker({ selectedDate, onDateChange }) {
    const [show, setShow] = useState(false);

    return (
        <View style={styles.dateContainer}>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShow(true)}>
                <Text style={styles.dateButtonText}>Pick a date</Text>
            </TouchableOpacity>

            {show && (
                <DateTimePicker value={selectedDate || new Date()} mode="date" display="default" onChange={(event, date) => { setShow(false); onDateChange(date || null ); }} />
            )}
        </View>
    );
}