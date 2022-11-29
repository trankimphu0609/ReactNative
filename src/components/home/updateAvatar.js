import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import ImgToBase64 from 'react-native-image-base64';
import {withTranslation} from 'react-i18next';

class UpdateAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.t = this.props;
    this.state = {
      fileUri: '',
      uid: '',
    };
  }

  componentDidMount() {
    if (this.props.route.params) {
      this.setState({
        fileUri: this.props.route.params.img64,
        uid: this.props.route.params.uid,
      });
    }
  }

  //lấy hình từ thư viện máy
  openLibrayIMG = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);
      console.log('options = ', options);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        ImgToBase64.getBase64String(response.assets[0].uri)
          .then(base64String => {
            this.setState({
              fileUri: base64String,
            });
          })
          .catch(err => doSomethingWith(err));
      }
    });
  };

  //avatar upload
  renderFileUri() {
    console.log('URI: ' + this.state.fileUri);
    if (this.state.fileUri) {
      return (
        <Image
          style={styles.image}
          source={{uri: `data:image/jpeg;base64,${this.state.fileUri}`}}
        />
      );
    } else {
      return (
        <Image style={styles.image} source={require('./placeholder.png')} />
      );
    }
  }

  //avatar delete
  deleteFileUri = () => {
    if (this.state.fileUri) {
      const {t} = this.props;
      Alert.alert(t('UpdateAvatar:alert'), t('UpdateAvatar:msg'), [
        {
          text: t('UpdateAvatar:cancel'),
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: t('UpdateAvatar:ok'),
          onPress: () =>
            this.setState({
              fileUri: '',
            }),
        },
      ]);
      console.log('avatar deleted');
    } else {
      alert('Image does not exist!');
      console.log('not exist');
    }
  };

  // avatar button accept
  acceptFileUri = () => {
    let uri_img = '';
    if (this.state.fileUri != '') {
      uri_img = this.state.fileUri;
    } else {
      uri_img = '';
    }
    const _newAvatar = {
      params: {
        model: 'res.users',
        method: 'write',
        args: [
          [this.state.uid],
          {
            image: uri_img,
          },
        ],
        kwargs: {},
        context: {
          tz: 'Asia/Ho_Chi_Minh',
          lang: 'vi_VN',
        },
      },
    };
    axios
      .post('https://uat.xboss.com/web/dataset/call_kw', _newAvatar)
      .then(res => {
        // console.log(uri_img);
        this.props.route.params.updateIMG(uri_img);
      })
      .catch(error => console.log(error));
  };

  // avatar button cancel
  cancelFileUri = () => {
    this.props.navigation.navigate('Profile');
  };
  render() {
    const {t} = this.props;
    return (
      <View style={styles.container}>
        {this.renderFileUri()}
        <TouchableOpacity onPress={this.openLibrayIMG}>
          <Icon
            onPress={this.openLibrayIMG}
            style={styles.iconUpload}
            name="upload"
            size={40}
            color={'#696969'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={this.deleteFileUri}>
          <Icon
            onPress={this.deleteFileUri}
            style={styles.iconDelete}
            name="delete"
            size={40}
            color={'#696969'}
          />
        </TouchableOpacity>

        {/* bấm accept thì hình avatar mới đổi sẽ được upload lại trong 
        profile.js, còn cancel thì trả về file profile.js ko đổi hình avatar */}

        <View style={styles.accept_cancel}>
          <TouchableOpacity onPress={this.acceptFileUri}>
            <Text style={styles.txtSelect}>{t('UpdateAvatar:accept')}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.cancelFileUri}>
            <Text style={styles.txtSelect}>{t('UpdateAvatar:back')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFF',
  },
  image: {
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 3,
    borderColor: '#ADD8E6',
    width: 250,
    height: 250,
    borderRadius: 150,
  },
  iconUpload: {
    textAlign: 'center',
    position: 'absolute',
    left: 110,
    bottom: 5,
    borderColor: '#1C75BC',
    backgroundColor: '#1C75BC',
    borderWidth: 3,
    color: '#FFFFFF',
    borderRadius: 100,
  },
  iconDelete: {
    textAlign: 'center',
    position: 'absolute',
    right: 110,
    bottom: 5,
    borderColor: '#1C75BC',
    backgroundColor: '#1C75BC',
    borderWidth: 3,
    color: '#FFFFFF',
    borderRadius: 100,
  },
  accept_cancel: {
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtSelect: {
    fontSize: 20,
    color: '#ffffff',
    backgroundColor: '#1C75BC',
    padding: 18,
    borderRadius: 10,
    width: 140,
    textAlign: 'center',
  },
});
export default withTranslation()(UpdateAvatar);
