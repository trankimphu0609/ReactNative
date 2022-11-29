import {createDrawerNavigator} from '@react-navigation/drawer';

import React from 'react';
import AuthContext from '../context/auth_context';
import BottomTabNavigator from './BottomTabNavigator';
import {MainStackNavigator} from './StackNavigator';
import MyDrawer from '../navigation/component/drawer';

import axios from 'axios';
const Drawer = createDrawerNavigator();

class DrawerNavigator extends React.Component {
  render() {
    const {isAuththentication} = this.context;
    return isAuththentication ? (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
        }}
        drawerContent={props => <MyDrawer {...props} />}>
        <Drawer.Screen name="MainHome" component={BottomTabNavigator} />
        <Drawer.Screen name="Project" component={MainStackNavigator} />
      </Drawer.Navigator>
    ) : (
      <MainStackNavigator />
    );
  }
}

DrawerNavigator.contextType = AuthContext;

export default DrawerNavigator;
