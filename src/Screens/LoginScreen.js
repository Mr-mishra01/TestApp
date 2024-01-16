import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {height} from '../components/Constants';
import LottieView from 'lottie-react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [focus, setfocus] = useState(false);
  const [user, setuser] = useState('');

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      const res = JSON.parse(value);
      setuser(res)

      if (value) {
        console.log('user data value', res);
      } else {
        console.log('no data found=====:::');
      }
    } catch (e) {
      console.log('error in getting data====::', e);
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('found empty field', 'please fill all the input field', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      if (user.email == email && user.password == password) {
        console.log('loginSuccess');

        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Wrong credentials', 'Email or password is incorrect', [
          // {
          //   text: 'Cancel',
          //   onPress: () => console.log('Cancel Pressed'),
          //   style: 'cancel',
          // },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }
  };

  return (
    <View
      style={{backgroundColor: '#030637', flex: 1, justifyContent: 'center'}}>
      <LottieView
        style={{
          height: focus ? 150 : 200,
          width: focus ? 150 : 200,
          alignSelf: 'center',
        }}
        source={require('../components/anim/Animation - 1705395493761.json')}
        autoPlay={true}
        duration={3000}
      />
      <View
        style={{
          height: height / 2.4,
          width: '100%',
          backgroundColor: '#fff',
          marginHorizontal: 20,
          alignSelf: 'center',
          borderRadius: 20,
          marginTop: 20,
          paddingHorizontal: 15,
        }}>
        <Text
          style={{
            color: 'purple',
            fontSize: 22,
            paddingLeft: 20,
            marginTop: 20,
          }}>
          Login
        </Text>
        <TextInput
          style={[styles.TextInput, {marginTop: 20}]}
          placeholder="Enter Email"
          placeholderTextColor={'#000'}
          value={email}
          onFocus={() => setfocus(true)}
          onBlur={() => setfocus(false)}
          onChangeText={text => setemail(text)}
        />
        <TextInput
          style={[styles.TextInput, {marginTop: 20}]}
          placeholder="Enter password."
          placeholderTextColor={'#000'}
          secureTextEntry={true}
          onFocus={() => setfocus(true)}
          onBlur={() => setfocus(false)}
          value={password}
          onChangeText={text => setpassword(text)}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'purple',
            height: 50,
            width: '100%',
            borderRadius: 15,
            marginTop: 20,
            justifyContent: 'center',
          }}
          onPress={() => handleLogin()}>
          <Text style={{color: '#FFF', fontSize: 18, textAlign: 'center'}}>
            Login
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => {
            navigation.navigate('RegisterationScreen');
          }}
          style={{color: '#2D3250', paddingLeft: 20, marginTop: 20}}>
          New user ? Register Here
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  TextInput: {
    fontSize: 18,
    color: '#000',
    borderColor: '#000',
    borderWidth: 0.7,
    width: '100%',
    paddingHorizontal: 20,
    borderRadius: 16,
  },
});
