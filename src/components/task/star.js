import React from "react";

import Icon from 'react-native-vector-icons/AntDesign';

class SystemCate extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Icon onPress={this.props.onPress} {...this.props.status == 'hide' ? {name:'staro'} : {name:'star'}} size={20} color={'#ffd100'}/>
        );
    }
}

export default SystemCate;