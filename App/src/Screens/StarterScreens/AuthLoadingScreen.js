import React, { memo } from "react";
import { View,StyleSheet} from "react-native";
import {useTheme} from 'react-native-paper';
import firebase from "../../Config/config";
import "firebase/auth";
import {
  PacmanIndicator,
} from 'react-native-indicators';

const AuthLoadingScreen = ({ navigation }) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is logged in
        navigation.navigate("TabNav");
      } else {
        // User is not logged in
        navigation.navigate("SplashScreen");
      }
    });
    const theme = useTheme()
    return (
      <View style={styles.container}>
          <PacmanIndicator color={theme.dark?"#222":"#fff"} />
      </View>
      );
    };
    
    export default memo(AuthLoadingScreen);

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#079992',
      },
    });