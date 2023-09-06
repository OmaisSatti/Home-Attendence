import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';
import Snackbar from 'react-native-snackbar';
import SQLite from 'react-native-sqlite-storage';
const UpdateAttendent = ({ route, navigation }) => {
    const [name, setname] = useState('')
    const [role, setRole] = useState('')
    const [salary, setSalary] = useState('')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [data, setdata] = useState([])
    const [items, setItems] = useState([
        { label: 'Full-time', value: 'Full-time' },
        { label: 'Half-time', value: 'Half-time' },
        { label: 'Quarter-time', value: 'Quarter-time' }
    ]);
    const { user } = route.params;
    const db = SQLite.openDatabase({ name: 'attendentDB.db', location: 'default' });

    const updateAttendent = () => {
        if (name.length == 0 || role.length == 0 || salary.length == 0) {
            Snackbar.show({
                text: 'required filed is missing',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else {
            db.transaction((tx) => {
                tx.executeSql(
                    'UPDATE attendent SET name = ?, role = ?, salary = ?, worktime = ? WHERE id = ?',
                    [name, role, salary, value, user.id],
                    (_, result) => {
                        Snackbar.show({
                            text: 'Attendent updated',
                            duration: Snackbar.LENGTH_SHORT,
                        });
                        navigation.goBack()
                    },
                    (_, error) => {
                        console.error('Error updating attendent:', error);
                    }
                );
            });
        }
    };
    useEffect(() => {
        setname(user.name)
        setRole(user.role)
        setSalary(user.salary)
        setValue(user.worktime)
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Update attendent data here!</Text>
            <StatusBar backgroundColor={'#000080'} barStyle={'light-content'} />
            <View style={{ margin: 10, marginHorizontal: 15, width: '90%' }}>
                <TextInput style={styles.input} mode='outlined' label={'Name'} placeholder='Enter your name' value={name} onChangeText={(txt) => setname(txt)} placeholderTextColor={'#777777'} />
            </View>
            <View style={{ margin: 10, marginHorizontal: 15, width: '90%' }}>
                <TextInput style={styles.input} label={'Role'} placeholder='Enter your role' mode='outlined' value={role} onChangeText={(txt) => setRole(txt)} placeholderTextColor={'#777777'} />
            </View>
            <View style={{ margin: 10, marginHorizontal: 15, width: '90%' }}>
                <TextInput style={styles.input} label={'Salary'} placeholder='Enter your salary' mode='outlined' value={salary} onChangeText={(txt) => setSalary(txt)} placeholderTextColor={'#777777'} keyboardType='number-pad' />
            </View>
            <DropDownPicker
                open={open}
                value={value}
                placeholder='Select Timing'
                items={items}
                style={{ width: '88%', marginHorizontal: 15, margin: 10, height: 60 }}
                dropDownContainerStyle={{ width: '88%', marginHorizontal: 15 }}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.btn} onPress={() => updateAttendent()}>
                    <Text style={styles.btnTxt}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Attendents')}>
                    <Text style={styles.btnTxt}>Attendent View</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
export default UpdateAttendent
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    day: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        fontFamily: 'Roboto-Regular',
    },
    input: {
        height: 60,
        width: '95%',
        color: '#000000',
        backgroundColor: '#ffffff',
        fontFamily: 'Roboto-Regular',
        fontSize: 16
    },
    inputTxt: {
        fontSize: 14,
        color: '#000000',
        fontWeight: '600',
        fontFamily: 'Roboto-Regular',
        margin: 5
    },
    btn: {
        width: '41%',
        backgroundColor: '#000080',
        padding: 15,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center'
    },
    btnTxt: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center'
    },
    dayView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        padding: 10,
        marginTop: 10
    },
    title: {
        fontSize: 18,
        color: '#000080',
        fontWeight: '600',
        alignSelf: 'flex-start',
        marginHorizontal: 25,
        marginTop: 20,
        fontFamily: 'Poppins-SemiBold',
    },
})