import { StyleSheet, FlatList, Alert, Image, View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import SQLite from 'react-native-sqlite-storage';
import Snackbar from 'react-native-snackbar';
import AttendentCard from '../components/AttendentCard';
const Attendents = ({ navigation }) => {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(true);
    const db = SQLite.openDatabase({ name: 'attendentDB.db', location: 'default' });
    const loadData = async () => {
        lst = []
        let sql = "SELECT * FROM attendent";
        db.transaction((tx) => {
            tx.executeSql(sql, [], (tx, resultSet) => {
                var length = resultSet.rows.length;
                for (var i = 0; i < length; i++) {
                    lst.push(resultSet.rows.item(i))
                }
                setdata(lst)
                setloading(false)
            }, (error) => {
                console.log("List attendent error", error);
            })
        })
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setloading(true)
            loadData();
        });
        return unsubscribe;
    }, [navigation]);

    const deleteAttendent = (taskId) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM attendent WHERE id = ?',
                [taskId],
                (_, result) => {
                    const newData = data.filter(d => d.id !== taskId)
                    setdata(newData)
                    Snackbar.show({
                        text: 'Attendent deleted',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                },
                (_, error) => {
                    console.error('Error deleting attendent:', error);
                }
            );
        });
    };
    const deleteConfirm = (id) =>
        Alert.alert('Are you sure?', 'Delete attendent?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => deleteAttendent(id) },
        ]);
    const updateAttendent = (item) => {
        navigation.navigate('UpdateAttendent', { user: item })
    }
    return (
        <>
            {data.length > 0 ?
                <FlatList
                    data={data}
                    contentContainerStyle={styles.container}
                    renderItem={({ item }) => {
                        return <AttendentCard title={item.name} dueDate={item.role}
                            onPress={() => navigation.navigate('Mark', { user: item })}
                            onDelete={() => deleteConfirm(item.id)}
                            onEidit={() => updateAttendent(item)} />
                    }}
                />
                :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={styles.img} source={require('../images/at2.png')} />
                    <Text style={styles.txt}>No attendent added yet</Text>
                </View>
            }
        </>
    )
}
export default Attendents
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    img: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    txt: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#000080'
    }
})