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
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInputMask } from 'react-native-masked-text';
import { BASE_URL } from 'react-native-dotenv';

export default class Register extends Component {
  constructor(props) {
    //Constructor to initialize forms
    super(props);
    this.state = {
      email: '',
      name: '',
      surname: '',
      document: '',
      telephone: '',
      status: '',
      wholeResult: '',
      password: '',
    };
    this.apiReact = this.apiReact.bind(this); // API
  }

  //Mask Password
  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  onChangedDocument(text) {
    let newDocument = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newDocument = newDocument + text[i];
      } else {
        // your call back function
        alert('por favor, insira apenas números');
      }
    }
    this.setState({ document: newDocument });
  }

  apiReact() {
    //API from this Form
    const baseUrl = BASE_URL;

    fetch(baseUrl + '/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        surname: this.state.surname,
        document: this.state.document,
        telephone: this.state.telephone,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (!result.error && !result.errors) {
          this.setState({
            status: result.error,
            wholeResult: result,
          });
          Alert.alert(
            'Cadastro Realizado com sucesso',
            'Verifique seu e-mail para confirmar seu cadastro!',
          );
          AsyncStorage.setItem('userToken', result.access_token);
          this.props.navigation.navigate('AuthLoading');
        } else {
          Alert.alert(
            'Ocorreu um erro no cadastro',
            'Verifique seus dados e tente novamente, caso o erro persista entre em contato com a nossa equipe!',
          );
        }
      })
      .catch(error => {
        Alert.alert('Ocorreu um erro no cadastro', JSON.stringify(error));
      });
  }

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
            <Text style={styles.headerText}>Cadastro</Text>

            <View style={styles.container}>
              <View style={styles.inputWrap}>
                <Material
                  name="format-letter-case-upper"
                  style={styles.label}
                  color="#8a8080"
                />
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={'#8a8080'}
                  placeholder={'Digite seu nome'}
                  spellCheck={false}
                  value={this.state.name}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.nameTextInput.focus();
                  }}
                  onChangeText={text => {
                    this.setState({
                      name: text,
                    });
                  }}
                />
              </View>

              <View style={styles.inputWrap}>
                <Material
                  name="format-letter-case-lower"
                  style={styles.label}
                  color="#8a8080"
                />
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={'#8a8080'}
                  placeholder={'Digite seu sobrenome'}
                  spellCheck={false}
                  value={this.state.surname}
                  returnKeyType="next"
                  ref={input => {
                    this.nameTextInput = input;
                  }}
                  onChangeText={text => {
                    this.setState({
                      surname: text,
                    });
                  }}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this._cpfRef.getElement().focus();
                  }}
                />
              </View>

              <View style={styles.inputWrap}>
                <Icon name="id-card" style={styles.label} color="#8a8080" />
                <TextInputMask
                  type={'cpf'}
                  value={this.state.document}
                  onChangeText={text => {
                    this.setState({
                      document: text,
                    });
                  }}
                  style={styles.textInput}
                  placeholderTextColor="#8a8080"
                  placeholder="Digite seu CPF"
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  ref={ref => (this._cpfRef = ref)}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this._phoneRef.getElement().focus();
                  }}
                />
              </View>

              <View style={styles.inputWrap}>
                <Icon name="phone" style={styles.label} color="#8a8080" />
                <TextInputMask
                  type={'cel-phone'}
                  value={this.state.telephone}
                  onChangeText={text => {
                    this.setState({
                      telephone: text,
                    });
                  }}
                  style={styles.textInput}
                  placeholderTextColor="#8a8080"
                  placeholder="Digite seu telefone"
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  dataDetectorTypes="phoneNumber"
                  returnKeyType="next"
                  ref={ref => (this._phoneRef = ref)}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.emailTextInput.focus();
                  }}
                />
              </View>

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
                  ref={input => {
                    this.emailTextInput = input;
                  }}
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.passwordTextInput.focus();
                  }}
                />
              </View>

              <View style={styles.inputWrap}>
                <Icon name="asterisk" style={styles.label} color="#8a8080" />
                <TextInput
                  secureTextEntry={true}
                  returnKeyType="next"
                  placeholderTextColor="#8a8080"
                  placeholder="Digite sua senha"
                  value={this.state.password}
                  onChangeText={text => {
                    this.setState({
                      password: text,
                    });
                  }}
                  ref={input => {
                    this.passwordTextInput = input;
                  }}
                />
              </View>

              <TouchableOpacity onPress={this.apiReact}>
                <View style={styles.containerButton}>
                  <Text style={styles.textButton}>Cadastrar</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.containerButtonMaster}>
                <Text style={styles.text}>Já tem uma conta?</Text>
                <View style={styles.containerButton2}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.textButton2}>Faça o Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //StyleSheet for all View forms and Containers
  containerMaster: {
    backgroundColor: '#EEECE1',
  },
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
  body: {
    margin: 20,
    backgroundColor: '#EEECE1',
    borderRadius: 10,
  },
  label: {
    fontSize: 15,
    color: '#8a8080',
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
    width: 300,
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
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
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
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    color: '#7159c1',
    fontWeight: 'bold',
  },
  textButton3: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    color: '#008080',
    fontWeight: 'bold',
  },
});
