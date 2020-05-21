import React,{ memo,useRef } from 'react';
import { Text, View, StyleSheet, Image,TouchableOpacity ,Button,Platform,ActivityIndicator,TextInput,DeviceEventEmitter} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import {Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import firebase from '../../Config/config';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import {
  SkypeIndicator,
} from 'react-native-indicators';

function PhoneAuthScreen({navigation}) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const recaptchaVerifier = useRef(null);
  const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  sendCode = () => {
    if(name.length>=5){
    if (re.test(phone)) {
      setLoading(true);
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider
        .verifyPhoneNumber(phone, recaptchaVerifier.current)
        .then((id) => {
          console.log(id);
          setLoading(false);
          navigation.navigate("VerifyAuth", { verificationId: id,displayName: name});
        })
        .catch((e) => {setLoading(false);
                      alert(e)});
    } else {
      alert("Number Invalid");
    }
  }
  else{
    alert("A memer Should have Best Identity")
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
      <Text style={styles.text_footer}>Name</Text>
      <View style={styles.action}>
        <FontAwesome
          name="user-o"
          color="#05375a"
          size={25}
        />
        <TextInput
          placeholder="Your Name"
          onChangeText={setName}
          style={styles.textInput}
        />
        {name.length>7?
        (<Feather
          name="check-circle"
          color='green'
          size={20}
        />):null}
      </View>
      {!(name.length>7)?
        (<Text style={{color:'red'}}>No. of character should be greater than 7 </Text>):null}
        </Animatable.View>
    <Animatable.View
    animation="fadeInRightBig"
    >
      <Text style={[styles.text_footer,{marginTop: 30}]}>Phone no.</Text>
      <View style={styles.action}>
        <FontAwesome
          name="phone"
          color="#05375a"
          size={25}
        />
        <TextInput
          placeholder="Phone Number"
          style={styles.textInput}
          onChangeText={setPhone}
          returnKeyType="done"
          keyboardType="phone-pad"
          autoCompleteType="tel"
        />
        {(phone.length >= 13)?
        (<Feather
          name="check-circle"
          color='green'
          size={20}
        />):null}
      </View>
      {!(phone.length >= 13)?(
      <Text style={{color:'red'}}>Enter your phone no. with country code ahead eg:+91********** </Text>
      ):(null)}
      </Animatable.View>
      <View >
      
      <TouchableOpacity onPress={sendCode} style={styles.button}>
      <LinearGradient
        colors={['#08d4c4','#01ab9d']}
        style={styles.signIn}
      >
        {loading ? (
          <SkypeIndicator color="#fff" />
        ) : (
          <Text style={[styles.textSign,{color:'#fff'}]} >Send OTP</Text>
        )}
        </LinearGradient>
      </TouchableOpacity>
      
      </View>
    </Animatable.View>
    <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
        title="Are U really a memer??"
      />
  </View>
);
}

export default memo(PhoneAuthScreen);

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
      fontSize:20,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
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