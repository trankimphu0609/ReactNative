import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Text_Input extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.viewinput}>
        {this.props.direction == 'right'
          ? [
              <TextInput
                keyboardType="default"
                key={this.props.keys}
                value={this.props.value}
                onChangeText={this.props.onChangeText}
                style={styles.textinputemail}
                placeholder={this.props.placeholder}
                secureTextEntry={this.props.showPassword}
                placeholderTextColor="#000"
              />,
              this.props.status == 'shown' ? (
                <TouchableOpacity onPress={this.props.onPress}>
                  <Icon name={this.props.nameicon} style={styles.icon} />
                </TouchableOpacity>
              ) : null,
            ]
          : [
              this.props.status == 'shown' ? (
                <TouchableOpacity onPress={this.props.onPress}>
                  <Icon name={this.props.nameicon} style={styles.icon} />
                </TouchableOpacity>
              ) : null,
              <TextInput
                keyboardType="default"
                key={this.props.keys}
                value={this.props.value}
                onChangeText={this.props.onChangeText}
                style={styles.textinputemailleft}
                placeholder={this.props.placeholder}
                secureTextEntry={this.props.showPassword}
                placeholderTextColor="#000"
              />,
            ]}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewinput: {
    backgroundColor: '#FFFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#EBEBEB',
    borderWidth: 1,
    width: '80%',
    height: 45,
    borderRadius: 5,
  },
  icon: {
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#000',
  },
  iconleft: {
    paddingHorizontal: 5,
    fontSize: 18,
  },
  textinputemail: {
    paddingHorizontal: 15,
    width: '88%',
    height: '100%',
    color: '#000',
  },
  textinputemailleft: {
    paddingHorizontal: 15,
    width: '88%',
    height: '100%',
    color: '#000',
  },
});
export default Text_Input;
