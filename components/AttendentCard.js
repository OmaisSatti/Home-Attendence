import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ant from 'react-native-vector-icons/AntDesign'
import Awesome from 'react-native-vector-icons/FontAwesome'
const AttendentCard = ({ title, dueDate, onDelete, onPress,onEidit}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'flex-start'}}>
                <View style={{ width: '75%' }}>
                    <Text style={styles.cardTxt}>{title}</Text>
                    <Text style={styles.cardDate}>{dueDate}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.btn} onPress={onEidit}>
                        <Awesome size={22} color={'#ffffff'} name='pencil' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={onDelete}>
                        <Ant size={22} color={'#ffffff'} name='delete' />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}
export default AttendentCard
const styles = StyleSheet.create({
    card: {
        width: '90%',
        justifyContent: 'center',
        backgroundColor: '#000080',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    cardTxt: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'left',
        color: '#ffffff',
        fontFamily: 'Poppins-Regular',
    },
    cardDate: {
        fontSize: 14,
        color: '#156ced',
        fontFamily: 'Poppins-Medium',
    },
    btn: {
        margin: 5,
        marginHorizontal: 10
    }
})