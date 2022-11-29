import React from "react";
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class Item extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{...shape, backgroundColor:this.props.shapeColor}}/>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );
    }
}

const shape = {
    width:10,
    height:10,
    borderRadius: 10,
}

const styles = StyleSheet.create({
    container : {
        flexDirection:'row',
        alignItems:'center',
    },
    title : {
        fontSize:22, 
        fontWeight:'bold', 
        marginHorizontal:5
    }
})

export default Item;