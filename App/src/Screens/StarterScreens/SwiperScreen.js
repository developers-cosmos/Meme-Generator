import React,{memo} from 'react';
import { Text, View, StyleSheet, Image ,Button,Dimensions,TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';

import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

function SwiperScreen({navigation}) {
  return (
    <View style={styles.container}>
    <Animatable.View 
    animation='fadeInDown'
    style={styles.mainHeader}>
    <Swiper 
      autoplay={true}
      autoplayDirection={true}
      autoplayTimeout={3}
       dot={<View style={styles.dot}/>}
       activeDot={<View style={styles.activeDot}/>}
    >
      <Animatable.View style={styles.slide}
      animation='pulse' iterationCount={3}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/capture.png')}
            style={styles.image}
            resizeMode={"stretch"}
          />
        </View>
        <View style={styles.footer}>
        <Text style={styles.title}>Capture Photo</Text>
        <Text style={styles.text}>Take a picture of yours or your friends</Text>
        </View>
      </Animatable.View>
      <View style={styles.slide}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/upload.png')}
            style={styles.image}
            resizeMode={"stretch"}
          />
        </View>
        <View style={styles.footer}>
        <Text style={styles.title}>Upload Photo</Text>
        <Text style={styles.text}>Upload the captured picture to server. 
        </Text>
        </View>
      </View>
      <View style={styles.slide}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/analyse.png')}
            style={styles.image}
            resizeMode={"stretch"}
          />
        </View>
        <View style={styles.footer}>
        <Text style={styles.title}>Analysing Expression</Text>
        <Text style={styles.text}>Our server analyses the expression in uploaded picture 
        </Text>
        </View>
      </View>
      <View style={styles.slide}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/mem.png')}
            style={styles.image}
            resizeMode={"stretch"}
          />
        </View>
        <View style={styles.footer}>
        <Text style={styles.title}>Suitable Meme</Text>
        <Text style={styles.text}>After analysing, suitable meme text is applied on your pic.
        </Text>
        </View>
      </View>
      <View style={styles.slide}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/meme1.png')}
            style={styles.image}
            resizeMode={"stretch"}
          />
        </View>
        <View style={styles.footer}>
        <Text style={styles.title}>Meme Generation</Text>
        <Text style={styles.text}>The image with meme text and your image is generated. 
        </Text>
        </View>
      </View>
      <View style={styles.slide}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/share.png')}
            style={styles.image}
            resizeMode={"stretch"}
          />
        </View>
        <View style={styles.footer}>
        <Text style={styles.title}>Share</Text>
        <Text style={styles.text}>Share the generated meme with your beloved once</Text>
        <Text style={styles.text}>#spread_happiness #spread_memes</Text>
        </View>
      </View>
    </Swiper>
    </Animatable.View>
    <View style={styles.mainFooter}>
      <Animatable.Text style={styles.title}
      animation='fadeInUp'
      >
      Lets Generate Memes With MemeGen!</Animatable.Text>
      <Animatable.View style={styles.button}
      animation="fadeInUp">
      <TouchableOpacity onPress={()=>navigation.navigate('PhoneAuthScreen')}>
        <LinearGradient
          colors={['#58B19F','#58B17a']}
          style={styles.signIn}
        >
          <Text 
          style={styles.textSign}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>
      </Animatable.View>
    </View>
    </View>
);
}

export default memo(SwiperScreen);

const {width,height} = Dimensions.get("screen");
const height_image = height * 0.5 * 0.8;
const width_image = height_image * 1.1;

const styles = StyleSheet.create({
container: {
    flex: 1, 
    
},
slide:{
  flex:1,
  
},
mainHeader:{
  flex:2,
  borderBottomLeftRadius: 60,
  borderBottomRightRadius: 60,
  backgroundColor: '#58B19F',
},
mainFooter:{
  flex: 0.3,
  
  paddingVertical: 30,
  paddingHorizontal: 30
},
header:{
  flex:2,
  justifyContent:'center',
  alignItems:'center',
  
},
footer:{
  flex:1,
  alignItems:'center',
  paddingHorizontal:20,
},
image:{
  height:height_image,
  width:width_image,
},
title: {
  color: '#05375a',
  fontSize: 23,
  fontWeight: 'bold'
},
text: {
  color: 'white',
  marginTop:10,
},
dot:{
  backgroundColor:"rgba(52,101,217,.4)",
  width: 8,
  height: 8,
  borderRadius:4,
  marginHorizontal:6,
  marginVertical:4,
},
activeDot:{
  backgroundColor:"#25CCF7",
  width: 20,
  height: 8,
  borderRadius:4,
  marginHorizontal:6,
  marginVertical:4,
},
button: {
  alignItems: 'center',
  marginTop:10,
},
signIn: {
  width: 350,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  flexDirection: 'row'
},
textSign: {
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold'
}
});
