import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {withTranslation} from 'react-i18next';
class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      username: '',
      signature: '',
    };
  }
  componentDidMount() {
    if (this.props.route.params) {
      this.setState({
        username: this.props.route.params.username,
        uid: this.props.route.params.uid,
        signature: this.props.route.params.signature,
      });
    }
  }
  cancel = () => {
    this.props.navigation.navigate('Profile');
  };
  sign = () => {};

  updateSignature = signature => {
    console.log('update sign');
    this.setState({signature: signature});
  };

  acceptInfor = () => {
    const _newUsername = {
      params: {
        model: 'res.users',
        method: 'write',
        args: [
          [this.state.uid],
          {
            name: this.state.username,
          },
        ],
        kwargs: {},
        context: {
          tz: 'Asia/Ho_Chi_Minh',
          lang: 'en_US',
        },
      },
    };
    const _newSignature = {
      params: {
        model: 'res.users',
        method: 'write',
        args: [
          [this.state.uid],
          {
            sign_signature: this.state.signature,
          },
        ],
        kwargs: {},
        context: {
          tz: 'Asia/Ho_Chi_Minh',
          lang: 'en_US',
        },
      },
    };
    axios
      .post('https://uat.xboss.com/web/dataset/call_kw', _newUsername)
      .then(res => {
        if (res) this.props.route.params.updateUsername(this.state.username);
      })
      .catch(error => console.log(error));
    axios
      .post('https://uat.xboss.com/web/dataset/call_kw', _newSignature)
      .then(res => {
        if (res) this.props.route.params.updateSign(this.state.signature);
      })
      .catch(error => console.log(error));
  };

  render() {
    const {t} = this.props;
    return (
      <View style={styles.containment}>
        <View style={styles.editEmail}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: 'gray',
              top: 10,
              left: 10,
            }}>
            {t('EditProfile:title_username')}
          </Text>

          <TouchableOpacity style={styles.email}>
            <Text style={{fontSize: 16, color: 'gray', left: 10}}>
              {t('EditProfile:label_username')} :
            </Text>
            <View>
              <TextInput
                placeholder={this.props.route.params.username}
                placeholderTextColor="#000"
                autoFocus={true}
                style={styles.textInput}
                onChangeText={text => {
                  this.setState({username: text});
                }}></TextInput>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.signature}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: 'gray',
              top: 10,
              left: 10,
            }}>
            {t('EditProfile:label_signature')}
          </Text>
          <View
            style={{
              color: 'gray',
              top: 30,
              backgroundColor: '#ffffff',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => {
                this.props.navigation.navigate('SignScreen', {
                  updateSignature: this.updateSignature,
                });
              }}>
              <Icon name="edit" size={25} color={'gray'}></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.editSignature}>
            <Image
              resizeMode={'contain'}
              style={{width: '100%', height: '100%'}}
              source={{uri: `data:image/jpeg;base64,${this.state.signature}`}}
            />
          </View>
        </View>
        <View style={styles.accept_cancel}>
          <TouchableOpacity onPress={this.acceptInfor}>
            <Text style={styles.txtSelect}>{t('EditProfile:accept')}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.cancel}>
            <Text style={styles.txtSelect}>{t('EditProfile:back')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containment: {
    flexDirection: 'column',
    backgroundColor: '#dfdfdf',
    height: '100%',
  },
  hours: {
    top: 30,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
  },
  password: {
    top: 40,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
  },
  editEmail: {
    top: 10,
  },
  announce: {
    top: 30,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
  },
  email: {
    top: 30,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
  },
  signature: {
    top: 50,
  },
  editSignature: {
    top: 30,
    backgroundColor: '#fff',
    height: 400,
    paddingVertical: 10,
  },
  textInput: {
    backgroundColor: '#fff',
    left: 50,
    color: '#000000',
    fontSize: 16,
    width: 200,
  },
  accept_cancel: {
    marginTop: 100,
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

export default withTranslation()(EditProfile);
