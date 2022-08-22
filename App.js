import React from 'react';
import {StyleSheet, Button, View, Image, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {Component} from 'react/cjs/react.production.min';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
  } from '@react-navigation/drawer';
import AdminHomeScreen from './Screens/AdminHomeScreen';
import AdminCreateScreen from './Screens/AdminCreateScreen';
import AdminViewScreen from './Screens/AdminViewScreen';
import AdminEditScreen from './Screens/AdminEditScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Ethel
import SplashScreen from './Screens/SplashScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import DrawerNavigation from './Screens/DrawerNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Auth = () => {
	return (
	<Stack.Navigator initialRouteName="LoginScreen">
		<Stack.Screen
			name="LoginScreen"
			component={LoginScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name="RegisterScreen"
			component={RegisterScreen}
			options={{ headerShown: false }}
		/>
	</Stack.Navigator>
	);
};

class MyDrawerComponent extends Component {
	render () {
	  return (
		<View style={{flex: 1}}>
		  	<DrawerContentScrollView
				{...this.props}
				contentContainerStyle={{backgroundColor: 'skyblue'}}
			>
				<ImageBackground
				source={require ('./assets/adminDrawer.jpg')}
				style={{padding: 10}}
				>
					<Image
					style={{
						alignSelf: 'flex-end',
						width: 64,
						height: 64,
						marginLeft: 20,
						borderRadius: 32,
					}}
					source={require ('./assets/Admin.jpg')}
					/>
					<Text
					style={{
						color: '#fff',
						fontFamily: 'Roboto-Medium',
						fontSize: 20,
						alignSelf: 'flex-end',
						marginLeft: 20,
					}}
					>
					Administrator
					</Text>
				</ImageBackground>

				<View style={{backgroundColor: '#fff', flex: 1, paddingTop: 10}}>
				<DrawerItemList {...this.props} />
				</View>
  			</DrawerContentScrollView>

		<View style={{padding: 15, borderTopWidth: 1, borderTopColor: 'grey'}}>
			<TouchableOpacity 
			style={{paddingVertical: 10}}
			underlayColor="pink"
              onPress={() => {
                this.props.navigation.navigate('Auth');
              }}
			>
			  	<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<Ionicons name="exit-outline" size={20} />
					<Text
						style={{
						marginLeft: 10,
						fontSize: 15,
						fontFamily: 'EduQLDBeginner-Bold',
						}}
					>
				  	Sign Out
					</Text>
			  	</View>
			</TouchableOpacity>
		  </View>
		</View>
	  );
	}
  }

const AdminDrawer = () => {
	return(
		<Drawer.Navigator
          drawerContent={props => <MyDrawerComponent {...props} />}
          screenOptions={{
            drawerActiveTintColor: 'darkslateblue',
            drawerActiveBackgroundColor: 'skyblue',
            drawerLabelStyle: {
              marginLeft: 10,
              fontFamily: 'EduQLDBeginner-Regular',
            },
          }}
        >
			<Drawer.Screen 
			name="Admin Home" 
			component={AdminHomeScreen}
			options={styles.HeaderOptionsStyle}
			/>
        </Drawer.Navigator>
	);
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class App extends Component {

  constructor() {
		super();
		this.state = {
			isAuthenticated: 'false'
		}
	}

	componentDidMount() {
		let isAuth = AsyncStorage.getItem('isAuthenticated');
		this.setState({ isAuthenticated: isAuth });
	}

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
			<Stack.Screen
				name="SplashScreen"
				component={SplashScreen}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="Auth"
				component={Auth}
				options={{headerShown: false}}
			/>
          <Stack.Screen
				name="DrawerNavigation"
				component={DrawerNavigation}
				options={{headerShown: false}}
			/>
          <Stack.Screen
            name="AdminCreateScreen"
            component={AdminCreateScreen}
            options={styles.HeaderOptionsStyle}
          />
		  <Stack.Screen
            name="AdminViewScreen"
            component={AdminViewScreen}
            options={styles.HeaderOptionsStyle}
          />
          <Stack.Screen
            name="AdminEditScreen"
            component={AdminEditScreen}
            options={styles.HeaderOptionsStyle}
          />
		  <Stack.Screen
            name="AdminDrawer"
            component={AdminDrawer}
            options={{headerShown: false}}
          />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  HeaderOptionsStyle: {
    headerStyle: {
      backgroundColor: '#a80000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
  },
});