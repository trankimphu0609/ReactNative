import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.itemImage,
          {backgroundColor: this.props.backgroundColor},
        ]}>
        <AntDesign
          style={[
            styles.image,
            {
              backgroundColor: this.props.backgroundColor,
              fontSize: this.props.sizeIcon,
              color: this.props.colorItem,
            },
          ]}
          name={this.props.item.image}
          solid
        />
        <Text
          style={[
            styles.Itemtitle,
            {color: this.props.color, fontSize: this.props.sizeText},
          ]}>
          {this.props.item.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemImage: {
    padding: 20,
    marginHorizontal: 16,
    flexDirection: 'row',
  },

  Itemtitle: {
    paddingStart: 10,
  },
});

export default ItemList;
