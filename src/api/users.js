import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';

const url1 = 'https://jsonplaceholder.typicode.com/users';
const url2 = 'https://jsonplaceholder.typicode.com/posts';
class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      persons: [],
    };
  }

  componentDidMount() {
    axios
      .get(url2)
      .then(reponse => reponse.data)
      .then(data => {
        this.setState({persons: data});
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View>
        <Text style={{color: 'black', fontSize: 25}}>Information</Text>
        {this.state.persons.map(person => {
          return (
            // <View>
            //   <Text style={{color: 'red', fontSize: 20}}>
            //     Name: {person.name}
            //   </Text>
            //   <Text style={{color: 'yellow', fontSize: 20}}>
            //     Username: {person.username}
            //   </Text>
            //   <Text style={{color: 'green', fontSize: 20}}>
            //     email: {person.email}
            //   </Text>
            //   <Text>___________________</Text>
            // </View>

            <View>
              <Text style={{color: 'red', fontSize: 20}}>
                ID: {person.id}
              </Text>
              <Text style={{color: 'yellow', fontSize: 20}}>
                Title: {person.title}
              </Text>
              <Text style={{color: 'green', fontSize: 20}}>
                Body: {person.body}
              </Text>
              <Text>___________________</Text>
            </View>
          );
        })}
      </View>
    );
  }
}
export default Users;
