import React from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Import Products Tab Screens
import CategoriesScreen from './DrawerScreens/screens/CategoriesScreen';

// Import Settings Screens
import SettingsScreen from './DrawerScreens/screens/SettingsScreen';
import AboutUs from './DrawerScreens/screens/AboutUs';
import MyAccountScreen from './DrawerScreens/screens/MyAccountScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function ProductsTab () {
	return (
		<Stack.Navigator
			initialRouteName="CategoriesScreen"
			screenOptions={{
				headerStyle: { backgroundColor: '#000' },
				headerTintColor: '#fff',
				headerTitleStyle: { fontWeight: 'bold' }
			}}
		>
			<Stack.Screen
				name="CategoriesScreen"
				component={CategoriesScreen}
				options={{ title: 'Category Screen',
				headerLeft:null,
				headerTitleAlign:'center',
				}}/>
	
		</Stack.Navigator>
	);
}

function SettingsTab () {
	return (
		<Stack.Navigator
			initialRouteName="SettingsScreen"
			screenOptions={{
				headerStyle: { backgroundColor: '#000' },
				headerTintColor: '#fff',
				headerTitleStyle: { fontWeight: 'bold' }
			}}
		>
			<Stack.Screen
				name="SettingsScreen"
				component={SettingsScreen}
				options={{ title: 'Settings' }}/>
			<Stack.Screen
				name="MyAccountScreen"
				component={MyAccountScreen}
				options={{ title: 'My Account' }}/>
			<Stack.Screen
				name="AboutUs"
				component={AboutUs}
				options={{ title: 'About Us' }} />

		</Stack.Navigator>
	);
}

function MaterialBottomNavigation () {
	return (
		
		<Tab.Navigator
			initialRouteName="ProductsTab"
			activeColor="#03a9f4"
			inactiveColor="#babcbe"
			barStyle={{ backgroundColor: '#000' }}
			shifting={true}
		>
			<Tab.Screen
				name="ProductsTab"
				component={ProductsTab}
				options={{
					tabBarLabel: 'Products',
					tabBarIcon: ({ color }) => (
						<MaterialIcons
							name="add-business"
							color={color}
							size={26}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="SettingsTab"
				component={SettingsTab}
				options={{
					tabBarLabel: 'Settings',
					tabBarIcon: ({ color }) => (
						<MaterialIcons
							name="settings"
							color={color}
							size={26}
						/>
					),
				}}
			/>

		</Tab.Navigator>
		
	);
}


export default MaterialBottomNavigation;