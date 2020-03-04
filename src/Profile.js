import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: '',
      lastRefresh: Date(Date.now()).toString(),
      filePath: {},
      date_of_birth: '',
      telephone: '',
      name: '',
      surname: '',
      email: '',
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      status: '',
      wholeResult: '',
    };
    this.bootstrap();
    this.apiReact = this.apiReact.bind(this);
    this.apiReactUpdate = this.apiReactUpdate.bind(this);
  }


  onChangedDocument(text) {
    let newDocument = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newDocument = newDocument + text[i];
      } else {
        alert('por favor, insira apenas números');
      }
    }
    this.setState({ document: newDocument });
  }

  validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ email: text });
      return false;
    } else {
      this.setState({ email: text });
    }
  };

  bootstrap = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.apiReact(userToken);
  };

  async apiReact(userToken) {
    this.setState({ loading: true });

    fetch('https://dompixel.dev/api/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.deleted_at) {
          alert('Você está banido!');
          this.props.navigation.navigate('WelcomeScreen');
        }
        else {
          this.setState({
            data: res,
            document: res.document,
            date_of_birth: res.date_of_birth,
            telephone: res.telephone,
            name: res.name,
            surname: res.surname,
            email: res.email,
            error: res.error || null,
            loading: false,
            refreshing: false,
          });
        }
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false });
      });
  }

  apiReactUpdate() {
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('email', this.state.email);
    formData.append('surname', this.state.surname);
    formData.append('document', this.state.document);
    formData.append('telephone', this.state.telephone);
    formData.append('date_of_birth', this.state.date_of_birth);
    fetch('https://dompixel.dev/api/user/' + this.state.data.id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        if (!result.error && !result.errors) {
          this.setState({
            status: result.error,
            wholeResult: result,
          });
          Alert.alert('Dados atualizados com sucesso!');
          this.bootstrap();
        } else {
          Alert.alert('Erro!', 'Ocorreu um erro');
        }
      })
      .catch(error => { });
  }


  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.inputWrap}>
            <Icon name="user" style={styles.label} color="#7159c1" />
            <TextInput
              style={styles.textInput}
              placeholderTextColor={'#191919'}
              placeholder={'Digite seu nome'}
              spellCheck={false}
              value={this.state.name}
              onChangeText={text => {
                this.setState({
                  name: text,
                });
              }}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.surnameTextInput.focus();
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <Icon name="user" style={styles.label} color="#7159c1" />
            <TextInput
              style={styles.textInput}
              placeholderTextColor={'#191919'}
              placeholder={'Digite seu sobrenome'}
              spellCheck={false}
              value={this.state.surname}
              returnKeyType="next"
              onChangeText={text => {
                this.setState({
                  surname: text,
                });
              }}
              ref={input => {
                this.surnameTextInput = input;
              }}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this._cpfRef.getElement().focus();
              }}
            />
          </View>

          <View style={styles.inputWrap}>
            <Icon name="id-card" style={styles.label} color="#7159c1" />
            <TextInputMask
              type={'cpf'}
              value={this.state.document}
              onChangeText={text => {
                this.setState({
                  document: text,
                });
              }}
              style={styles.textInput}
              placeholderTextColor="#191919"
              placeholder="Digite seu CPF"
              keyboardType="phone-pad"
              returnKeyType="next"
              ref={ref => (this._cpfRef = ref)}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this._dayRef.getElement().focus();
              }}
            />
          </View>

          <View style={styles.inputWrap}>
            <Icon name="birthday-cake" style={styles.label} color="#7159c1" />
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY',
              }}
              value={this.state.date_of_birth}
              onChangeText={text => {
                this.setState({
                  date_of_birth: text,
                });
              }}
              style={styles.textInput}
              placeholderTextColor="#191919"
              placeholder="Digite sua data de nascimento"
              keyboardType="phone-pad"
              returnKeyType="next"
              ref={ref => (this._dayRef = ref)}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.emailTextInput.focus();
              }}
            />
          </View>

          <View style={styles.inputWrap}>
            <Entypo name="email" style={styles.label} color="#7159c1" />
            <TextInput
              onChangeText={text => this.validate(text)}
              value={this.state.email}
              style={styles.textInput}
              placeholderTextColor="#191919"
              placeholder="Digite seu email"
              autoCompleteType="email"
              keyboardType="email-address"
              returnKeyType="next"
              ref={input => {
                this.emailTextInput = input;
              }}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this._phoneRef.getElement().focus();
              }}
              editable={this.props.editable}
            />
          </View>

          <View style={styles.inputWrap}>
            <Icon name="phone" style={styles.label} color="#7159c1" />
            <TextInputMask
              type={'cel-phone'}
              value={this.state.telephone}
              onChangeText={text => {
                this.setState({
                  telephone: text,
                });
              }}
              style={styles.textInput}
              placeholderTextColor="#191919"
              placeholder="Digite seu telefone"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              dataDetectorTypes="phoneNumber"
              returnKeyType="next"
              ref={ref => (this._phoneRef = ref)}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
              onPress={this.apiReactUpdate}>
              <View style={styles.containerButton}>
                <Text style={styles.textButton}>Atualizar dados</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEECE1',
  },
  viewStyleImg: {
    margin: 10,
    width: 200,
    height: 200,
    borderWidth: 3,
    borderRadius: 200 / 2,
    borderColor: '#7159c1',
    backgroundColor: '#EEECE1',
  },
  textInput: {
    backgroundColor: 'transparent',
    borderColor: '#78933F',
    borderWidth: 1,
    flex: 1,
    color: '#000000',
    borderRadius: 5,
  },
  containerButton3: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#7159c1',
    height: 40,
    width: 200,
    borderRadius: 10,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 2,
  },
  sideMenuProfileIcon: {
    width: '100%',
    height: '100%',
    borderRadius: 250 / 2,
  },
  containerButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#7159c1',
    height: 40,
    width: 200,
    borderRadius: 10,
  },
  textInput: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
    flex: 1,
    color: '#000000',
  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
  },
});