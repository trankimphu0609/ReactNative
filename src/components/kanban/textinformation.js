import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
class TextInformation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var textRight = this.props.textRight;
    return (
      <View style={style.container}>
        {textRight === false || typeof textRight === 'undefined'
          ? [<Text style={style.textLeft2}>{this.props.textLeft}</Text>]
          : [
              <Text style={style.textLeft1}>{this.props.textLeft}</Text>,
              <Text style={style.textRight}>{textRight}</Text>,
            ]}
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
export default TextInformation;
