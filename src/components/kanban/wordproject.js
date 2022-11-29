import axios from 'axios';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {groupBy} from 'underscore-node';
import ProjectRecord from '../project/project_record';
import Text_input from '../text_input';
import {withTranslation} from 'react-i18next';
const URL_login = 'https://uat.xboss.com/web/session/authenticate';
const login = {
  params: {
    db: 'xboss_uat25052021',
    login: 'longlam@hhdgroup.com',
    password: '1!@#Qqwe',
  },
};
const URL_project = 'https://uat.xboss.com/web/dataset/call_kw';
const project = {
  params: {
    model: 'project.project',
    method: 'search_read',
    args: [
      [['active', '=', true]],
      [
        'name',
        'user_id',
        'type_id',
        'members',
        'task_count',
        'tasks',
        'active',
        'project_status',
      ],
      0,
      0,
      '',
    ],
    kwargs: {},
    context: {
      tz: 'Asia/Ho_Chi_Minh',
      lang: 'en_US',
    },
  },
};

const TEXT_LENGTH = 600;
const TEXT_HEIGHT = 50;
const OFFSET = TEXT_LENGTH / 2 - TEXT_HEIGHT / 2;
const windowWidth = Dimensions.get('window').width;
class WordProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listProject: [],
      listProject1: [],
      listProject2: [],
      textSearch: '',
    };
  }
  async componentDidMount() {
    // let res1 = await axios.post(URL_login, login);
    let res = await axios.post(URL_project, project);
    this.setState({
      listProject1: res && res.data && res.data.result ? res.data.result : [],
    });
    res && res.data && res.data.result
      ? this.setState({
          listProject: groupBy(res.data.result, function (num) {
            return num.project_status[1];
          }),
        })
      : [];
    this.setState({
      listProject2: this.state.listProject,
    });
  }
  componentDidUpdate() {
    console.log('componenatDidUpdate');
  }
  onChangeValueSearch = value => {
    this.setState({
      textSearch: value,
    });
  };
  searchTask = (textSearch, listProject1) => {
    var newlist = [];
    listProject1.map(item => {
      if (item.name.toUpperCase().includes(textSearch.toUpperCase())) {
        newlist.push(item);
      }
    });
    this.setState({
      listProject2: groupBy(newlist, function (num) {
        return num.project_status[1];
      }),
    });
  };

  render() {
    let {textSearch, listProject1, listProject2} = this.state;
    const {t} = this.props;
    return (
      <View style={{alignItems: 'center'}}>
        {
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 60,
              backgroundColor: '#E5E4E5',
            }}>
            <Text_input
              keys={2001}
              onChangeText={this.onChangeValueSearch}
              onPress={() => {
                this.searchTask(textSearch, listProject1);
              }}
              status={'shown'}
              nameicon={'search'}
              direction={'right'}
              placeholder={t('WordProject:title_placeholder')}
            />
          </View>
        }
        {listProject2.length != 'undefined' ? (
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}>
            {Object.keys(listProject2).map((obj, i) => {
              return (
                <View key={i} style={styles.containerProject}>
                  <View style={styles.itemcontainerProject}>
                    <View style={styles.headerProject}>
                      <Text style={styles.textheaderProject}>{obj}</Text>
                      <Icon name={'setting'} style={styles.iconheaderProject} />
                    </View>

                    {
                      <View style={styles.containerFlatListProject}>
                        <FlatList
                          data={listProject2[obj]}
                          renderItem={({item}) => (
                            <View style={styles.containerItemFlatListProject}>
                              <ProjectRecord
                                onclickProjectRecord={() => {
                                  this.props.navigation.navigate('WordList', {
                                    project_id: item.id,
                                  });
                                }}
                                nameproject={item.name}
                                nameuser={item.user_id[1]}
                                stage={item.task_count}
                              />
                            </View>
                          )}
                        />
                      </View>
                    }
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          // :
          // <View style={[styles.itemhide]} >
          //     <TouchableOpacity onPress={() => this.oncheck(id)}>
          //         <Icon name={"arrowsalt"} style={styles.iconitemhide} />
          //     </TouchableOpacity>
          //     <View style={{ width: TEXT_HEIGHT, height: TEXT_LENGTH }}>
          //         <Text style={styles.txtitemhide}>
          //             {title}
          //         </Text>
          //     </View>
          // </View>
          <ActivityIndicator size="large" />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerProject: {
    width: windowWidth,
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#E5E4E5',
  },
  itemcontainerProject: {
    width: '90%',
    height: '100%',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  headerProject: {
    width: '100%',
    height: '6%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textheaderProject: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A72B7',
    width: '80%',
    textAlignVertical: 'center',
    paddingHorizontal: 20,
  },
  iconheaderProject: {
    width: '20%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#8F8F8F',
    fontSize: 26,
  },
  containerFlatListProject: {
    width: '100%',
    height: '86%',
  },
  containerItemFlatListProject: {
    alignItems: 'center',
  },
  itemhide: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 13,
  },
  iconitemhide: {
    marginTop: 14,
    color: '#8F8F8F',
    textAlign: 'center',
    fontSize: 30,
  },
  txtitemhide: {
    transform: [{rotate: '90deg'}, {translateX: -OFFSET}, {translateY: OFFSET}],
    width: TEXT_LENGTH,
    height: TEXT_HEIGHT,
    textAlign: 'left',
    marginTop: TEXT_LENGTH,
    fontWeight: 'bold',
    color: '#3973B7',
    fontSize: 30,
  },
});

export default withTranslation()(WordProject);
