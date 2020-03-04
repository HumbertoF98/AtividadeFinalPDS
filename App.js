import React from 'react';
import { View, Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Register from './src/auth/Register';
import Home from './src/Home';
import Profile from './src/Profile';
import CustomSidebarMenu from './src/CustomSidebarMenu';
import Login from './src/auth/Login';
import AuthLoadingScreen from './src/auth/AuthLoadingScreen';
import WelcomeScreen from './src/WelcomeScreen';
import Logout from './src/auth/Logout';
import Icon from 'react-native-vector-icons/AntDesign';

class NavigationDrawerStructure extends React.Component {
  toggleDrawer() {
    this.props.navigationProps.toggleDrawer();
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Icon.Button
          onPress={this.toggleDrawer.bind(this)}
          backgroundColor="#008080"
          name="bars"
          size={25}
          color={'white'}
        />
      </View>
    );
  }
}

const FirstActivity_StackNavigator = createStackNavigator(
  {
    First: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: 'DENUNCIAS CUIABÁ',
        headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#008080',
        },
        headerTintColor: '#fff',
      }),
    }
  });

const Profile_StackNavigator = createStackNavigator(
  {
    Six: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        title: 'DENUNCIAS CUIABÁ',
        headerTitleAlign: 'center',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#008080',
        },
        headerTintColor: '#fff',
      }),
    },
  },
);

const Login_StackNavigator = createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'DENUNCIAS CUIABÁ',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#7159C1',
        },
        headerTintColor: '#fff',
      }),
    },
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        title: 'DENUNCIAS CUIABÁ',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#fff',
      }),
    },
    Register: {
      screen: Register,
      navigationOptions: ({ navigation }) => ({
        title: 'DENUNCIAS CUIABÁ',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#fff',
      }),
    },
  },
  {
    initialRouteName: 'WelcomeScreen',
  },
);

const Logout_StackNavigator = createStackNavigator(
  {
    AB: {
      screen: Logout,
      navigationOptions: ({ navigation }) => ({
        title: 'Sair',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#fff',
      }),
    },
  },
);

const AppNavigator = createDrawerNavigator(
  {
    Home: {
      screen: FirstActivity_StackNavigator,
    },
    Profile: {
      screen: Profile_StackNavigator,
    },
    Logout: {
      screen: Logout_StackNavigator,
    },
  },
  {
    contentComponent: CustomSidebarMenu,
    drawerWidth: Dimensions.get('window').width - 140,
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppNavigator,
      Auth: Login_StackNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
