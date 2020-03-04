import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.state = {
      cover: '',
      imageTmp: {
        uri:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9GbK0U8Vvnn-0BbU8L0RZcvrAH695y8bo0DpuvKF4A2KX_3zK',
      },
    };
    this.toggleDrawer.bind(this);
    this.bootstrap();
    this.apiReact = this.apiReact.bind(this);
    this.items = [
      {
        navOptionThumb: 'home',
        navOptionName: 'Página Inicial',
        screenToNavigate: 'Home',
      },
      {
        navOptionThumb: 'user',
        navOptionName: 'Perfil',
        screenToNavigate: 'Profile',
      },
      {
        navOptionThumb: 'log-out',
        navOptionName: 'Sair',
        screenToNavigate: 'Logout',
      },
    ];
  }

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
        this.setState({
          data: res,
          cover: res.cover,
          error: res.error || null,
          loading: false,
          refreshing: false,
        });
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false });
      });
  }
  toggleDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.closeButton}>
          <Icon.Button
            onPress={this.toggleDrawer}
            backgroundColor="#008080"
            name="x"
            size={25}
            color={'white'}
          />
        </View>
        <View style={styles.sideMenuContainer}>
          <Image ></Image>
          <View style={styles.sidebarImage} />

          <View style={styles.container2}>
            {this.items.map((item, key) => (
              <TouchableOpacity
                onPress={
                  item.screenToNavigate
                    ? () => {
                      global.currentScreenIndex = key;
                      this.props.navigation.navigate(item.screenToNavigate);
                    }
                    : () => {
                      this.facebookShare();
                    }
                }
                key={key}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 20,
                    paddingTop: 15,
                    paddingBottom: 5,
                    backgroundColor:
                      global.currentScreenIndex === key
                        ? 'transparent'
                        : '#008080',
                  }}
                  key={key}>
                  <View style={styles.containerIcon}>
                    <Icon
                      name={item.navOptionThumb}
                      style={{
                        fontSize: 30,
                        color:
                          this.props.activeItemKey === item.screenToNavigate
                            ? '#C3D89C'
                            : 'white',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      color:
                        this.props.activeItemKey === item.screenToNavigate
                          ? '#C3D89C'
                          : 'white',
                    }}>
                    {item.navOptionName}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  //StyleSheet for MenuBar
  container: {
    backgroundColor: '#008080',
  },
  sideMenuContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#008080',
    paddingTop: 5,
    alignItems: 'center',
  },
  closeButton: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#008080',
    alignItems: 'flex-end',
  },
  sideMenuProfileIcon: {
    resizeMode: 'cover',
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 250 / 2,
  },
  imageButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  imageBtnImage: {
    width: 40,
    height: 40,
    marginBottom: 15,
  },
  sidebarImage: {
    width: '100%',
    height: 1,
    backgroundColor: '#008080',
  },
  container2: {
    width: '100%',
  },
  containerIcon: {
    marginRight: 10,
    marginLeft: 20,
  },
});