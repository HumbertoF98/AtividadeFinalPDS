import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Text,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from 'react-native-dotenv';

export default class maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      complaint: '',
      user_token: '',
    };
    this.bootstrap();
    this.handlePress = this.handlePress.bind(this);
    this.apiReact = this.apiReact.bind(this);
  }

  bootstrap = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({ user_token: userToken });
  };

  handlePress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: e.nativeEvent.position.x + e.nativeEvent.position.y,
        },
      ],
    });
  }

  apiReact() {
    const baseUrl = BASE_URL;

    fetch(baseUrl + '/pds', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.state.user_token,
      },
      body: JSON.stringify({
        markers: this.state.markers,
        complaint: this.state.complaint,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (!result.error && !result.errors) {
          Alert.alert('Sucesso!', JSON.stringify(result.data.message));
        } else {
          Alert.alert('Erro!', JSON.stringify(result.data.errors));
        }
      })
      .catch(error => {
        Alert.alert('Ocorreu um erro', error.toString());
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.container}
          initialRegion={{
            latitude: -15.6426032,
            longitude: -56.0966032,
            latitudeDelta: 0.025,
            longitudeDelta: 0.0,
          }}
          onPress={this.handlePress}>
          {this.state.markers.map(marker => {
            return (
              <Marker key={marker.key} {...marker}>
                <View style={styles.marker}>
                  <Text style={styles.text}>{marker.cost}</Text>
                </View>
              </Marker>
            );
          })}
        </MapView>

        <View>
          <Text style={styles.title}>Conte-nos o que está acontecendo</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: '#7159c1', margin: 5 }}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={255}
            value={this.state.complaint}
            onChangeText={text => {
              this.setState({
                complaint: text,
              });
            }}
          />
          <TouchableOpacity onPress={this.apiReact}>
            <View style={styles.containerButton}>
              <Text style={styles.textButton}>Enviar denúncia</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    marginBottom: 30,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#7159c1',
    height: 40,
    width: 250,
    borderRadius: 8,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  marker: {
    backgroundColor: 'red',
    borderRadius: 100,
    paddingLeft: 5,
    paddingRight: 15,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    marginLeft: 10,
    marginTop: 10,
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

AppRegistry.registerComponent('maps', () => maps);
