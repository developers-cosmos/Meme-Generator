import React,{memo} from 'react';
import { View, StyleSheet} from 'react-native';
import { Text, Image ,Button} from 'react-native-paper';

function CreditScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Credit Screen</Text>
    </View>
  );
}

export default memo(CreditScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center' 
  },
});
