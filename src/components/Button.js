import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity style={this.props.sample == "background" ? [styles.background, { backgroundColor: this.props.backgroundColortouchableOpacity }] :
        [styles.border, { borderColor: this.props.borderColor }]} onPress={this.props.onPress} >
        {this.props.direction == 'left'
          ?
          [
            this.props.sample == "background" ? < Icon name={this.props.nameicon} style={[styles.icon, { color: this.props.coloricon }]} /> : null,
            <Text style={[styles.text, { color: this.props.colortext }]}>{this.props.nametext}</Text>
          ]
          :
          [
            <Text style={[styles.text, { color: this.props.colortext }]}>{this.props.nametext}</Text>,
            this.props.sample == "background" ? <Icon name={this.props.nameicon} style={[styles.icon, { color: this.props.coloricon }]} /> : null
          ]
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: '6%',
    width: '80%'

  },
  border: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
    height: '6%',
    width: '80%'
  },
  text: {
    marginHorizontal: 10,
    fontFamily: 'Arial',
    color: "#FFFF",
    fontSize: 20,
  },
  icon: {
    fontSize: 30,
  },
  textborder: {
    marginHorizontal: 10,
    fontFamily: 'Arial',
    color: "#66A0D0",
    fontSize: 20,
  }
});

export default Button;