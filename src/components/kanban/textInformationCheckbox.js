import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
class TextInformationCheckbox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={style.container}>
        <Text style={style.textLeft1}>{this.props.textLeft}</Text>
        <CheckBox disabled={false} value={this.props.textRight} />
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 6,
  },
  textLeft1: {
    color: 'black',
    width: '40%',
    fontFamily: 'bold',
  },
  textLeft2: {
    color: '#CCC',
    width: '40%',
    fontFamily: 'bold',
  },
  textRight: {
    color: '#408BC7',
    width: '60%',
  },
});
export default TextInformationCheckbox;
