import React, {Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {CameraScreen} from 'react-native-camera-kit';
import Torch from 'react-native-torch';
import * as ImagePicker from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import callApi from '../../service/api';
import AuthContext, {AuthProvider} from '../../context/auth_context';
import {withTranslation} from 'react-i18next';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  Linking,
} from 'react-native';

const URL_token = 'web/session/authenticate_by_token';
const _params_login = {
  params: {
    login: '',
    dbname: '',
    token: '',
  },
};

class ScanQRCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qr_value: '',
      open_scanner: false,
      isTorchOn: false,
      fileName: '',
      fileUri: '',
    };
  }
  backAction = () => {
    this.props.navigation.navigate('Login');
  };

  componentDidMount() {}

  authByToken = QR_Code => {
    const {checkAuth, getInforUser, getToken} = this.context;
    var login_data = '';
    try {
      login_data = JSON.parse(QR_Code);
    } catch (error) {}
    this.setState({qr_value: QR_Code});
    this.setState({open_scanner: false});
    _params_login.params.login = login_data.username;
    _params_login.params.dbname = login_data.dbname;
    _params_login.params.token = login_data.access_token;

    callApi(URL_token, 'POST', _params_login)
      .then(response => response.data.result)
      .then(response => {
        console.log('login qr session');
        if (
          typeof response !== 'undefined' &&
          response.session_id !== 'undefined'
        ) {
          getToken(login_data.access_token);
          getInforUser(response);
          checkAuth(true);
        } else {
          // alert('QR không hợp lệ');
        }
      });
  };

  turnFlashMode = () => {
    this.state.isTorchOn = !this.state.isTorchOn;
    Torch.switchState(this.state.isTorchOn);
  };

  openLibrayIMG = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        RNQRGenerator.detect({
          uri: response.assets[0].uri,
        })
          .then(data => {
            const {checkAuth, getInforUser, getToken} = this.context;
            try {
              _params_login.params.login = data.values[0].username;
              _params_login.params.dbname = data.values[0].dbname;
              _params_login.params.token = data.values[0].access_token;
              callApi(URL_token, 'POST', _params_login)
                .then(response => response.data.result)
                .then(response => {
                  console.log(response);
                  if (typeof response !== 'undefined') {
                    getToken(login_data.access_token);
                    getInforUser(response);
                    checkAuth(true);
                  } else {
                    // alert('QR không hợp lệ');
                  }
                });
            } catch (error) {
              alert('QR không hợp lệ');
            }
          })
          .catch(error => alert('lỗi:' + error + response.uri));
      }
    });
  };

  open_camera = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera App Permission',
          message: 'App needs access to your camera',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({qr_value: ''});
        this.setState({open_scanner: true});
      } else {
        this.setState({open_scanner: false});
        alert('CAMERA Permission Denied');
      }
    } else {
      this.setState({qr_value: ''});
      this.setState({open_scanner: true});
    }
  };

  render() {
    const {t} = this.props;
    return (
      <View style={styles.container}>
        <CameraScreen
          showFrame={true}
          scanBarcode={true}
          laserColor={'#3ec3f7'}
          frameColor={'#f5e828'}
          colorForScannerFrame={'#28b0f5'}
          onReadCode={event =>
            this.authByToken(event.nativeEvent.codeStringValue)
          }
          style={styles.screen}></CameraScreen>

        <TouchableOpacity style={styles.buttonBack} onPress={this.backAction}>
          <AntDesign name="arrowleft" size={30} style={{color: '#FFF'}} />
        </TouchableOpacity>
        <View style={styles.labelQR_text}>
          <Text style={{color: '#FFF', fontSize: 14}}>
            {t('ScreenQR:title')}
          </Text>
          <View style={styles.options}>
            <TouchableOpacity
              onPress={this.turnFlashMode}
              style={styles.buttonOps}>
              <Entypo name="flash" size={20} style={{color: '#FFF'}} />
              <Text style={styles.textOps}>
                {this.state.isTorchOn
                  ? t('ScreenQR:onflash')
                  : t('ScreenQR:onflash')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.openLibrayIMG}
              style={styles.buttonOps}>
              <Entypo name="image-inverted" size={20} style={{color: '#FFF'}} />
              <Text style={styles.textOps}>{t('ScreenQR:image')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

ScanQRCode.contextType = AuthContext;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    // alignItems: 'center',
  },
  button: {
    backgroundColor: '#2979FF',
    alignItems: 'center',
    padding: 12,
    width: 200,
    marginTop: 14,
  },
  options: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 350,
  },
  buttonOps: {
    flexDirection: 'row',
    padding: 5,
    margin: 30,
    alignItems: 'center',
  },
  textOps: {
    color: '#FFF',
    fontSize: 14,
    paddingLeft: 5,
  },
  labelQR_text: {
    position: 'absolute',
    color: 'white',
    width: '100%',
    alignItems: 'center',
    top: 200,
  },
  screen: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
  },
  buttonBack: {
    height: 30,
    width: 50,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  QR_text: {
    color: '#fff',
    fontSize: 19,
    padding: 8,
    marginTop: 12,
  },
});
export default withTranslation()(ScanQRCode);
