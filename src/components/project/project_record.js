import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import Iconmore from 'react-native-vector-icons/Fontisto';
import Star from '../task/star';
import ModalPicker from '../kanban/modalpicker';
class ProjectRecord extends React.Component {
  constructor(props) {
    super(props);
    this.directionmoda = false;
    this.state = {
      arrayOfText: [],
      selectStar: -1,
      checkmoda: false,
    };
  }
  onlickMenu = () => {
    this.setState({
      checkmoda: !this.state.checkmoda,
    });
    this.state.checkmoda === true
      ? [(this.directionmoda = false)]
      : [(this.directionmoda = true)];
  };
  render() {
    const {selectStar} = this.state;
    return (
      <TouchableOpacity onPress={this.props.onclickProjectRecord}>
        <View style={styles.container}>
          <View style={styles.verticalcolumn}></View>
          <View style={styles.viewWord}>
            <View style={styles.title}>
              <View style={styles.containerIcon}>
                {[...Array(1)].map((e, i) => (
                  <Star
                    key={i}
                    {...(i <= selectStar ? {status: 'show'} : {status: 'hide'})}
                    onPress={() => {
                      this.setState({selectStar: i});
                    }}
                  />
                ))}
              </View>
              <Text style={styles.textProject}>{this.props.nameproject}</Text>
              <TouchableOpacity
                style={styles.containerIcon}
                onPress={() => this.onlickMenu()}>
                <Iconmore name="more-v" size={14} style={{color: 'black'}} />
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.directionmoda}>
                <ModalPicker onlickMenu={this.onlickMenu} />
              </Modal>
            </View>
            <View style={styles.status}>
              <Text style={styles.nameProject}>{this.props.nameuser}</Text>
              <Text style={styles.nameStatus}>( Đang thực hiện )</Text>
            </View>
            <View style={styles.Tasks}>
              <Text style={styles.nameTasks}>{this.props.stage} Tasks</Text>
              <Text style={styles.nameTasks}>Bảng chấm công</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 120,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    marginVertical: 10,
    borderColor: '#DDE1E6',
  },
  verticalcolumn: {
    width: '4%',
    height: '100%',
    backgroundColor: '#F29A55',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  viewWord: {
    width: '96%',
    height: '100%',
    borderTopEndRadius: 4,
    borderBottomEndRadius: 4,
  },
  textProject: {
    color: '#2270B7',
    fontWeight: 'bold',
    fontSize: 20,
    width: '80%',
  },
  title: {
    flexDirection: 'row',
  },
  status: {
    marginHorizontal: 10,
  },
  nameProject: {},
  nameStatus: {
    color: '#000',
    fontWeight: 'bold',
  },
  nameTasks: {
    color: '#2270B7',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  Tasks: {
    flexDirection: 'row',
  },
  containerIcon: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProjectRecord;
