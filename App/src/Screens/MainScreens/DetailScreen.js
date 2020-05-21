import React,{memo} from 'react';
import { Text, View, StyleSheet, Image ,Button} from 'react-native';

function DetailScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen </Text>
    </View>
  );
}

export default memo(DetailScreen);
