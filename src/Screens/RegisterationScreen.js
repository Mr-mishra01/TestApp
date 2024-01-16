import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const requestGalleryPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.READ_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Gallery Permission',
        message:
          'Cool Photo App needs access to your Gallery ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Gallery');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const RegisterationScreen = () => {

   const navigation = useNavigation();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [gender, setgender] = useState('');
  const [phone, setphone] = useState('');
  const [dob, setdob] = useState('');
  const [habits, sethabits] = useState('');
  const [aboutMe, setaboutMe] = useState('');
  const [password, setpassword] = useState('');

  const userdata = {
    name: name,
    email: email,
    gender: gender,
    phone: phone,
    dob: dob,
    habits: habits,
    aboutMe: aboutMe,
    password: password,
  };

  const storeUserData = async () => {
    try {
      await AsyncStorage.setItem('userData',JSON.stringify(userdata));
      console.log('saving data======:::')
    } catch (e) {
      console.log('error in saving user data', e);
    }
  };

  const handleRegisterUser = () => {
    if (
      !name ||
      !password ||
      !email ||
      !phone ||
      !dob ||
      !gender ||
      !habits ||
      !aboutMe
    ) {
      Alert.alert('found empty field', 'please fill all the input field', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      storeUserData();
      navigation.navigate('LoginScreen')
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#DCF2F1',
        // flex: 1,
        paddingVertical: 30,
      }}>
      <TouchableOpacity onPress={requestGalleryPermission}>
        <Image
          style={{height: 50, width: 50}}
          source={require('../components/Icons/user.png')}
        />
      </TouchableOpacity>
      <TextInput
        style={[styles.TextInput, {marginTop: 20}]}
        placeholder="Enter name"
        placeholderTextColor={'#000'}
        value={name}
        onChangeText={text => setname(text)}
      />
      <TextInput
        style={[styles.TextInput, {marginTop: 20}]}
        placeholder="Enter Email"
        placeholderTextColor={'#000'}
        value={email}
        onChangeText={text => setemail(text)}
      />
      <TextInput
        style={[styles.TextInput, {marginTop: 20}]}
        placeholder="Enter password."
        placeholderTextColor={'#000'}
        secureTextEntry={true}
        value={password}
        onChangeText={text => setpassword(text)}
      />
      <TextInput
        style={[styles.TextInput, {marginTop: 20}]}
        placeholder="Enter Phone No."
        placeholderTextColor={'#000'}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={text => setphone(text)}
      />
      <TextInput
        style={[styles.TextInput, {marginTop: 20}]}
        placeholder="Enter D.O.B"
        placeholderTextColor={'#000'}
        keyboardType="phone-pad"
        value={dob}
        onChangeText={text => setdob(text)}
      />
      <TextInput
        style={[styles.TextInput, {marginTop: 20}]}
        placeholder="Enter gender"
        placeholderTextColor={'#000'}
        value={gender}
        onChangeText={text => setgender(text)}
      />

      <TextInput
        style={[styles.TextInput, {marginTop: 20}]}
        placeholder="Enter your habits"
        placeholderTextColor={'#000'}
        // multiline={true}
        // numberOfLines={2}
        value={habits}
        onChangeText={text => sethabits(text)}
      />
      <Text
        style={{
          color: '#000',
          marginTop: 20,
          alignSelf: 'flex-start',
          paddingLeft: 10,
          fontSize: 16,
        }}>
        About me
      </Text>
      <TextInput
        style={[styles.TextInput, {marginTop: 10, lineHeight: 30}]}
        placeholder="...."
        placeholderTextColor={'#000'}
        multiline={true}
        numberOfLines={4}
        value={aboutMe}
        onChangeText={text => setaboutMe(text)}
      />
      <TouchableOpacity
        style={{
          height: 60,
          width: '100%',
          backgroundColor: 'purple',
          justifyContent: 'center',
          marginTop: 20,
          borderRadius: 15,
        }}
        onPress={()=>handleRegisterUser()}
        >
        <Text style={{textAlign: 'center', color: '#fff', fontSize: 16}}>
          Register yourself
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: '#2D3250',
          fontSize: 16,
          marginTop: 10,
          alignSelf: 'flex-start',
          paddingLeft: 20,
        }} 
        onPress={()=>navigation.navigate('LoginScreen')} >
        Already Registered ? Login here
      </Text>
    </ScrollView>
  );
};

export default RegisterationScreen;

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
