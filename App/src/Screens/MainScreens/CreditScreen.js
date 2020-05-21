import React,{memo} from 'react';
import { Text, View, StyleSheet, Image ,Button} from 'react-native';

function CreditScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Credit Screen</Text>
    </View>
  );
}

export default memo(CreditScreen);
