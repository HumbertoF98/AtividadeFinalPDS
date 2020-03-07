import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    /*  this.apiReact = this.apiReact.bind(this); // API */
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  /* apiReact() {
    fetch('https://dompixel.dev/api/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (!result.error && !result.errors && result.access_token != null) {
          AsyncStorage.setItem('userToken', result.access_token);
          this.props.navigation.navigate('Home');
        } else {
          Alert.alert(
            'Email ou senha incorretos',
            'Por favor, verifique seus dados e tente novamente!',
          );
          AsyncStorage.clear();
          this.props.navigation.navigate('Auth');
        }
      })
      .catch(error => {
        Alert.alert('Ocorreu um erro', 'Por favor, tente novamente');
        AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      });
  }
 */
  validate = text => {
    //validate email
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ email: text });
      return false;
    } else {
      this.setState({ email: text });
    }
  };

  render() {
    //Starting the View Forms
    return (
      <View style={styles.containerMaster}>
        <View style={styles.body}>
          <ScrollView>
            <Text style={styles.headerText}>Login</Text>

            <View style={styles.container}>
              <View style={styles.inputWrap}>
                <Entypo name="email" style={styles.label} color="#8a8080" />
                <TextInput
                  onChangeText={text => this.validate(text)}
                  value={this.state.email}
                  style={styles.textInput}
                  placeholderTextColor="#8a8080"
                  placeholder="Digite seu email"
                  autoCompleteType="email"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    this.secondTextInput.focus();
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.inputWrap}>
                <Icon name="asterisk" style={styles.label} color="#8a8080" />
                <TextInput
                  secureTextEntry={true}
                  autoFocus={false}
                  returnKeyType="next"
                  ref={input => {
                    this.secondTextInput = input;
                  }}
                  placeholderTextColor="#8a8080"
                  placeholder="Digite sua senha"
                  value={this.state.password}
                  onChangeText={text => {
                    this.setState({
                      password: text,
                    });
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}>
                <View style={styles.containerButton}>
                  <Text style={styles.textButton}>Login</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.containerButtonMaster}>
                <Text style={styles.text}>Não tem uma conta?</Text>
                <View style={styles.containerButton2}>
                  <TouchableOpacity
                    onPress={this.apiReact}>
                    <Text style={styles.textButton2}>Registre-se</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ResetPassword')}>
                <Text style={styles.textButton2}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //StyleSheet for all View forms and Containers
  header: {
    marginLeft: 25,
    marginTop: 20,
    marginRight: 25,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerText: {
    marginLeft: 25,
    marginTop: 20,
    marginRight: 25,
    fontSize: 25,
    textAlign: 'center',
  },
  buttonLogin: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
  },
  body: {
    margin: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 15,
    color: '#8a8080',
    fontWeight: 'bold',
    margin: 5,
  },
  input: {
    fontSize: 15,
    color: 'gray',
    borderRadius: 10,
    margin: 10,
  },
  container: {
    margin: 15,
    flex: 2,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  containerButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#7159c1',
    height: 40,
    width: 200,
    borderRadius: 10,
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
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: '#191919',
    borderBottomWidth: 1,
    marginBottom: 25,
  },
  textInput: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
    flex: 1,
    color: '#000000',
  },
  containerMaster: {
    flex: 1,
    backgroundColor: '#EEECE1',
  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  containerButtonMaster: {
    margin: 20,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  textButton2: {
    color: '#EEECE1',
    textAlign: 'center',
    fontSize: 15,
    color: '#7159c1',
    fontWeight: 'bold',
  },
});
