import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {ScrollView, Image, View, Text, SafeAreaView} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import {NavigationContainer} from '@react-navigation/native';

import BottomTabNavigation from './BottomTabNavigation';
import AboutUs from './DrawerScreens/screens/AboutUs';
import MyAccountScreen from './DrawerScreens/screens/MyAccountScreen';

const Drawer = createDrawerNavigator ();

export default class App extends Component {
    
  render () {
    return (
 
        <Drawer.Navigator
          drawerStyle={{width: '65%', backgroundColor: 'white'}}
          drawerType="slide"
          overlayColor="transparent"
          screenOptions={{
            drawerActiveTintColor: 'darkslateblue',
            drawerActiveBackgroundColor: 'skyblue',
          }}
        >
          <Drawer.Screen name="Home" component={BottomTabNavigation} />
          <Drawer.Screen name="My Account" component={MyAccountScreen} />
          <Drawer.Screen name="About Us" component={AboutUs} />

        </Drawer.Navigator>

    );
  }
}