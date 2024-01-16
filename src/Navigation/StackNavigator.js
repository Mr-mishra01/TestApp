import {createStackNavigator} from '@react-navigation/stack';
import RegisterationScreen from '../Screens/RegisterationScreen';
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';

const StackNavigator = () => {
  const stack = createStackNavigator();

  return (
    <stack.Navigator initialRouteName="Loginscreen">
      <stack.Screen
        options={{headerShown: false}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <stack.Screen
        options={{headerShown: false}}
        name="RegisterationScreen"
        component={RegisterationScreen}
      />
      <stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={HomeScreen}
      />
    </stack.Navigator>
  );
};

export default StackNavigator;
