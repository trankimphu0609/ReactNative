import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withTranslation} from 'react-i18next';
import AuthContext, {AuthProvider} from '../../context/auth_context';
import callApi from '../../service/api';
const LANGUAGES = [
  {code: 'en_US', label: 'English'},
  {code: 'vi_VN', label: 'Việt Nam'},
];

const URL_company = 'web/dataset/call_kw';
const _newLanguage = {
  params: {
    model: 'res.users',
    method: 'write',
    args: [
      [],
      {
        lang: '',
      },
    ],
    kwargs: {},
    context: {
      tz: 'Asia/Ho_Chi_Minh',
      lang: 'en_US',
    },
  },
};

class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LANGUAGES: LANGUAGES,
      i18n: this.props.i18n,
      selectedLanguageCode: '',
    };
  }
  componentDidMount() {
    console.log('componentdidmount language');
    const {current_language} = this.context;
    this.props.i18n.changeLanguage(current_language);
    this.setState({
      selectedLanguageCode: current_language,
    });
  }

  handlerSearch = text => {
    var newList = [];
    LANGUAGES.map(language => {
      if (language.label.toUpperCase().includes(text.toUpperCase())) {
        newList.push(language);
      } else {
        //
      }
      this.setState({
        LANGUAGES: newList,
      });
    });

    console.log(text);
  };

  setLanguage = code => {
    // update server
    const {token, updateCurrentLanguage, uid} = this.context;
    _newLanguage.params.args[0] = uid;
    _newLanguage.params.args[1].lang = code;
    console.log(_newLanguage.params.args);
    callApi(URL_company, 'POST', _newLanguage, token)
      .then(response => response.data)
      .then(response => {
        console.log(response);
        this.props.i18n.changeLanguage(code);
        this.setState({
          selectedLanguageCode: code,
        });
        updateCurrentLanguage(code);
      });
  };
  render() {
    const {t} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.txtSearch}>
          <Icon style={styles.iconSearch} name="search" />
          <TextInput
            style={styles.textInput}
            placeholder={t('SearchLanguage:title_placeholder')}
            placeholderTextColor="#000000"
            onChangeText={text => this.handlerSearch(text)}
          />
        </View>

        <View style={styles.list}>
          {this.state.LANGUAGES.map(language => {
            const selectedLanguage =
              language.code === this.state.selectedLanguageCode;
            return (
              <TouchableOpacity
                key={language.code}
                style={styles.image_text}
                onPress={() => this.setLanguage(language.code)}>
                <Image
                  style={styles.image}
                  source={{
                    uri:
                      'https://uat.xboss.com/xb_theme/static/src/img/flags/' +
                      language.code +
                      '.png',
                  }}
                />
                {selectedLanguage ? (
                  <Icon name="star" size={25} style={styles.iconStar} />
                ) : null}
                <Text style={styles.text}>{language.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}
Selector.contextType = AuthContext;
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    height: '100%',
  },
  txtSearch: {
    backgroundColor: '#fffff',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#EBEBEB',
    borderWidth: 1,
    width: '100%',
    height: 70,
    borderRadius: 10,
  },
  textInput: {
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000000',
  },
  iconSearch: {
    paddingHorizontal: 15,
    fontSize: 20,
    color: '#000000',
  },
  list: {
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    height: '100%',
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
    borderWidth: 1,
    borderColor: '#dfdfdf',
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  text: {
    margin: 10,
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Arial',
  },
  iconStar: {
    color: '#FFD700',
    position: 'absolute',
    left: 35,
    bottom: 10,
  },
});
export default withTranslation()(Selector);
