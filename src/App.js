import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import AuthContext, {AuthProvider} from './context/auth_context';
import IMLocation from '../src/service/IMLocalize';
import {MenuProvider} from 'react-native-popup-menu';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AuthProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </AuthProvider>
    );
  }
}

export default App;
