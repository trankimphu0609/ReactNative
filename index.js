/**
 * @format
 */
// import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Login from './src/components/authentication/login';
AppRegistry.registerComponent(appName, () => App);
