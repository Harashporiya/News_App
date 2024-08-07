import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './components/Signup';
import Login from './components/Login';
import VerifyEmail from './components/VerifyEmail';
import ForgotPassword from './components/ForgotPassword';
import ShowNews from './components/ShowNews';
import SearchContury from './components/SearchContury';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
{/* 
        <Stack.Screen
          name='Signup'
          component={Signup} />

        <Stack.Screen
          name='Login'
          component={Login} />
          
          <Stack.Screen
          name='VerifyEmail'
          component={VerifyEmail}/>

          <Stack.Screen
          name='ForgotPassword'
          component={ForgotPassword}/> */}

          <Stack.Screen
          name='ShowNews'
          component={ShowNews}/>

          {/* <Stack.Screen
          name='SearchCountry'
          component={SearchContury}/> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
