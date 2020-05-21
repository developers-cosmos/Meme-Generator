import React,{memo} from 'react';
import { Text, View, StyleSheet, Image ,Button} from 'react-native';
import firebase from '../../Config/config';
import "firebase/auth";

const logoutUser = () => {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    alert(error);
  });
};

function SettingScreen({navigation}) {


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Setting Screen </Text>
      <Button
      title="LogOut"
      onPress={()=> logoutUser()}
      />
    </View>
  );
}

export default memo(SettingScreen);
