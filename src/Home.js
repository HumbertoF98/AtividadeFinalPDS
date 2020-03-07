import MapView from 'react-native-maps';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default class MapInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
    };
    this.LatLng = {
      latitude: -15.584651,
      longitude: -56.080672,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: -15.6426032,
            longitude: -56.0966032,
            latitudeDelta: 0.025,
            longitudeDelta: 0.0,
          }}
          style={styles.map}>
          <MapView.Marker
            coordinate={{
              latitude: -15.6311032,
              longitude: -56.0966032,
            }}
            title={'Univag - Cristo Rei'}
            description={'Arduino Day'}
          />
        </MapView>
        <View>
          <Text style={styles.title}>Conte-nos o que está acontecendo</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={255}
            value={this.state.question}
            onChangeText={text => {
              this.setState({
                question: text,
              });
            }}
          />
          <TouchableOpacity>
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
    height: '80%',
    flex: 1,
    backgroundColor: '#EEECE1',
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  map: {
    flex: 1,
    margin: 10,
  },
  title: {
    fontSize: 17,
    marginLeft: 10,
    marginTop: 10,
  },
  containerText: {
    margin: 10,
  },
  containerButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: '#7159c1',
    height: 40,
    width: 250,
    borderRadius: 8,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});