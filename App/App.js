import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer,DarkTheme,DefaultTheme } from '@react-navigation/native';
import RootStackScreen from './src/Screens/RootStackScreen';
import {Provider as PaperProvider,DarkTheme as PaperDarkTheme,DefaultTheme as PaperDefaultTheme} from 'react-native-paper';
import {AuthContext} from './src/Screens/Context';

const CustomDefaultTheme={
  ...DefaultTheme,
  ...PaperDefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: '#fff',
    text: '#111'
  }
}
const CustomDarkTheme={
  ...DarkTheme,
  ...PaperDarkTheme,
  colors:{
    ...DarkTheme.colors,
    ...PaperDarkTheme.colors,
    background: '#111',
    text: '#fff'
  }
}



export default function App() {
  
  const [isDarkTheme,setIsDarkTheme] = React.useState(false);
  const authContext = React.useMemo(()=>({
    toggleTheme: () =>{
      setIsDarkTheme(isDarkTheme=>!isDarkTheme);
    }
  }),[])

  
const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme

  // const [isLoading, setLoading] = React.useState(true);

  // if(isLoading){
  //   return(
  //     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  //       <ActivityIndicator size="large"/>
  //     </View>
  //   );
  // }
  
  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
    <RootStackScreen/>
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
    
  );
}
