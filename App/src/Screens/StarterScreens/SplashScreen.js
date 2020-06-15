import React,{memo} from 'react';
import { 
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { 
  Text,
  Image ,
  Button,
  useTheme,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

function SplashScreen({navigation}) {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
     <View style={styles.header}>
      <Animatable.Image
          animation="pulse" easing="ease-out" iterationCount="infinite"
        source={require('../../assets/MemeGen.png')}
        style={styles.logo}
        resizeMode="stretch"
      />
     </View>
     <Animatable.View style={[styles.footer,{backgroundColor:colors.background}]}
     animation="fadeInUpBig"
     >
     <Animatable.Text style={[styles.title,{color:colors.text}]}
      animation='fadeInDown'>
      Welcome!</Animatable.Text>
      <Animatable.Text style={[styles.title,{color:colors.text}]}
      animation='fadeInDown'
      >
      Ready for some hilarious action?</Animatable.Text>
      <Animatable.View style={styles.button}
      animation="rubberBand"
          iterationCount={4}>
      <TouchableOpacity onPress={()=>navigation.navigate('SwiperScreen')}>
        <LinearGradient
          // colors={['#667eea','#764ba2']}
          colors={['#58B19F','#58B17a']}
          style={styles.signIn}
        >
          <Text 
          style={[styles.textSign,{color:colors.background}]}>Let's Get Started</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            color={colors.background}
            size={20}
          />
        </LinearGradient>
      </TouchableOpacity>
      </Animatable.View>
     </Animatable.View>
    </View>
  );
}

export default memo(SplashScreen);

const {height} = Dimensions.get("screen");
const height_logo = height * 0.38;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#061922'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
  },
  footer: {
      flex: 1/2,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 25,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});
