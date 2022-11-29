// import React from "react";
// import { 
//     Text, 
//     StyleSheet,
//     TouchableOpacity,
//     Image
// } from "react-native";
// import Icon from "react-native-vector-icons/AntDesign";

// class ItemFunction extends React.Component {
//     constructor(props){
//         super(props);

//     }

//     render(){
//         return(
//             <TouchableOpacity style={styles.container}>
//                 <Image style={styles.image} source={require(this.props.image)}/>
//                 <Text style={styles.name} name={this.props.name} />
//                 <Icon name="right" size={25} style={{paddingLeft:25}}  />
//                 </TouchableOpacity>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container : {
//         width:'100%',
//         backgroundColor:'#fff',
//         flexDirection:'row',
//         justifyContent:'flex-start',
//         alignItems:'center',
//         paddingVertical:15
//     },
//     name:{
//         fontSize:17, 
//         color:"#000"
//     },
//     image:{
//         width:40, 
//         height:40, 
//         borderRadius:40, 
//         marginHorizontal:10
//     },
//     icon:{
        
//     }
// });

// export default ItemFunction;