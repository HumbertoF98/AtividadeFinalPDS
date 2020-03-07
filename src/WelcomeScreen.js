import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerLogoAr}>
          {/*   <Image
            style={styles.imageLogoAr}
            resizeMode="contain"
            source={require('../images/logo20201.png')}
          /> */}
        </View>

        <View style={styles.containerWelcome}>
          <Text style={styles.textWelcome}>Bem-vindo ao Denuncias Cuiabá</Text>
        </View>

        <View style={styles.containerButtons}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <View style={styles.containerButton}>
              <Text style={{ color: 'white' }}>Login</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.containerButton2}
            onPress={() => this.props.navigation.navigate('Register')}>
            <View>
              <Text style={styles.buttonRegister}>Cadastre-se</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* 
        <View style={styles.containerLogo}>
          <Text style={styles.textLogo}> Developed by</Text>
          <Image
            style={styles.imageLogo}
            resizeMode="contain"
            source={require('../images/logofull.png')}
          />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEECE1',
  },
  containerButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7159c1',
    height: 40,
    width: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  containerButton2: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#EEECE1',
  },
  buttonRegister: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    color: '#7159c1',
    fontWeight: 'bold',
  },
  buttonLogin: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
  },
  imageLogo: {
    width: '50%',
    height: 50,
    marginTop: 10,
  },
  textLogo: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: -10,
  },
  containerLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 3 / 2,
    marginBottom: 10,
    marginLeft: 20,
  },
  textWelcome: {
    textAlign: 'center',
    fontSize: 20,
  },
  containerWelcome: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
  },
  imageLogoAr: {
    aspectRatio: 3 / 2,
  },
  containerLogoAr: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },
  containerButtons: {
    marginBottom: 20,
    justifyContent: 'flex-start',
  },
});
