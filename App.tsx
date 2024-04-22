
import Weather from './Weather'
import Welcome from './Welcome'

import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import MyMap from './MyMap';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Last from './Last';




//const Tab = createBottomTabNavigator();
export default function App() {
	const Tab = createBottomTabNavigator()
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
      <Stack.Navigator
	        // screenOptions={({ route }) => ({
			// 	tabBarIcon: ({ focused, color, size }) => {
			// 	  let iconName: keyof typeof Entypo.glyphMap
	  
			// 	  if (route.name === 'Welcome') {
			// 		iconName = focused
			// 		  ? 'home'
			// 		  : 'switch';
			// 	  } else if (route.name === 'Weather') {
			// 		iconName = focused ? 'adjust' : 'switch';
			// 	  }else if (route.name === 'MyMap') {
			// 		iconName = focused ? 'map' : 'switch';
			// 	  }
	  
			// 	  // You can return any component that you like here!
			// 	  return ( <Entypo
			// 	  name={iconName} 
			// 	  size={size}
			// 	   color={color} />
			// 	);

			// 	},
			// 	tabBarActiveTintColor: 'blue',
			// 	tabBarInactiveTintColor: 'gray',
			//   })
			  
			//   }>
			>
	    <Stack.Screen 
		name="Welcome" 
		component={Welcome} 
		options={{headerShown: false}}
		/>
        <Stack.Screen 
		name="Weather" 
		component={Weather} 
		/>
		 <Stack.Screen 
		name="MyMap" 
		component={MyMap} 
		/>
		<Stack.Screen 
		name="Last" 
		component={Last} 
		/>
      </Stack.Navigator>
    </NavigationContainer>
	);
}

