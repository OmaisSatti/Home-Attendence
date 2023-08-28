import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home')
    }, 2000);
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#000080'} barStyle={'light-content'} />
      <Text style={styles.title}>Welcome Back</Text>
      <Image style={{width:270,height:290,resizeMode:'stretch'}} source={require('../images/at4.png')} />
    </View>
  )
}
export default SplashScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#000080',
    alignItems:'center',
    justifyContent: 'center'
  },
  title:{
    fontSize:30,
    color:'#FFFFFF',
    fontWeight:'200',
    fontFamily:'Poppins-Light',
    margin:20
  }
})