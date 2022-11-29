import axios from 'axios';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {groupBy} from 'underscore-node';
import TaskRecord from '../task/task_record';
import Text_input from '../text_input';
import {Moment} from 'moment';
import {withTranslation} from 'react-i18next';
const URL_listword = 'https://uat.xboss.com/web/dataset/call_kw';

const windowWidth = Dimensions.get('window').width;

class WordList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listWord: [],
      listWord1: [],
      listWord2: [],
      textSearch: '',
      statusaddtask: false,
      objj: [],
    };
  }
  async componentDidMount() {
    const {project_id} = this.props.route.params;
    let res = await axios.post(URL_listword, {
      params: {
        model: 'project.task',
        method: 'search_read',
        args: [
          [['project_id', '=', project_id]],
          [
            'color',
            'priority',
            'stage_id',
            'type_id',
            'creator_id',
            'user_id',
            'contributor_ids',
            'sequence',
            'date_deadline',
            'date_finished',
            'message_needaction_counter',
            'displayed_image_id',
            'project_id',
            'kanban_state_label',
            'active',
            'legend_blocked',
            'legend_normal',
            'legend_done',
            'activity_ids',
            'activity_state',
            'rating_last_value',
            'rating_ids',
            'progress',
            'remaining_hours',
            'name',
            'email_from',
            'tag_ids',
            'milestone_id',
            'activity_exception_decoration',
            'activity_exception_icon',
            'checklist_task_instance_ids',
            'qty_done',
            'qty_total',
            'kanban_state',
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
    });
    this.setState({
      listWord1: res && res.data && res.data.result ? res.data.result : [],
    });
    res && res.data && res.data.result
      ? this.setState({
          listWord: groupBy(res.data.result, function (num) {
            return num.stage_id[1];
          }),
        })
      : [];

    this.setState({
      listWord2: this.state.listWord,
    });
  }
  onChangeValueSearch = value => {
    this.setState({
      textSearch: value,
    });
  };
  addTask = obj => {
    this.setState({
      objj: obj,
    }),
      this.addTask1();
  };

  addTask1 = () => {
    this.setState({
      statusaddtask: !this.state.statusaddtask,
    });
  };
  searchTask = (textSearch, listWord1) => {
    var newlist = [];
    listWord1.map(item => {
      if (item.name.toUpperCase().includes(textSearch.toUpperCase())) {
        newlist.push(item);
      }
    });
    this.setState({
      listWord2: groupBy(newlist, function (num) {
        return num.stage_id[1];
      }),
    });
  };
  onclickTask = id => {
    // console.log('id:', id);
    this.props.navigation.navigate('DetailsTask', {
      id: id,
    });
    // console.log("NNNNNNNNNNN",id,stage_id);
  };

  render() {
    let {textSearch, listWord1, listWord2} = this.state;
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
              onChangeText={this.onChangeValueSearch}
              onPress={() => {
                this.searchTask(textSearch, listWord1);
              }}
              status={'shown'}
              nameicon={'search'}
              direction={'right'}
              placeholder={t('WordList:title_placeholder')}
            />
          </View>
        }
        {listWord2.length != 'undefined' ? (
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}>
            {Object.keys(listWord2).map((obj, i) => {
              return (
                <View key={i} style={styles.containerProject}>
                  <View style={styles.itemcontainerProject}>
                    <View style={styles.headerProject}>
                      <Text style={styles.textheaderProject}>{obj}</Text>
                      <View style={styles.containericonheaderProject}>
                        <TouchableOpacity
                          style={styles.touchableOpacityiconheaderProject}>
                          <Icon
                            name={'setting'}
                            style={styles.iconheaderProject}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.touchableOpacityiconheaderProject}
                          onPress={() => {
                            this.props.navigation.navigate('AddTask', {
                              stage_id: listWord2[obj].map(item => {
                                return item.stage_id;
                              }),
                            });
                          }}>
                          <Icon
                            name={'pluscircle'}
                            style={styles.iconheaderProject}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {
                      <View style={styles.containerFlatListProject}>
                        <FlatList
                          data={listWord2[obj]}
                          renderItem={({item}) => (
                            <View style={styles.containerItemFlatListProject}>
                              <TaskRecord
                                date_deadline={item.date_deadline}
                                onclickTask={() => {
                                  this.onclickTask(item.id);
                                }}
                                priority={item.priority}
                                nameWordList={item.name}
                                date_finished={item.date_finished}
                                type_id={item.type_id[1]}
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
  containericonheaderProject: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableOpacityiconheaderProject: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconheaderProject: {
    color: '#8F8F8F',
    fontSize: 26,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  containerFlatListProject: {
    width: '100%',
    height: '86%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerItemFlatListProject: {
    alignItems: 'center',
  },
});

export default withTranslation()(WordList);
