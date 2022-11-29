import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

class ItemFunction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Icon style={styles.icon} name={this.props.icon} size={18} />
        {/* <Image style={styles.image} source={require({this.props.image)}/> */}
        <Text style={[styles.name, {color: this.props.colorText}]}>
          {this.props.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
  },
  icon: {
    color: '#ff0000',
    marginHorizontal: 20,
  },
  name: {
    fontSize: 18,
  },
  image: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});

export default ItemFunction;
