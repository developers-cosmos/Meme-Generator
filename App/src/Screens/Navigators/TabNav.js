import React,{memo} from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useTheme} from '@react-navigation/native';

import {HomeStackScreen,CreditStackScreen,DetailStackScreen,
SettingStackScreen
} from './TabScreen';

const Tab = createMaterialBottomTabNavigator();


function TabNav() {
  const theme = useTheme();
  return (
     <Tab.Navigator
      initialRouteName="MemeGen"
      activeColor={theme.dark?'#222':"#fff"}
      inactiveColor={theme.dark?'#444':'#dcd5e6'}
    >
      <Tab.Screen
        name="MemeGen"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor:'#17c0eb',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Credit"
        component={CreditStackScreen}
        options={{
          tabBarLabel: 'Credits',
          tabBarColor:'#00b894',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="gift" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor:'#6c5ce7',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingStackScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarColor:'#079992',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default memo(TabNav);