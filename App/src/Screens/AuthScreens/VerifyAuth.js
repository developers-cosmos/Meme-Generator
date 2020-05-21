import React,{ useRef } from 'react';
import { Text, View, StyleSheet,TouchableOpacity, Image ,Button,Platform,ActivityIndicator,TextInput,DeviceEventEmitter} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import {Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import firebase from '../../Config/config';
import {
  DotIndicator,
} from 'react-native-indicators';


function VerifyAuth({navigation,route}) {
    const { verificationId,displayName } = route.params;
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const verifyCode = () => {
    if(code.length === 6)
    {
    setLoading(true);
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        result.user.updateProfile({displayName:displayName});
        console.log(route.params.displayName);
        if (result.user) {
            console.log(result.user);
          setLoading(false);
          navigation.navigate("TabNav");
        }
      })
      .catch((e) => {setLoading(false);alert("Code is Invalid, Please recheck the code")});
    }
    else{
      alert("Please enter 6 number OTP that you recieved")
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.text_header}>Hello Memer!</Text>
    </View>
    <Animatable.View style={styles.footer}
      animation="fadeInUpBig"
    >
    <Animatable.View
      animation="fadeInLeftBig"
    >
      <Text style={[styles.text_footer,{marginTop: 30}]}>Enter OTP</Text>
      <View style={styles.action}>
        <FontAwesome
          name="lock"
          color="#05375a"
          size={25}
        />
        <TextInput
          placeholder="Enter OTP"
          onChangeText={setCode}
        returnKeyType="done"
        style={styles.textInput}
        keyboardType="phone-pad"
        maxLength={6}
        />
      </View>
      </Animatable.View>
      <TouchableOpacity onPress={verifyCode} style={styles.button}>
      <LinearGradient
        colors={['#08d4c4','#01ab9d']}
        style={styles.signIn}
      >
        {loading ? (
          <DotIndicator color="#fff" />
        ) : (
          <Text style={[styles.textSign,{color:'#fff'}]}>SUBMIT</Text>
        )}
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  </View>
);
}

export default VerifyAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      fontSize:20,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});