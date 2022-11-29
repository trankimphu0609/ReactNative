import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      isAuththentication: false,
      uid: '',
      username: '',
      email: '',
      current_company: [],
      allowed_companies: [],
      current_language: '',
    };
  }

  getToken = token => {
    this.setState({
      token: token,
    });
  };

  getInforUser = data => {
    this.setState({
      uid: data.uid,
      username: data.name,
      email: data.username,
      isAuththentication: true,
      current_company: data.user_companies.current_company,
      allowed_companies: data.user_companies.allowed_companies,
      current_language: data.user_context.lang,
    });
  };

  storeUser = async data => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  getUser = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem('userData'));
      return userData;
    } catch (error) {
      console.log(error);
    }
  };

  removeData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  updateUsername = username => {
    this.setState({
      username: username,
    });
  };

  updateEmail = email => {
    this.setState({
      email: email,
    });
  };

  updateCurrentLanguage = current_language => {
    this.setState({
      current_language: current_language,
    });
  };

  updateCurrentCompany = current_company => {
    this.setState({
      current_company: current_company,
    });
  };

  updateAllowedCompany = allowed_companies => {
    this.setState({
      allowed_companies: allowed_companies,
    });
  };

  updateAllowedCompany = allowed_companies => {
    this.setState({
      allowed_companies: allowed_companies,
    });
  };

  checkAuth = boolean => {
    this.setState({
      isAuththentication: boolean,
    });
  };

  render() {
    const {
      uid,
      username,
      email,
      isAuththentication,
      current_company,
      current_language,
      allowed_companies,
      token,
    } = this.state;
    const {
      updateUsername,
      updateEmail,
      updateAllowedCompany,
      updateCurrentCompany,
      updateCurrentLanguage,
      checkAuth,
      getInforUser,
      getToken,
    } = this;
    return (
      <AuthContext.Provider
        value={{
          token,
          uid,
          username,
          email,
          isAuththentication,
          current_company,
          current_language,
          allowed_companies,
          updateUsername,
          updateAllowedCompany,
          updateCurrentCompany,
          updateCurrentLanguage,
          updateEmail,
          checkAuth,
          getInforUser,
          getToken,
        }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;
