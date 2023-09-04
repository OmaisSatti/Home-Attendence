import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput, Checkbox } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';
import Snackbar from 'react-native-snackbar';
import SQLite from 'react-native-sqlite-storage';
const Home = ({ navigation }) => {
  const [name, setname] = useState('')
  const [role, setRole] = useState('')
  const [salary, setSalary] = useState('')
  const [c1, setc1] = React.useState(false);
  const [c2, setc2] = React.useState(false);
  const [c3, setc3] = React.useState(false);
  const [c4, setc4] = React.useState(false);
  const [c5, setc5] = React.useState(false);
  const [c6, setc6] = React.useState(false);
  const [c7, setc7] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [saving, setsaving] = useState(false)

  const [items, setItems] = useState([
    { label: 'Full-time', value: 'Full-time' },
    { label: 'Half-time', value: 'Half-time' },
    { label: 'Quarter-time', value: 'Quarter-time' }
  ]);
  const db = SQLite.openDatabase({ name: 'attendentDB.db', location: 'default' });
  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS attendent (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, role TEXT,salary TEXT,worktime TEXT,day1 INTEGER,day2 INTEGER,day3 INTEGER,day4 INTEGER,day5 INTEGER,day6 INTEGER,day7 INTEGER,totalDays INTEGER)',
        [],
        () => {
          console.log('Table created successfully!');
        },
        (_, error) => {
          console.error('Error creating table:', error);
        }
      );
    });
  }
  const createAttendent = () => {
    if (name.length == 0 || salary.length == 0 || role.length == 0) {
      Snackbar.show({
        text: 'Required field is missing',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#f54e54'
      });
    } else {
      setsaving(true)
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO attendent (name, role,salary,worktime,day1,day2,day3,day4,day5,day6,day7,totalDays) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
          [name, role, salary, value, c1, c2, c3, c4, c5, c6,0],
          (_, result) => {
            Snackbar.show({
              text: 'Attendent added successfully',
              duration: Snackbar.LENGTH_SHORT,
            });
            navigation.navigate('Attendents')
            setsaving(false)
            setname('')
            setRole('')
            setSalary('')
            setc1(false)
            setc2(false)
            setc3(false)
            setc4(false)
            setc5(false)
            setc6(false)
            setc7(false)
          },
          (_, error) => {
            console.log(JSON.stringify(_))
            ToastAndroid.show('Error adding attendent:', ToastAndroid.SHORT);
          }
        );
      });
    }
  };
  useEffect(() => { createTable() }, [])
  // const countDayInMonth = (year, month, dayNumber) => {
  //   const firstDayOfMonth = new Date(year, month - 1, 1);
  //   let count = 0;
  //   for (let day = 1; day <= 31; day++) {
  //     const currentDate = new Date(year, month - 1, day);
  //     if (currentDate.getMonth() !== month - 1) {
  //       break;
  //     }
  //     if (currentDate.getDay() === dayNumber) {
  //       count++;
  //     }
  //   }
  //   return count;
  // }
  // const passDay = () => {
  //   let totalcount = 0;
  //   let month = new Date().getMonth() + 1
  //   let year = new Date().getFullYear()
  //   if (c1) {
  //     let mon = countDayInMonth(year, month, 1)
  //     totalcount += mon;
  //   }
  //   if (c2) {
  //     let tu = countDayInMonth(year, month, 2)
  //     totalcount += tu
  //   }
  //   if (c3) {
  //     let wed = countDayInMonth(year, month, 3)
  //     totalcount += wed
  //   }
  //   if (c4) {
  //     let th = countDayInMonth(year, month, 4)
  //     totalcount += th
  //   }
  //   if (c5) {
  //     let fr = countDayInMonth(year, month, 5)
  //     totalcount += fr
  //   }
  //   if (c6) {
  //     let st = countDayInMonth(year, month, 6)
  //     totalcount += st
  //   }
  //   if (c7) {
  //     let sun = countDayInMonth(year, month, 0)
  //     totalcount += sun
  //   }
  //   return totalcount;
  // }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ADD new attendent here!</Text>
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

      {/* Day View start */}
      <View style={styles.dayView}>
        <Text style={styles.day}>Monday</Text>
        <Checkbox status={c1 ? 'checked' : 'unchecked'} color='#000080' onPress={() => setc1(!c1)} />
      </View>
      <View style={styles.dayView}>
        <Text style={styles.day}>Tuesday</Text>
        <Checkbox status={c2 ? 'checked' : 'unchecked'} color='#000080' onPress={() => setc2(!c2)} />
      </View>
      <View style={styles.dayView}>
        <Text style={styles.day}>Wednesday</Text>
        <Checkbox status={c3 ? 'checked' : 'unchecked'} color='#000080' onPress={() => setc3(!c3)} />
      </View>
      <View style={styles.dayView}>
        <Text style={styles.day}>Thursday</Text>
        <Checkbox status={c4 ? 'checked' : 'unchecked'} color='#000080' onPress={() => setc4(!c4)} />
      </View>
      <View style={styles.dayView}>
        <Text style={styles.day}>Friday</Text>
        <Checkbox status={c5 ? 'checked' : 'unchecked'} color='#000080' onPress={() => setc5(!c5)} />
      </View>
      <View style={styles.dayView}>
        <Text style={styles.day}>Saturday</Text>
        <Checkbox status={c6 ? 'checked' : 'unchecked'} color='#000080' onPress={() => setc6(!c6)} />
      </View>
      <View style={styles.dayView}>
        <Text style={styles.day}>Sunday</Text>
        <Checkbox status={c7 ? 'checked' : 'unchecked'} color='#000080' onPress={() => setc7(!c7)} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={styles.btn} onPress={() => createAttendent()}>
          <Text style={styles.btnTxt}>{saving ? 'creating...' : 'Save'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Attendents')}>
          <Text style={styles.btnTxt}>Attendent View</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
export default Home
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
    width: '40%',
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