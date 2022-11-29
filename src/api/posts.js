import React from 'react';
import axios from 'axios';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const URL_auth = 'https://uat.xboss.com/web/session/authenticate';
const URL_company = 'https://uat.xboss.com/web/dataset/call_kw';
const _login = {
  params: {
    db: 'xboss_uat25052021',
    login: 'longlam@hhdgroup.com',
    password: '1!@#Qqwe',
  },
};

const _listCompany = {
  params: {
    model: 'res.company',
    method: 'search_read',
    args: [[], ['name'], 0, 0, ''],
    kwargs: {},
    context: {
      tz: 'Asia/Ho_Chi_Minh',
      lang: 'en_US',
    },
  },
};

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      listCompany: [],
      submit: false,
      loadData: false,
    };
  }

  // chạy khi mở ứng dụng
  componentDidMount() {}

  loginUser = () => {
    axios
      .post(URL_auth, _login)
      .then(response => response.data)
      .then(data => {
        this.setState({
          user: data,
          submit: true,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  getListCompany = () => {
    axios
      .post(URL_company, _listCompany)
      .then(response => response.data)
      .then(response => {
        this.setState({
          listCompany: response,
          loadData: true,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    console.log(this.state.user);
    console.log('\n');
    console.log(this.state.listCompany);
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'white'}}>Information</Text>
        {this.state.submit ? (
          <TouchableOpacity onPress={this.getListCompany} style={styles.button}>
            <Text style={{color: '#FFF', fontSize: 14}}>
              Lấy thông tin công ty
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.loginUser} style={styles.button}>
            <Text style={{color: '#FFF', fontSize: 14}}>Đăng nhập</Text>
          </TouchableOpacity>
        )}

        {this.state.loadData &&
          this.state.listCompany.result.map(data => {
            return (
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'white'}}>{data.id + ' - '}</Text>
                <Text style={{color: 'white'}}>{data.name}</Text>
              </View>
            );
          })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2979FF',
    alignItems: 'center',
    padding: 12,
    width: 200,
    marginTop: 14,
  },
});

export default UserInfo;