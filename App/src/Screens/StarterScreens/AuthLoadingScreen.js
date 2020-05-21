import React, { memo } from "react";
import { ActivityIndicator,View,StyleSheet} from "react-native";
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
    return (
      <View style={styles.container}>
          <PacmanIndicator color="red" />
      </View>
      );
    };
    
    export default memo(AuthLoadingScreen);

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center' 
      },
    });