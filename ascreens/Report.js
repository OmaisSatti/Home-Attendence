import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
const Report = ({route}) => {
    const {user}=route.params
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.rowView}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{user.name}</Text>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.label}>Role</Text>
                    <Text style={styles.value}>{user.role}</Text>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.label}>Salary</Text>
                    <Text style={styles.value}>{user.salary}</Text>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.label}>Timing</Text>
                    <Text style={styles.value}>{user.worktime}</Text>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.label}>Present</Text>
                    <Text style={[styles.value,{color:'green',fontWeight:'bold'}]}>20</Text>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.label}>Absent</Text>
                    <Text style={[styles.value,{color:'red',fontWeight:'bold'}]}>10</Text>
                </View>
            </View>
        </View>
    )
}
export default Report
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor: '#FFFFFF',
    },
    card: {
        width: '90%',
        margin: 10,
        marginTop:30,
        padding: 20,
        borderColor:'#000080',
        borderWidth:1,
        borderStyle:'dashed',
        shadowColor: "#000080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    rowView: {
        flexDirection: 'row',
        margin:10,
        justifyContent: 'space-between'
    },
    label: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '800',
        fontFamily: 'Roboto-Medium',
        margin: 5
    },
    value: {
        fontSize: 14,
        color: '#000000',
        fontWeight: '600',
        fontFamily: 'Roboto-Regular',
        margin: 5
    },
})