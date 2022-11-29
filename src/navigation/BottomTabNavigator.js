import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {MainStackNavigator, ProfileStackNavigator} from './StackNavigator';
import Home from '../screens/home';
import Icon from 'react-native-vector-icons/FontAwesome';
import {color} from 'react-native-reanimated';
import {withTranslation} from 'react-i18next';
const Tab = createBottomTabNavigator();

class BottomTabNavigator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {t} = this.props;
    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name={t('BottomTabs:home')}
          component={Home}
          options={{
            tabBarIcon: tabInfo => (
              <Icon
                name={'home'}
                color={tabInfo.focused ? '#2596be' : '#8e8e93'}
                size={28}
              />
            ),
            tabBarActiveTintColor: '#2596be',
            tabBarInactiveTintColor: '#8e8e93',
          }}
        />
        <Tab.Screen
          name={t('BottomTabs:profile')}
          component={ProfileStackNavigator}
          options={{
            tabBarIcon: tabInfo => (
              <Icon
                name={'user'}
                color={tabInfo.focused ? '#2596be' : '#8e8e93'}
                size={28}
              />
            ),
            tabBarActiveTintColor: '#2596be',
            tabBarInactiveTintColor: '#8e8e93',
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default withTranslation()(BottomTabNavigator);
