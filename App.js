import React from 'react';
import Tracker from './src/components/Tracker.js';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Details from './src/components/Details.js';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/components/Home.js';
import {enableScreens} from 'react-native-screens';

enableScreens();

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer initialRouteName="Tracker">
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Tracker}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
            name="Details"
            component={Details}
            options={{headerShown: false}}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
      // <View style={{flex: 1}}>
      //  <Tracker />
      //   <Details />
      // </View>
    );
  }
}

export default App;
