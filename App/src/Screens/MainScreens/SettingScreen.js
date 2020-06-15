import React,{memo,useState} from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import {SafeAreaView,View,ScrollView, StyleSheet,Button,Dimensions,TouchableOpacity} from 'react-native';
import { useTheme,Text,Switch,TouchableRipple} from 'react-native-paper';
import firebase from '../../Config/config';
import "firebase/auth";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {AuthContext} from '../Context';
import * as WebBrowser from 'expo-web-browser';

const logoutUser = () => {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    alert(error);
  });
};

function useFonts(fontMap) {
  let [fontsLoaded, setFontsLoaded] = useState(false);
  (async () => {
    await Font.loadAsync(fontMap);
    setFontsLoaded(true);
  })();
  return [fontsLoaded];
}
  

function SettingScreen({navigation}) {

const paperTheme = useTheme();
const {colors} = useTheme();

const {toggleTheme} =React.useContext(AuthContext);

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
    <SafeAreaView style={styles.container}>
      
      <ScrollView >
      <View style={{flexDirection:'row'}}>
      <View style={styles.leftIcon}>
      <MaterialCommunityIcons
            name="theme-light-dark"
            color={colors.text}
            size={30}
          />
        </View>
      <TouchableRipple  onPress={()=>{toggleTheme()}}>
      <View pointerEvents='none' style={[styles.signIn,{borderColor:colors.background}]}>
        <Text style={styles.textButton}>Dark Theme</Text>
        <View style={{marginRight:25}}>
        <Switch value={paperTheme.dark}/></View>
        </View>
      </TouchableRipple>
      </View>
      <View style={{flexDirection:'row'}}>
      <View style={styles.leftIcon}>
      <MaterialCommunityIcons
            name="earth"
            color={colors.text}
            size={30}
          />
        </View>
      <TouchableOpacity
      style={[styles.signIn,{borderColor:colors.text}]}
      onPress={()=>{WebBrowser.openBrowserAsync('https://bit.ly/developerscosmos-memegenerator')}}
      ><View >
      
        <Text style={styles.textButton}>MemeGen Web</Text></View>
      </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row'}}>
      <View style={styles.leftIcon}>
      <MaterialCommunityIcons
            name="information-outline"
            color={colors.text}
            size={30}
          />
        </View>
      <TouchableOpacity
      onPress={()=>{WebBrowser.openBrowserAsync('https://developers-cosmos.github.io/Meme-Generator/')}}
      style={[styles.signIn,{borderColor:colors.text}]}
      >
        <Text style={styles.textButton}>About MemeGen</Text>
      </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row'}}>
      <View style={styles.leftIcon}>
      <MaterialCommunityIcons
            name="contact-mail-outline"
            color={colors.text}
            size={30}
          />
        </View>
      <TouchableOpacity
      style={[styles.signIn,{borderColor:colors.text}]}
      >
        <Text style={styles.textButton}>Contact Developers</Text>
      </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row'}}>
      <View style={styles.leftIcon}>
      <MaterialCommunityIcons
            name="code-tags"
            color={colors.text}
            size={30}
          />
        </View>
      <TouchableOpacity
      style={[styles.signIn,{borderColor:colors.text}]}
      >
        <Text style={styles.textButton}>About Developers</Text>
      </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row'}}>
      <View style={styles.leftIcon}>
      <MaterialCommunityIcons
            name="bug"
            color={colors.text}
            size={30}
          />
        </View>
      <TouchableOpacity
      onPress={()=>{WebBrowser.openBrowserAsync('https://github.com/developers-cosmos/Meme-Generator/issues/')}}
      style={[styles.signIn,{borderColor:colors.text}]}
      >
        <Text style={styles.textButton}>Report bug</Text>
      </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row'}}>
      <View style={styles.leftIcon}>
      <MaterialCommunityIcons
            name="shield-key-outline"
            color={colors.text}
            size={30}
          />
        </View>
      <TouchableOpacity
      style={[styles.signIn,{borderColor:colors.text}]}
      >
        <Text style={styles.textButton}>Privacy Policy</Text>
      </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row'}}>
      <View style={styles.leftIcon}>
      <MaterialCommunityIcons
            name="github-circle"
            color={colors.text}
            size={30}
          />
        </View>
      <TouchableOpacity
      onPress={()=>{WebBrowser.openBrowserAsync('https://github.com/developers-cosmos/Meme-Generator')}}
      style={[styles.signIn,{borderColor:colors.text}]}
      >
        <Text style={styles.textButton}>MemeGen Git</Text>
      </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row'}}>
      <View style={styles.leftIcon}>
      <MaterialCommunityIcons
            name="star-face"
            color={colors.text}
            size={30}
          />
        </View>
      <TouchableOpacity
      style={[styles.signIn,{borderColor:colors.text}]}
      >
        <Text style={styles.textButton}>Rate us</Text>
      </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row'}}>
      <View style={styles.leftIcon}>
      <MaterialCommunityIcons
            name="comment-text-multiple"
            color={colors.text}
            size={30}
          />
        </View>
      <TouchableOpacity
      style={[styles.signIn,{borderColor:colors.text}]}
      >
        <Text style={styles.textButton}>Feedback</Text>
      </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row'}}>
      <View style={styles.leftIcon}>
      <MaterialCommunityIcons
            name="share-variant"
            color={colors.text}
            size={30}
          />
        </View>
      <TouchableOpacity
      style={[styles.signIn,{borderColor:colors.text}]}
      >
        <Text style={styles.textButton}>Share app</Text>
      </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row'}}>
      <View style={styles.leftIcon}>
      <MaterialCommunityIcons
            name="logout"
            color={colors.text}
            size={30}
          />
        </View>
      <TouchableOpacity
      onPress={()=> logoutUser()}
      style={[styles.signIn,{borderColor:colors.text}]}
      >
      
        <Text style={styles.textButton}>LOGOUT</Text>
      </TouchableOpacity>
      </View>
      
      <View style={{flexDirection:'row',justifyContent:"center",marginTop:30}}>
      <MaterialCommunityIcons
            name="copyright"
            color={colors.text}
            size={25}
          />
        <Text style={[styles.textButton,{fontFamily:'Baloor'}]}>Developer Cosmos</Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
}

export default memo(SettingScreen);

const {width,height} = Dimensions.get("screen");
const height_logo = height * 0.28;
const width_button = width * 0.95;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signIn: {
    width: width_button,
    height: 60,
    justifyContent:"space-between",
    alignItems: 'center',
    borderTopWidth: 0.2,
    paddingHorizontal:10,
    flexDirection: 'row',
},
textButton: {
  fontSize:20,
  fontFamily:'BaloorBold'
},
leftIcon:{
  justifyContent:'center',
  alignItems:'center',
  margin:10,
},
});