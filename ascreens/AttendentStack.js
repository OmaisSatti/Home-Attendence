import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import Home from './Home';
import Report from './Report';
import Attendents from './Attendents';
import Mark from './Mark';
import UpdateAttendent from './UpdateAttendent';
const Stack = createStackNavigator();
function AttendentStack() {
    return (
        <Stack.Navigator 
        screenOptions={{
            headerStyle:{backgroundColor:'#000080'},
            headerTintColor:'#FFFFFF',
            headerTitleAlign:'center',
            headerTitleStyle:{fontSize:16,fontFamily:'Roboto-Regular'}
        }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={Home}options={{headerTitle:'New Attendent'}} />
            <Stack.Screen name="Report" component={Report} />
            <Stack.Screen name="Attendents" component={Attendents} />
            <Stack.Screen name="Mark" component={Mark} options={{headerTitle:'Mark Attendence'}}/>
            <Stack.Screen name="UpdateAttendent" component={UpdateAttendent} options={{headerTitle:'Update Attendent'}}/>
        </Stack.Navigator>
    );
}
export default AttendentStack;