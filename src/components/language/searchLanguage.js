import React from 'react';
import Selector from './SelectorLanguage';
import {StyleSheet, View} from 'react-native';
class SearchLanguage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('componentdidmount searchcompany');
  }

  componentWillUpdate() {
    console.log('componentwillupdate searchcompany');
  }

  render() {
    return (
      <View style={styles.container}>
        <Selector></Selector>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default SearchLanguage;
