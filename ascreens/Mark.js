import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Snackbar from 'react-native-snackbar';
import SQLite from 'react-native-sqlite-storage';
const Mark = ({ route, navigation }) => {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(true);
    const { user } = route.params;
    const db = SQLite.openDatabase({ name: 'attendentDB.db', location: 'default' });
    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS attendenceRecord (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER,status TEXT,aDate TEXT)',
                [],
                () => {
                    console.log('attendenceRecord table created successfully!');
                },
                (_, error) => {
                    console.error('Error creating table:', error);
                }
            );
        });
    }
    const loadData = async () => {
        lst = []
        let sql = "SELECT * FROM attendenceRecord WHERE userId = ?";
        db.transaction((tx) => {
            tx.executeSql(sql, [user.id], (tx, resultSet) => {
                var length = resultSet.rows.length;
                for (var i = 0; i < length; i++) {
                    lst.push(resultSet.rows.item(i))
                }
                getMarked = getDates(lst)
                setdata(getMarked)
                setloading(false)
            }, (error) => {
                console.log("List attendent error", error);
            })
        })
    }
    const getDates = (dateArray) => {
        const present = { selected: true, marked: true, selectedColor: 'green', disabled: true };
        const absent = { selected: true, marked: true, selectedColor: 'red', disabled: true };
        const dateObject = dateArray.reduce((obj, date) => {
            if (date.status === 'A') {
                obj[date.aDate] = { ...absent };
                return obj;
            } else {
                obj[date.aDate] = { ...present };
                return obj;
            }
        }, {});
        return dateObject;
    }
    useEffect(() => {
        createTable();
        loadData();
    }, [])
    const addPresent = (d) => {
        const present = { [d]: { selected: true, marked: true, selectedColor: 'green', disabled: true } };
        console.log(present)
        const absent = { selected: true, marked: true, selectedColor: 'red', disabled: true };
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO attendenceRecord (userId,status,aDate) VALUES (?,?,?)',
                [user.id, 'P', d],
                (_, result) => {
                    loadData()
                    Snackbar.show({
                        text: 'present marked successfully',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                },
                (_, error) => {
                    ToastAndroid.show('Error marking present:', ToastAndroid.SHORT);
                }
            );
        });
    }
    const addAbsent = (d) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO attendenceRecord (userId,status,aDate) VALUES (?,?,?)',
                [user.id, 'A', d],
                (_, result) => {
                    loadData()
                    Snackbar.show({
                        text: 'absent marked successfully',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                },
                (_, error) => {
                    ToastAndroid.show('Error marking absent:', ToastAndroid.SHORT);
                }
            );
        });
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Report', { user })}>
                <Text style={styles.btnTxt}>Report</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.txt}>Press(present)</Text>
                <View style={{ height: 15, width: 15, borderRadius: 10, backgroundColor: 'green' }}></View>
                <Text style={styles.txt}>Long Press(absent)</Text>
                <View style={{ height: 15, width: 15, borderRadius: 10, backgroundColor: 'red' }}></View>
            </View>
            <Calendar
                onDayPress={day => addPresent(day.dateString)}
                onDayLongPress={day => addAbsent(day.dateString)}
                disableAllTouchEventsForDisabledDays={true}
                style={styles.cal}
                markedDates={data}
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
    txt: {
        fontSize: 16,
        color: '#000080',
        fontWeight: '600',
        margin: 10,
        fontFamily: 'Roboto-Medium',
    },
})