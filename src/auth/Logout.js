import React from 'react';
import {
  View,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Logout extends React.Component {
  constructor() {
    super();
    this._bootstrap();
  }

  _bootstrap = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text style={styles.text}>Obrigado por utilizar nosso aplicativo!</Text>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEECE1',
  },
  text: {
    fontSize: 20,
  },
});
