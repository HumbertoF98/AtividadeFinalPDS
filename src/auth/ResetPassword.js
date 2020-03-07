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
import Entypo from 'react-native-vector-icons/Entypo';
import { BASE_URLForget } from 'react-native-dotenv';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.apiReact = this.apiReact.bind(this); // API
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  apiReact() {
    const baseUrl = BASE_URLForget;
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (!result.error && !result.errors) {
          Alert.alert('Sucesso', result.data.message.toString());
        } else {
          Alert.alert('Erro!', result.errors.message.toString());
        }
      })
      .catch(error => {
        Alert.alert('Ocorreu um erro', 'Por favor, tente novamente.');
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
            <View style={styles.container}>
              <Text style={styles.headerText}>Esqueceu sua senha?</Text>
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

              <TouchableOpacity
                onPress={this.apiReact}>
                <View style={styles.containerButton}>
                  <Text style={styles.textButton}>Enviar</Text>
                </View>
              </TouchableOpacity>



              <TouchableOpacity
                style={styles.containerButton2}
                onPress={() => this.props.navigation.navigate('Login')}>
                <View>
                  <Text style={styles.buttonRegister}>Login</Text>
                </View>
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
    marginBottom: 30,
    fontSize: 20,
    textAlign: 'center',
  },
  buttonRegister: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    color: '#7159c1',
    fontWeight: 'bold',
    marginTop: 20
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
  buttonLogin: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
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
    color: '#008080',
    fontWeight: 'bold',
  },
});