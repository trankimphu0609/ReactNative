import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Text_Input from '../text_input';
import Button from '../button';
import axios from 'axios';
import AuthContext, {AuthProvider} from '../../context/auth_context';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.icon = 'eye-slash';
    this.state = {
      check: true,
      emailTextValue: '',
      passwordTextValue: '',
      checkAccount: true,
    };
  }
  loading = async () => {
    const {getInforUser, checkAuth} = this.context;
    axios
      .post('https://uat.xboss.com/web/session/get_session_info', {
        params: {},
      })
      .then(response => response.data.result)
      .then(response => {
        if (response) {
          getInforUser(response);
          checkAuth(true);
          this.setState({checkAccount: true});
        } else {
          // this.setState({checkAccount: false});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  loginUser = (username, password) => {
    axios
      .post('https://uat.xboss.com/web/session/authenticate', {
        db: 'xboss_uat25052021',
        //   longlam@hhdgroup.com
        login: this.state.emailTextValue,
        //   1!@#Qqwe
        password: this.state.passwordTextValue,
      })
      .then(response => response.data.result)
      .then(response => {
        if (response) {
          getInforUser(response);
          checkAuth(true);
          this.setState({checkAccount: true});
        } else {
          this.setState({checkAccount: false});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleLogin = () => {
    const {updateUsername, getInforUser, checkAuth} = this.context;
    const URL_auth = 'https://uat.xboss.com/web/session/authenticate';
    const _login = {
      params: {
        db: 'xboss_uat25052021',
        //   longlam@hhdgroup.com
        login: this.state.emailTextValue,
        //   1!@#Qqwe
        password: this.state.passwordTextValue,
      },
    };
    axios
      .post(URL_auth, _login)
      .then(response => response.data.result)
      .then(response => {
        if (response) {
          getInforUser(response);
          checkAuth(true);
          this.setState({checkAccount: true});
        } else {
          this.setState({checkAccount: false});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  onChangeValueEmail = value => {
    this.setState({
      emailTextValue: value,
    });
  };

  onChangeValuePassword = value => {
    this.setState({
      passwordTextValue: value,
    });
  };

  oncheck = () => {
    this.setState({
      check: !this.state.check,
    });
    this.state.check === false
      ? [(this.icon = 'eye-slash')]
      : [(this.icon = 'eye')];
  };

  render() {
    const {emailTextValue, passwordTextValue, checkAccount} = this.state;
    this.loading();
    return (
      <View style={styles.container}>
        <View style={styles.containerlogo}>
          <Image
            style={styles.namexboss}
            source={{
              uri: 'https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNjh5RkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--e66d7fa5f292ef79dc0db6235f84937e9cae95a3/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--091b576187e678c126e08874e5757891d97541a7/6585826aefb308ed51a2.jpg',
            }}
          />
          <Text style={styles.textlogo}>Welcome Back</Text>
        </View>

        <View style={styles.containerinput}>
          <Text_Input
            direction={'right'}
            placeholder={'Email'}
            nameicon={'user-circle-o'}
            status={'shown'}
            onChangeText={this.onChangeValueEmail}
            value={emailTextValue}
          />
          <Text_Input
            direction={'right'}
            placeholder={'Password'}
            nameicon={this.icon}
            onPress={this.oncheck}
            status={'shown'}
            showPassword={this.state.check}
            onChangeText={this.onChangeValuePassword}
            value={passwordTextValue}
          />
        </View>

        <TouchableOpacity onPress={this.props.onPress}>
          <Text style={styles.textpasswd}>Forgot Password?</Text>
        </TouchableOpacity>
        {!checkAccount ? (
          <Text style={{color: 'red'}}>Email or Password invalid!</Text>
        ) : null}
        <View style={styles.containerbutton}>
          <Button
            sample={'background'}
            direction={'left'}
            backgroundColortouchableOpacity={'#1469B2'}
            colortext={'#FFF'}
            nametext={'Sign In'}
            onPress={this.handleLogin}
          />
          <View style={styles.containerviewbutton}>
            <View style={styles.crossbar}></View>
            <Text color="#EBEBEB">OR</Text>
            <View style={styles.crossbar}></View>
          </View>
          <Button
            sample={'background1'}
            borderColor={'#1469B2'}
            colortext={'#1469B2'}
            nametext={'Scan QR code'}
            onPress={() => {
              this.props.navigation.navigate('Qrcode');
            }}
          />
        </View>
      </View>
    );
  }
}

Login.contextType = AuthContext;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
  },
  containerlogo: {
    marginTop: '20%',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '100%',
    height: 150,
  },
  containerinput: {
    marginTop: '15%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '100%',
    height: 150,
  },
  containerbutton: {
    marginTop: '10%',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  crossbar: {
    height: '2%',
    width: '25%',
    backgroundColor: '#EBEBEB',
    marginHorizontal: '5%',
  },
  containerviewbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '8%',
  },
  namexboss: {
    width: '55%',
    height: '40%',
  },
  textlogo: {
    marginTop: '4%',
    fontSize: 26,
    letterSpacing: 10,
    color: '#404040',
  },
  textpasswd: {
    left: '26%',
  },
});
export default Login;
