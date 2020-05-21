import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from '../MainScreens/HomeScreen';
import CreditScreen from '../MainScreens/CreditScreen';
import DetailScreen from '../MainScreens/DetailScreen';
import SettingScreen from '../MainScreens/SettingScreen';

const HomeStack = createStackNavigator(); 
const CreditStack = createStackNavigator(); 
const DetailStack = createStackNavigator(); 
const SettingStack = createStackNavigator(); 


export const HomeStackScreen = ()=>(
  <HomeStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor:'#fff'
    },
    headerTintColor:'#17c0eb',
    // headerTitleStyle:{
    // }

  }}>
  <HomeStack.Screen name="MemeGen"
        component={HomeScreen}/>
  </HomeStack.Navigator>
);

export const CreditStackScreen = ()=>(
  <CreditStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor:'#fff'
    },
    headerTintColor:'#7158e2',

  }}>
  <CreditStack.Screen name="Credits"
        component={CreditScreen}/>
  </CreditStack.Navigator>
);

export const DetailStackScreen = ()=>(
  <DetailStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor:'#fff'
    },
    headerTintColor:'#00b894',
  }}>
  <DetailStack.Screen name="Profile"
        component={DetailScreen}/>
  </DetailStack.Navigator>
);

export const SettingStackScreen = ()=>(
  <SettingStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor:'#fff'
    },
    headerTintColor:'#079992',
  }}>
  <SettingStack.Screen name="Settings"
        component={SettingScreen}/>
  </SettingStack.Navigator>
);
