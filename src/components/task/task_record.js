import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Star from '../task/star';
import moment from 'moment';
class TaskRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfText: [],
      selectStar: -1,
    };
  }

  render() {
    const {selectStar} = this.state;
    var date_finished = this.props.date_finished;
    var date_deadline = this.props.date_deadline;
    var priority = this.props.priority;
    return (
      <TouchableOpacity onPress={this.props.onclickTask}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.textTitle}>{this.props.nameWordList}</Text>
            <View style={{flexDirection: 'row'}}>
              {[...Array(3)].map((e, i) => (
                <Star
                  key={i}
                  {...(i <= priority - 1 ? {status: 'show'} : {status: 'hide'})}
                  onPress={() => {
                    this.setState({selectStar: i});
                  }}
                />
              ))}
            </View>
          </View>

          <View style={styles.item}>
            <Text style={{color: 'red'}}>
              {date_finished != false
                ? moment(date_finished).format('DD/MM/YYYY h:mm:ss')
                : null}
            </Text>

            <Text style={{color: 'green'}}>
              {date_deadline != false
                ? moment(date_deadline).format('DD/MM/YYYY h:mm:ss')
                : null}
            </Text>
            <Text style={{}}>{this.props.type_id}</Text>
          </View>

          <View style={styles.functionIcon}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                style={{marginHorizontal: 10}}
                name="send"
                color={'#1a6ab4'}
                size={25}
              />
              <FontAwesome name="check-square-o" color={'#1a6ab4'} size={25} />
            </View>
            <View style={styles.asignContainer}>
              <View style={styles.assignPerson} />
              <Image
                style={styles.asignImage}
                source={{
                  uri: 'https://static.wikia.nocookie.net/kimesu-no-yaiba/images/8/83/Giyuu_anime_design.png/revision/latest?cb=20190320113323&path-prefix=vi',
                }}
              />
              <Icon name="right" color={'gray'} />
              <Image
                style={styles.asignImage}
                source={{
                  uri: 'https://static.wikia.nocookie.net/kimesu-no-yaiba/images/8/83/Giyuu_anime_design.png/revision/latest?cb=20190320113323&path-prefix=vi',
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderColor: '#dfdfdf',
    borderWidth: 1,
    padding: 15,
    margin: 15,
  },

  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textTitle: {
    color: '#2672b8',
    fontSize: 20,
    width: '75%',
    fontWeight: 'bold',
  },

  item: {
    // flexWrap:'wrap',
    // flexDirection:'row',
    // alignItems:'center',
    marginVertical: 10,
    // width:'80%',
  },
  functionIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  asignContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assignPerson: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#d9dee2',
  },
  asignImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
});

export default TaskRecord;
