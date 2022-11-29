import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const OPTIONS = [
  'Fold',
  'Edit Stage',
  'Delete',
  'Archive All',
  'Unarchive All',
];

class ModalPicker extends React.Component {
  constructor(props) {
    super(props);
  }
  onFold = () => {
    return OPTIONS.map((item, index) => (
      <TouchableOpacity onPress={this.props.onlickItemMenu} key={index}>
        <Text key={index} style={styles.text}>
          {item}
        </Text>
      </TouchableOpacity>
    ));
  };
  render() {
    return (
      <TouchableOpacity
        style={styles.component}
        onPress={this.props.onlickMenu}>
        <View style={styles.componentView}>
          <ScrollView>
            <this.onFold />
          </ScrollView>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    paddingLeft: 150,
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
  componentView: {
    width: WIDTH - 200,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginTop: 80,
    borderColor: '#ECECEC',
    borderWidth: 1,
  },
  text: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ModalPicker;
