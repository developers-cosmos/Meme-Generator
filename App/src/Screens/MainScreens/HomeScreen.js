import React, {memo, useEffect } from 'react';
import {  View, StyleSheet,BackHandler, Alert,StatusBar} from 'react-native';
import { Text, Image ,Button} from 'react-native-paper';

function HomeScreen({navigation}) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
    <StatusBar />
      <Text>Home Screen</Text>
    </View>
  );
}

export default memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center' 
  },
});

