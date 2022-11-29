import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';

class StatusBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayStatus: this.props.array
        ? this.props.array
        : ['NEW', 'IMPLEMENTING', 'REVIEW CODE', 'BETA TESTING'],
      indexCurrent: this.props.index ? this.props.index : 0, // vị trí trạng thái đang chọn
    };
  }

  // truyền mảng trạng thái mới
  //const example = ['stt1', 'stt2', 'stt3']
  //onPress={() => this.setStatus(example)}
  setStatus = array => {
    this.setState({arrayStatus: array, indexCurrent: 0});
  };

  // Hàm thay đổi (màu) trạng thái khi click
  changeStatus = index => {
    this.setState({indexCurrent: index});
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.arrayStatus.map((name, index) => {
          if (index == this.state.arrayStatus.length - 1) {
            return (
              <TouchableOpacity
                onPress={() => this.changeStatus(index)}
                style={{flexDirection: 'row'}}>
                <View
                  style={[
                    styles.triangle2,
                    index == this.state.indexCurrent &&
                      this.state.arrayStatus.length != 1 && {
                        borderTopColor: '#28a745',
                        borderBottomColor: '#28a745',
                      },
                  ]}></View>
                <View
                  style={[
                    styles.buttonState,
                    index == this.state.indexCurrent && {
                      backgroundColor: '#28a745',
                    },
                    index == 0 ? null : {borderLeftWidth: 0},
                  ]}>
                  <Text
                    style={[
                      styles.buttonText,
                      index == this.state.indexCurrent && {color: 'white'},
                    ]}>
                    {name}
                  </Text>
                </View>
                <View style={[styles.endButton]}>
                  <View
                    style={[
                      styles.arrow,
                      {top: -1, right: 0},
                      index == this.state.indexCurrent && {
                        borderLeftColor: 'transparent',
                      },
                    ]}></View>
                  <View
                    style={[
                      styles.triangle,
                      index == this.state.indexCurrent && {
                        borderLeftColor: '#28a745',
                      },
                      {left: 0.1, top: 0.9},
                    ]}></View>
                </View>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              onPress={() => this.changeStatus(index)}
              style={{flexDirection: 'row'}}>
              {index !== 0 && index == this.state.indexCurrent && (
                <View
                  style={[
                    styles.triangle2,
                    {
                      borderTopColor: '#28a745',
                      borderBottomColor: '#28a745',
                    },
                  ]}></View>
              )}
              <View
                style={[
                  styles.buttonState,
                  index == 0 ? null : {borderLeftWidth: 0},
                  this.state.indexCurrent == index && {
                    backgroundColor: '#28a745',
                  },
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    index == this.state.indexCurrent && {color: 'white'},
                  ]}>
                  {name}
                </Text>
                <View style={[styles.arrow]}></View>
                <View
                  style={[
                    styles.triangle,
                    this.state.indexCurrent == index && {
                      borderLeftColor: '#28a745',
                      borderTopColor: 'white',
                      borderBottomColor: 'white',
                    },
                  ]}></View>
              </View>

              {/*  */}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    marginBottom: 50,
    flexDirection: 'row',
  },

  buttonState: {
    borderWidth: 1,
    borderColor: '#b2b5b8',
    borderRightWidth: 0,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
    height: '100%',
    borderLeftColor: 'white',
    backgroundColor: 'white',
  },
  endButton: {
    position: 'relative',
    width: 'auto',
    height: '100%',
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 12,
    color: 'black',
    paddingRight: 3,
    paddingLeft: 5,
  },
  triangle: {
    left: 1,
    position: 'relative',
    width: 16,
    height: 0,
    top: -0.05,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 14,
    borderRightWidth: 0,
    borderBottomWidth: 14,
    borderLeftWidth: 14,
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'white',
  },
  triangle2: {
    left: -16,
    position: 'absolute',
    width: 16,
    height: 0,
    top: 0.9,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 14,
    borderRightWidth: 0,
    borderBottomWidth: 14,
    borderLeftWidth: 14,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  arrow: {
    position: 'absolute',
    top: -2,
    left: 'auto',
    bottom: 'auto',
    borderStyle: 'solid',
    right: -1,
    borderTopWidth: 16,
    borderBottomWidth: 16,
    borderLeftWidth: 16,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#b2b5b8',
    backgroundColor: 'transparent',
  },
});

export default StatusBar;
