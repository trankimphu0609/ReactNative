import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
const URL_projecttype = 'https://uat.xboss.com/web/dataset/call_kw';
const projecttype = {
  params: {
    model: 'project.type',
    method: 'search_read',
    args: [[], ['name'], 0, 0, ''],
    kwargs: {},
    context: {
      tz: 'Asia/Ho_Chi_Minh',
      lang: 'en_US',
    },
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

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    const {stage_id} = this.props.route.params;
    this.state = {
      tasktileTextValue: '',
      projectTextValue: '',
      tileTextValue: '',
      reportedbyTextValue: '',
      assingnedTextValue: '',
      listprojecttype: [],
      listproject: [],
      stage_id: stage_id[0],
    };
  }
  onChangeValueTasksTitle = value => {
    this.setState({
      tasktileTextValue: value,
    });
  };
  onChangeValueProject = value => {
    this.setState({
      projectTextValue: value,
    });
  };
  onChangeValueTitle = value => {
    this.setState({
      tileTextValue: value,
    });
  };
  onChangeValueReported = value => {
    this.setState({
      reportedbyTextValue: value,
    });
  };
  onChangeValueAssingned = value => {
    this.setState({
      assingnedTextValue: value,
    });
  };
  async componentDidMount() {
    let res1 = await axios.post(URL_login, login);
    let resprojecttype = await axios.post(URL_projecttype, projecttype);
    let resproject = await axios.post(URL_project, project);
    this.setState({
      listprojecttype:
        resprojecttype && resprojecttype.data && resprojecttype.data.result
          ? resprojecttype.data.result
          : [],
      listproject:
        resproject && resproject.data && resproject.data.result
          ? resproject.data.result
          : [],
    });
  }
  addtask = (project_id, tasktileTextValue, type_id) => {
    const URL_listword = 'https://uat.xboss.com/web/dataset/call_kw';
    axios
      .post(URL_listword, {
        params: {
          model: 'project.task',
          method: 'create',
          args: [
            {
              name: tasktileTextValue,
              project_id: project_id,
              type_id: type_id,
              stage_id: this.state.stage_id[0],
            },
          ],
          kwargs: {},
          context: {
            tz: 'Asia/Ho_Chi_Minh',
            lang: 'vi_VN',
          },
        },
      })
      .then(response => response.data.result)
      .then(
        response => {
          console.log(response);
          this.props.navigation.navigate('WordProject');
        },
        error => {
          console.log(error);
        },
      );
  };
  render() {
    const {t} = this.props;
    const {stage_id} = this.props.route.params;
    let {
      listprojecttype,
      listproject,
      projectTextValue,
      tasktileTextValue,
      tileTextValue,
    } = this.state;
    return (
      <View state={styles.contrainer}>
        <View style={styles.contrainerView}>
          <Text style={styles.text}>{t('AddTask:title_task')}</Text>
          <Text_input
            onChangeText={this.onChangeValueTasksTitle}
            placeholder={t('AddTask:title_task')}
          />
          <Text style={styles.text}>{t('AddTask:title_project')}</Text>
          <View style={styles.pickerStyle}>
            <Picker
              style={{color: 'black'}}
              selectedValue={this.state.projectTextValue}
              onValueChange={(itemValue, itemPosition) =>
                this.setState({...this.state, projectTextValue: itemValue})
              }>
              {listproject.map((item, index) => {
                return (
                  <Picker.Item key={index} label={item.name} value={item.id} />
                );
              })}
            </Picker>
          </View>

          <Text style={styles.text}>{t('AddTask:title_type')}</Text>
          <View style={styles.pickerStyle}>
            <Picker
              style={{color: 'black'}}
              selectedValue={this.state.tileTextValue}
              onValueChange={(itemValue, itemPosition) =>
                this.setState({...this.state, tileTextValue: itemValue})
              }>
              {listprojecttype.map((item, index) => {
                return (
                  <Picker.Item key={index} label={item.name} value={item.id} />
                );
              })}
            </Picker>
          </View>

          <View style={styles.containerbutton}>
            <TouchableOpacity
              style={styles.TouchableOpacitytextwhite}
              onPress={() => {
                this.addtask(
                  projectTextValue,
                  tasktileTextValue,
                  tileTextValue,
                );
              }}>
              <Text style={styles.textwhite}>{t('AddTask:add')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contrainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'red',
    borderWidth: 1,
  },
  contrainerView: {
    borderRadius: 10,
    backgroundColor: '#FFF',
    alignItems: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.05)',
    marginHorizontal: 10,
  },
  TouchableOpacitytextwhite: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    backgroundColor: 'blue',
    borderRadius: 6,
    margin: 10,
  },
  TouchableOpacitytextblack: {
    width: '30%',
    backgroundColor: '#ECECEC',
    borderRadius: 6,
  },
  containerbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 5,
    color: 'black',
  },
  textwhite: {
    color: 'white',
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textblack: {
    color: 'black',
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  pickerStyle: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#344953',
  },
});
export default withTranslation()(AddTask);
