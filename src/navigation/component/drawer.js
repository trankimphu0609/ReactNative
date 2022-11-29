import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import ItemList from '../../components/ItemList';
import {withTranslation} from 'react-i18next';
class MyDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: 0,
    };
  }

  handleOnPress = (id, screen) => {
    this.setState({selectedId: id});
    this.props.navigation.navigate(screen);
  };

  // componentDidUpdate = () => {
  //   // this.setState({selectedId: item.id})
  // }

  renderItem = ({item}) => {
    const {selectedId} = this.state;
    const backgroundColor = item.id == selectedId ? '#92cbdf' : '#fefefe';
    const color = item.id == selectedId ? '#4489c3' : '#a6a6a7';
    const colorItem = item.id == selectedId ? '#4489c3' : '#a6a6a7';
    return (
      <ItemList
        item={item}
        onPress={() => this.handleOnPress(item.id, item.screen)}
        backgroundColor={backgroundColor}
        color={color}
        sizeIcon={30}
        sizeText={20}
        colorItem={colorItem}
      />
    );
  };

  render() {
    const {t} = this.props;
    const DATA = [
      {
        id: '0',
        title: t('Drawer:home'),
        image: 'home',
        screen: 'MainHome',
      },
      {
        id: '1',
        title: t('Drawer:project'),
        image: 'folder1',
        screen: 'Project',
      },
    ];
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.projectContainer}>
            <MaterialCommunityIcons
              style={styles.iconName}
              name={'monitor-dashboard'}
              solid
            />
            <Text style={styles.name}>{t('Drawer:title')}</Text>
          </View>
          <FlatList
            data={DATA}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            extraData={this.selectedId}
          />
        </View>
        <Text style={styles.companyName}>
          Công ty TNHH Giải Pháp Công Nghệ XBoss
        </Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fefefe',
  },
  projectContainer: {
    flex: 0,
    flexDirection: 'row',
  },
  iconName: {
    paddingStart: 10,
    marginTop: 30,
    fontSize: 30,
    marginStart: 16,
    color: '#FF7700',
  },
  name: {
    paddingTop: 20,
    paddingStart: 15,
    paddingBottom: 20,
    marginVertical: 8,
    fontSize: 22,
    fontWeight: '500',
    color: 'black',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  companyName: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 15,
    color: '#000',
  },
});

export default withTranslation()(MyDrawer);
