import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import callApi from '../../service/api';
import AuthContext, {AuthProvider} from '../../context/auth_context';
import {withTranslation} from 'react-i18next';
// thay doi
const URL_company = 'web/dataset/call_kw';
const _newCompany = {
  params: {
    model: 'res.users',
    method: 'write',
    args: [
      [],
      {
        company_id: '',
      },
    ],
    kwargs: {},
    context: {
      tz: 'Asia/Ho_Chi_Minh',
      lang: 'vi_VN',
    },
  },
};

class SearchCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listCompany: [],
      searchCompany: [],
      current_company: '',
      userID: '',
      search_company: [],
    };
  }

  componentDidMount() {
    console.log('componentdidmount searchcompany');
    this.getListCompany();
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentwillupdate searchcompany');
  }

  updateCompany = company => {
    const {token, updateCurrentCompany} = this.context;
    _newCompany.params.args[0] = this.state.userID;
    _newCompany.params.args[1].company_id = company[0];
    callApi(URL_company, 'POST', _newCompany, token)
      .then(response => response.data)
      .then(response => {
        console.log(response);
        this.setState({
          current_company: company,
        });
        updateCurrentCompany(company);
        this.props.route.params.updateCompany(company);
      });
  };

  getListCompany = () => {
    if (this.props.route.params) {
      this.setState({
        listCompany: this.props.route.params.allowed_companies,
        searchCompany: this.props.route.params.allowed_companies,
        current_company: this.props.route.params.current_company,
        userID: this.props.route.params.uid,
      });
    }
  };

  handlerSearch = text => {
    var newList = [];
    this.state.listCompany.map(company => {
      if (company[1].toUpperCase().includes(text.toUpperCase())) {
        newList.push(company);
      } else {
        // console.log('false');
      }
    });
    this.setState({
      searchCompany: newList,
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
            placeholder={t('SearchCompany:title_placeholder')}
            placeholderTextColor="#000000"
            onChangeText={text => this.handlerSearch(text)}
          />
        </View>

        <View style={styles.list}>
          {this.state.searchCompany.map(company => {
            return (
              <TouchableOpacity
                style={styles.image_text}
                onPress={() => this.updateCompany(company)}>
                <Image
                  style={styles.image}
                  source={{
                    uri:
                      'https://uat.xboss.com/web/image/res.company/' +
                      company[0] +
                      '/logo/50x50',
                  }}
                />
                {this.state.current_company[0] == company[0] && (
                  <Icon name="star" size={25} style={styles.iconStar} />
                )}
                <Text numberOfLines={1} style={styles.text}>
                  {company[1]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

SearchCompany.contextType = AuthContext;

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
    color: '#000000',
    fontSize: 16,
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
export default withTranslation()(SearchCompany);
