import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ItemFunction from '../setting/item_function';
import callApi from '../../service/api';
import {withTranslation} from 'react-i18next';
import AuthContext, {AuthProvider} from '../../context/auth_context';
import ImgToBase64 from 'react-native-image-base64';
import Img from './placeholder.png';
const default_img = Image.resolveAssetSource(Img).uri;
const URL_session = 'web/session/destroy';
const _params_logout = {
  params: {},
};

const URL_data = 'web/dataset/call_kw';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      email: '',
      username: '',
      current_company: [],
      allowed_companies: [],
      img64: '',
      signature: '',
    };
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('componentwillupdate profile');
  }

  componentDidMount() {
    console.log('componentdidmount profile');
    const {
      token,
      uid,
      username,
      email,
      current_company,
      current_language,
      allowed_companies,
    } = this.context;

    this.setState({
      uid: uid,
      username: username,
      email: email,
      current_company: current_company,
      allowed_companies: allowed_companies,
    });
    this.getImg(uid, token);
    this.getSignature(uid, token);
    // thiet lap ngon ngu khi load ung dung
    this.props.i18n.changeLanguage(current_language);
  }

  defaultIMG = () => {
    ImgToBase64.getBase64String(default_img)
      .then(base64String => {
        this.setState({
          img64: base64String,
        });
      })
      .catch(err => doSomethingWith(err));
  };

  updateCompany = company => {
    console.log(company);
    this.setState({current_company: company});
  };

  updateIMG = img64 => {
    console.log('updateIMG64');
    if (img64 != '') this.setState({img64: img64});
    else this.defaultIMG();
  };

  updateUsername = username => {
    this.setState({username: username});
  };
  updateSign = signature => {
    this.setState({signature: signature});
  };

  getImg = (uid, token) => {
    const _params_img = {
      params: {
        model: 'res.users',
        method: 'search_read',
        args: [[['id', '=', uid]], ['image'], 0, 0, ''],
        kwargs: {},
        context: {
          tz: 'Asia/Ho_Chi_Minh',
          lang: 'vi_VN',
        },
      },
    };

    callApi(URL_data, 'POST', _params_img, token)
      .then(response => response.data.result)
      .then(response => {
        if (!response[0].image) {
          this.defaultIMG();
        } else {
          this.setState({
            img64: response[0].image,
          });
        }
      });
  };

  getSignature = (uid, token) => {
    const _params_sign = {
      params: {
        model: 'res.users',
        method: 'search_read',
        args: [[['id', '=', uid]], ['sign_signature'], 0, 0, ''],
        kwargs: {},
        context: {
          tz: 'Asia/Ho_Chi_Minh',
          lang: 'vi_VN',
        },
      },
    };
    callApi(URL_data, 'POST', _params_sign, token)
      .then(response => response.data.result)
      .then(response => {
        this.setState({
          signature: response[0].sign_signature,
        });
      });
  };

  logOut = () => {
    const {checkAuth} = this.context;
    callApi(URL_session, 'POST', _params_logout).then(response => {
      console.log(response.data);
      checkAuth(false);
    });
  };

  render() {
    const {t} = this.props;
    const {token} = this.context;

    return (
      <View style={styles.container}>
        <Image
          source={require('./BG.png')}
          style={{
            position: 'absolute',
            top: -100,
            right: 0,
            left: 0,
            width: '100%',
          }}
        />

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EditProfile', {
                uid: this.state.uid,
                username: this.state.username,
                signature: this.state.signature,
                updateUsername: this.updateUsername,
                updateSign: this.updateSign,
              })
            }>
            <Icon
              name="setting"
              size={25}
              color={'#fff'}
              style={{paddingRight: 20}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 70,
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 60,
              marginHorizontal: 20,
              borderWidth: 2,
              borderColor: '#ffffff',
            }}
            onPress={() =>
              this.props.navigation.navigate('Avatar', {
                uid: this.state.uid,
                img64: this.state.img64,
                updateIMG: this.updateIMG,
              })
            }>
            <Image
              source={{uri: `data:image/jpeg;base64,${this.state.img64}`}}
              style={{
                width: 60,
                height: 60,
                borderRadius: 60,
              }}
            />
          </TouchableOpacity>

          <View style={{flexDirection: 'column'}}>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: '500'}}>
              {this.state.username}
            </Text>
            <Text style={{color: '#fff'}}>{this.state.email}</Text>
          </View>
        </View>
        {this.state.allowed_companies.map((company, index) => {
          if (this.state.current_company[0] == company[0]) {
            return (
              <TouchableOpacity
                key={index}
                style={styles.image_text}
                onPress={() => {
                  this.props.navigation.navigate('Company', {
                    allowed_companies: this.state.allowed_companies,
                    current_company: this.state.current_company,
                    uid: this.state.uid,
                    updateCompany: this.updateCompany,
                  });
                }}>
                <Image
                  style={styles.image}
                  source={{
                    uri:
                      'https://uat.xboss.com/web/image/res.company/' +
                      this.state.current_company[0] +
                      '/logo/40x40',
                    headers: {
                      authorization: `Bearer ${token}`,
                    },
                  }}
                />
                <Text numberOfLines={1} style={styles.text}>
                  {this.state.current_company[1]}
                </Text>
                <Icon name="right" size={25} color={'#000'} />
              </TouchableOpacity>
            );
          }
        })}
        <TouchableOpacity
          style={styles.image_text}
          onPress={() => {
            this.props.navigation.navigate('Language');
          }}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://uat.xboss.com/xb_theme/static/src/img/flags/' +
                this.props.i18n.language +
                '.png',
            }}
          />
          <Text numberOfLines={1} style={styles.text}>
            {t('Profile:lang')}
          </Text>
          <Icon name="right" size={25} color={'#000'} />
        </TouchableOpacity>
        <View style={{marginVertical: 20}}>
          <ItemFunction
            onPress={() => this.logOut()}
            icon={'logout'}
            color={'#f00'}
            name={t('Profile:logout')}
            colorText={'#f00'}
          />
        </View>
      </View>
    );
  }
}
Profile.contextType = AuthContext;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#dfdfdf',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 35,
    justifyContent: 'flex-end',
  },
  image_text: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    color: '#000',
    maxWidth: 300,
    width: 300,
  },
  icon: {},
});

export default withTranslation()(Profile);
