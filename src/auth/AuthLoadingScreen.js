import React from 'react';
import {
  View,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from 'react-native-dotenv';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrap();
    this.apiReact = this.apiReact.bind(this);
  }

  bootstrap = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.apiReact(userToken);
  };

  async apiReact(userToken) {
    const baseUrl = BASE_URL;
    fetch(baseUrl + '/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then(response => response.json())
      .then(result => {
        if (!result.error && !result.errors) {
          AsyncStorage.setItem('userId', result.id.toString());
          AsyncStorage.setItem('userAdmin', result.admin.toString());
          this.props.navigation.navigate('Home');
        } else {
          AsyncStorage.clear();
          this.props.navigation.navigate('Auth');
        }
      })
      .catch(error => {
        AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text style={styles.text}>Verificando informações</Text>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});
