import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from './src/Screens/RootStackScreen';


export default function App() {
  // const [isLoading, setLoading] = React.useState(true);

  // if(isLoading){
  //   return(
  //     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  //       <ActivityIndicator size="large"/>
  //     </View>
  //   );
  // }
  
  return (
    <NavigationContainer>
    <RootStackScreen/>
    </NavigationContainer>
  );
}
