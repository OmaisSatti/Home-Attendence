import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars';
const Mark = ({ route, navigation }) => {
    const [selected, setSelected] = useState('');
    const { user } = route.params;
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Report', { user })}>
                <Text style={styles.btnTxt}>Report</Text>
            </TouchableOpacity>
            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                style={styles.cal}
                markedDates={{
                    '2023-08-05': { selected: true, marked: true, selectedColor: 'green' },
                    '2023-08-09': { selected: true, marked: true, selectedColor: 'green' },
                    '2023-08-15': { selected: true, marked: true, selectedColor: 'red' },
                    '2023-08-26': { selected: true, marked: true, selectedColor: 'red' },
                }}
            />
        </View>
    )
}
export default Mark
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    cal: {
        borderColor: '#000080',
        margin: 10,
        borderStyle: 'dashed',
        borderWidth: 1,
    },
    btn: {
        width: '40%',
        backgroundColor: '#000080',
        padding: 20,
        alignSelf: 'flex-end',
        borderRadius: 5,
        margin: 10,
        marginRight: 20,
        justifyContent: 'center'
    },
    btnTxt: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
        fontFamily: 'Roboto-Regular',
        alignSelf: 'center'
    },
})