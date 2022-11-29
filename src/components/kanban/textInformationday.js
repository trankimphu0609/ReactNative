import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import moment from 'moment';
class TextInformationDay extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var day = this.props.day;
    return (
      <View style={style.container}>
        {day != false
          ? [
              <Text style={style.textLeft1}>{this.props.textLeft}</Text>,
              <Text style={style.textRight}>
                {moment(day).add(7, 'h').format('DD/MM/YYYY hh:mm:ss a')}
              </Text>,
            ]
          : [<Text style={style.textLeft2}>{this.props.textLeft}</Text>]}
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
    color: 'black',
    width: '60%',
  },
});
export default TextInformationDay;
