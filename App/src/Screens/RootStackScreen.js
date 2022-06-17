import React,{memo} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './StarterScreens/SplashScreen';
import SwiperScreen from './StarterScreens/SwiperScreen';
import PhoneAuthScreen from './AuthScreens/AuthScreen';
import VerifyAuth from './AuthScreens/VerifyAuth';
import TabNav from './Navigators/TabNav';
import AuthLoadingScreen from './StarterScreens/AuthLoadingScreen';

const RootStack = createStackNavigator();

const RootStackScreen=()=>(
    <RootStack.Navigator headerMode='none' initialRouteName="AuthLoadingScreen"
    keyboardHandlingEnabled="true" 
    >
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SwiperScreen" component={SwiperScreen}/>
        <RootStack.Screen name="PhoneAuthScreen" component={PhoneAuthScreen}/>
        <RootStack.Screen name="VerifyAuth" component={VerifyAuth}/>
        <RootStack.Screen name="TabNav" component={TabNav}/>
        <RootStack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen}/>
    </RootStack.Navigator>
);

export default memo(RootStackScreen);