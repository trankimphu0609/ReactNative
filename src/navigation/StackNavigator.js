import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchCompany from '../components/company/searchCompany';
import searchLanguage from '../components/language/searchLanguage';
import Profile from '../components/home/profile';
import Login from '../components/authentication/login';
import AuthContext, {AuthProvider} from '../context/auth_context';
import WordProject from '../components/kanban/wordproject';
import WordList from '../components/kanban/wordlist';
import AddTask from '../components/kanban/addtask';
import DetailsTask from '../components/kanban/detailstask';
import scan_qr_code from '../components/authentication/scan_qr_code';
import UpdateAvatar from '../components/home/updateAvatar';
import EditProfile from '../components/home/editProfile';
import SignScreen from '../components/home/signature';
const Stack = createNativeStackNavigator();

class MainStackNavigator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {isAuththentication} = this.context;
    return isAuththentication ? (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#9AC4F8',
          },
          headerTintColor: 'white',
          headerBackTitle: 'Back',
          headerShown: false,
        }}>
        <Stack.Screen
          name="WordProject"
          component={WordProject}
          options={{title: 'Project'}}
        />
        <Stack.Screen
          name="WordList"
          component={WordList}
          options={{title: 'Task'}}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTask}
          options={{title: 'Thêm Task'}}
        />
        <Stack.Screen
          name="DetailsTask"
          component={DetailsTask}
          options={{title: 'Chi Tiết Task'}}
        />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#9AC4F8',
          },
          headerTintColor: 'white',
          headerBackTitle: 'Back',
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Qrcode" component={scan_qr_code} />
      </Stack.Navigator>
    );
  }
}

class ProfileStackNavigator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {isAuththentication} = this.context;
    console.log(isAuththentication);
    return isAuththentication ? (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#9AC4F8',
          },
          headerTintColor: 'white',
          headerBackTitle: 'Back',
          headerShown: false,
        }}>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Company" component={SearchCompany} />
        <Stack.Screen name="Language" component={searchLanguage} />
        <Stack.Screen name="Avatar" component={UpdateAvatar} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="SignScreen" component={SignScreen} />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#9AC4F8',
          },
          headerTintColor: 'white',
          headerBackTitle: 'Back',
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Qrcode" component={scan_qr_code} />
      </Stack.Navigator>
    );
  }
}

MainStackNavigator.contextType = AuthContext;
ProfileStackNavigator.contextType = AuthContext;

export {MainStackNavigator, ProfileStackNavigator};
