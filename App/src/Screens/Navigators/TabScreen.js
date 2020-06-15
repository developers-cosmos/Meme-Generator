import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {useTheme} from '@react-navigation/native';


import HomeScreen from '../MainScreens/HomeScreen';
import CreditScreen from '../MainScreens/CreditScreen';
import DetailScreen from '../MainScreens/DetailScreen';
import SettingScreen from '../MainScreens/SettingScreen';

const HomeStack = createStackNavigator(); 
const CreditStack = createStackNavigator(); 
const DetailStack = createStackNavigator(); 
const SettingStack = createStackNavigator(); 



export const HomeStackScreen = ()=>{const theme = useTheme();
return(  
  <HomeStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor:theme.dark?'#222':'#edf5fc',
      borderBottomLeftRadius:15,
      borderBottomRightRadius:30,
    },
    headerTintColor:'#17c0eb',
    // headerTitleStyle:{
    //   fontWeight:'bold',
    // }
  }}>
  <HomeStack.Screen name="MemeGen" component={HomeScreen} options={{title:"MemeGen"}}/>
  </HomeStack.Navigator>
)};

export const CreditStackScreen = ()=>{const theme = useTheme();
  return(
  <CreditStack.Navigator headerLayoutPreset='center' screenOptions={{
    headerStyle:{
      backgroundColor:theme.dark?'#222':'#E8F5E9',
      // shadowOpacity: 0,
      // elevation: 0,
      borderBottomRightRadius:30,
      borderBottomLeftRadius:15,
    },
    headerTintColor:'#00b894',

  }}>
  <CreditStack.Screen name="Credits"
        component={CreditScreen}/>
  </CreditStack.Navigator>
)};

export const DetailStackScreen = ()=>(
  <DetailStack.Navigator headerMode='none'>
  <DetailStack.Screen name="Profile"
        component={DetailScreen}/>
  </DetailStack.Navigator>
);

export const SettingStackScreen = ()=>{const theme = useTheme();
  return(
  <SettingStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor:theme.dark?'#222':'#E0F2F1',
      borderBottomRightRadius:30,
      borderBottomLeftRadius:15
    },
    headerTintColor:'#079992',
  }}>
  <SettingStack.Screen name="Settings"
        component={SettingScreen}/>
  </SettingStack.Navigator>
)};
