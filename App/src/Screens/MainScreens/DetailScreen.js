import React,{memo,useState } from 'react';
import {View,Image, StyleSheet, StatusBar,Dimensions,TouchableOpacity} from 'react-native';
import { Text} from 'react-native-paper';
import { AppLoading } from 'expo';
import {useTheme} from '@react-navigation/native';
import firebase from "../../Config/config";
import "firebase/auth";
import Constants from "expo-constants";
import * as Font from 'expo-font';
import { ThemeProvider } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function useFonts(fontMap) {
  let [fontsLoaded, setFontsLoaded] = useState(false);
  (async () => {
    await Font.loadAsync(fontMap);
    setFontsLoaded(true);
  })();
  return [fontsLoaded];
}
  

function DetailScreen({navigation}) {
  const [name,setName]=React.useState("");
  const [phone,setPhone]=React.useState("");
  const theme = useTheme();
  const {colors}=useTheme();
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is logged in
      setName(user.displayName);
      setPhone(user.phoneNumber);
    }
  });
  let [fontsLoaded] = useFonts({
    'Cinzel':require('../../assets/fonts/CinzelDecorative-Regular.ttf'),
    'CinzelBold':require('../../assets/fonts/CinzelDecorative-Bold.ttf'),
    'Baloor':require('../../assets/fonts/BalooBhaina2-Regular.ttf'),
    'BaloorBold':require('../../assets/fonts/BalooBhaina2-Medium.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={styles.container}>
     <StatusBar barStyle ={theme.dark?"light-content":"dark-content"}
    hidden={true}
    />
    <View style={styles.header}>
   
      <Image style={[styles.profileImage,{borderColor:theme.dark?'#647DEE':'#647DEE'}]}
        source={require("../../assets/MemeGen.png")}/>
    </View>
    <View style={styles.footer}>
      <Text style={[styles.name,{fontFamily:'CinzelBold'}]}>{name} </Text>
      <Text style={[styles.phone,{fontFamily:'BaloorBold'}]}> {phone} </Text>
      
      <View style={styles.button}
      animation="fadeInUp">
      <TouchableOpacity onPress={()=>navigation.navigate('Credit')}>
        <LinearGradient
          colors={['#A88BEB','#647DEE']}
          style={styles.signIn}
        >
          <Text 
          style={[styles.textButton,{fontFamily:'BaloorBold',color:colors.background,fontSize:25}]}>Credits</Text>
          <View style={{flexDirection:'row'}}>
          <MaterialCommunityIcons
            name="drama-masks"
            color={colors.background}
            size={30}
          />
          <Text style={[styles.textButton,{fontFamily:'BaloorBold',color:colors.background}]}>+20</Text>
          </View>
        </LinearGradient>

      </TouchableOpacity>
      </View>
      </View>
    </View>
  );
  }
}

export default memo(DetailScreen);
const {width,height} = Dimensions.get("screen");
const height_logo = height * 0.28;
const width_button = width * 0.95;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius:30,
},
footer: {
    flex: 2,
    alignItems: 'center',
    paddingHorizontal: 30,
    borderTopRightRadius: 30,
},
name: {
  fontSize: 23,
  marginBottom: 10,
},
phone: {
  fontSize: 20,
  marginBottom: 20,
},
button: {
  alignItems: 'flex-end',
  marginTop: 30
},
  profileImage:{
    width: height_logo,
    height: height_logo,
    borderRadius:150,
    overflow:'hidden',
    borderWidth:3,
  },
  signIn: {
    width: width_button,
    height: 70,
    justifyContent:"space-between",
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal:20,
    flexDirection: 'row'
},
textButton: {
    color: 'white',
    fontSize:20,
    
}
});

