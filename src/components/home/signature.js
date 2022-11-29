import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import ImgToBase64 from 'react-native-image-base64';
import {withTranslation} from 'react-i18next';
class SignScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signature: '',
    };
  }

  handleOK = signature => {
    var sign = signature.replace('data:image/jpeg;base64,', '');
    this.setState({signature: sign});
    this.props.route.params.updateSignature(sign);
    this.props.navigation.goBack(null);
  };

  handleEmpty = () => {
    console.log('Empty');
  };

  render() {
    const {t} = this.props;
    return (
      <View style={styles.container}>
        <SignatureScreen
          onOK={this.handleOK}
          onEmpty={this.handleEmpty}
          backgroundColor="#fff"
          imageType="image/jpeg"
          dataURL=""
          descriptionText={t('Signature:sign')}
          clearText={t('Signature:clear')}
          confirmText={t('Signature:save')}
          webStyle={style}
        />
      </View>
    );
  }
}
const style = `.m-signature-pad--footer
    .button {
      background-color: #2596be;
      color: #FFF;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 40px;
      font-size: 16px;
    }
    body,html {
    width: 100%; height: 400px;
  }`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default withTranslation()(SignScreen);
