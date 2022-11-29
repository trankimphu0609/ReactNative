import React from 'react';
import {Text, View, TouchableOpacity,} from 'react-native';
import {Svg, Path} from 'react-native-svg'

class Alert extends React.Component{ //TODO: Tên class viết Hoa
    constructor(props){
        super(props);
        console.log("Vao Alert")
    }

    createArray (n){
        var arr = new Array(n)
        for(var i = 0; i < n; i++){
          arr.push(i);
        }
        return arr;
      }
    
    createComponent = () =>{
        let {number,color }=this.props
        return(
            <View style={{flex:1, alignItems:'center',}}>
                <Text style={{fontSize:30, color :color, margin:8}}>{this.props.title}</Text>
                <Text style = {{fontSize:20, color:'black', margin:8}}>{this.props.description}</Text>
                <View style={{flexDirection:"column", alignItems:'center',}} >
                    {  
                        this.createArray(number).map(() => {
                            return(
                                <TouchableOpacity style={{width:200, backgroundColor: this.props.color, alignItems:'center', borderRadius:10, margin:8}}
                                onPress = {() => this.props.call()}>
                                    <Text style={{color: 'white', padding: 20, fontSize:20}}>{this.props.button}</Text>
                                </TouchableOpacity> 
                            )
                        })
                    }
                </View>
            </View>
        );
    }
    render(){
        if(this.props.icon == 'success')
        return(
            <View style={{flex:1, alignItems:'center',}}>
                {this.icon_success()}
                {this.createComponent()}
            </View>
        ); 
        else 
        if(this.props.icon == 'error')
        return(
            <View style={{flex:1, alignItems:'center',}}>
                {this.icon_error()}
                {this.createComponent()}
            </View>
        )  
        else 
        if(this.props.icon == 'warning')
        return(
            <View style={{flex:1, alignItems:'center',}}>
                {this.icon_warning()}
                {this.createComponent()}
            </View>
        )    
        else 
        return(
            <View style={{flex:1, alignItems:'center',}}>
                {this.createButton()}
            </View>
        )   
    };

    icon_success = () => {
        return(
            <View>
                <Svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M42 20.1714V22.0114C41.9975 26.3243 40.601 30.5208 38.0187 33.9751C35.4363 37.4294 31.8066 39.9564 27.6707 41.1792C23.5349 42.4021 19.1145 42.2552 15.0689 40.7606C11.0234 39.266 7.56931 36.5036 5.22192 32.8856C2.87453 29.2675 1.75958 24.9876 2.04335 20.6841C2.32712 16.3806 3.99441 12.2841 6.79656 9.00559C9.5987 5.72708 13.3856 3.44221 17.5924 2.49174C21.7992 1.54127 26.2005 1.97612 30.14 3.73145" stroke="#21AE40" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M42 6.01147L22 26.0315L16 20.0315" stroke="#21AE40" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </Svg>
            </View>
        )
    };

    icon_error = () => {
        return ( 
            <View>
                <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M21.6232 0.0425645C26.1634 0.326328 30.4198 2.59643 33.5412 5.71783C37.2301 9.69051 39.2165 14.5145 39.2165 20.1898C39.2165 24.73 37.5139 28.9864 34.6763 32.6753C31.8386 36.0805 27.8659 38.6344 23.3257 39.4857C18.7855 40.3369 14.2453 39.7694 10.2726 37.4993C6.29994 35.2292 3.17854 31.824 1.47596 27.5676C-0.226616 23.3111 -0.510379 18.4872 0.908437 14.2307C2.32725 9.69051 4.88112 6.00159 8.85381 3.44772C12.5427 0.893854 17.0829 -0.241199 21.6232 0.0425645ZM23.042 36.648C26.7309 35.7967 30.136 33.8104 32.6899 30.689C34.96 27.5676 36.3788 23.8787 36.0951 19.906C36.0951 15.3658 34.3925 10.8256 31.2711 7.70417C28.4335 4.86654 25.0283 3.16396 21.0556 2.8802C17.3667 2.59643 13.394 3.44772 10.2726 5.71783C7.15123 7.98794 4.88112 11.1093 3.74607 15.082C2.61102 18.7709 2.61102 22.7436 4.3136 26.4325C6.01617 30.1215 8.57004 32.9591 11.9752 34.9454C15.3804 36.9318 19.353 37.4993 23.042 36.648ZM19.6368 18.4872L26.4471 11.3931L28.4335 13.3794L21.6232 20.4735L28.4335 27.5676L26.4471 29.5539L19.6368 22.4599L12.8265 29.5539L10.8401 27.5676L17.6505 20.4735L10.8401 13.3794L12.8265 11.3931L19.6368 18.4872Z" fill="#E04141"/>
                </Svg>
            </View>
        )
    }

    icon_warning = () => {
        return (
            <View>
                <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M20.0001 26C20.5305 26 21.0392 25.7934 21.4142 25.4258C21.7893 25.0581 22 24.5594 22 24.0394V14.9606C22 14.4406 21.7893 13.9419 21.4142 13.5742C21.0392 13.2066 20.5305 13 20.0001 13C19.4697 13 18.961 13.2066 18.586 13.5742C18.2109 13.9419 18.0002 14.4406 18.0002 14.9606V24.0093C17.9962 24.2693 18.0449 24.5275 18.1435 24.7688C18.2422 25.0102 18.3889 25.2299 18.575 25.4151C18.7611 25.6004 18.983 25.7475 19.2276 25.8479C19.4723 25.9483 19.7349 26 20.0001 26Z" fill="#FFBF30"/>
                    <Path d="M20 32C21.1046 32 22 31.1046 22 30C22 28.8954 21.1046 28 20 28C18.8954 28 18 28.8954 18 30C18 31.1046 18.8954 32 20 32Z" fill="#FFBF30"/>
                    <Path d="M39.431 31.9282L24.1538 3.48279C23.7493 2.73156 23.152 2.10447 22.4246 1.66754C21.6973 1.23061 20.8669 1 20.0208 1C19.1747 1 18.3443 1.23061 17.617 1.66754C16.8896 2.10447 16.2923 2.73156 15.8878 3.48279L0.594888 31.9282C0.194614 32.6545 -0.0103583 33.4742 0.000402914 34.3055C0.0111642 35.1368 0.237283 35.9508 0.65622 36.6662C1.07516 37.3817 1.67228 37.9737 2.38807 38.3831C3.10386 38.7926 3.91331 39.0052 4.73574 38.9999H35.2902C36.1059 39.0007 36.9077 38.787 37.6171 38.38C38.3265 37.973 38.9191 37.3866 39.3367 36.6783C39.7542 35.9699 39.9825 35.164 39.999 34.3396C40.0156 33.5152 39.8198 32.7006 39.431 31.9758V31.9282ZM36.6391 35.0042C36.5003 35.2409 36.3029 35.437 36.0664 35.5732C35.8299 35.7095 35.5624 35.7811 35.2902 35.7812H4.73574C4.46309 35.7819 4.19497 35.7108 3.9578 35.5749C3.72063 35.4389 3.52261 35.2428 3.38326 35.0059C3.24392 34.769 3.16807 34.4995 3.1632 34.2239C3.15832 33.9484 3.22458 33.6763 3.35545 33.4345L18.6327 4.9891C18.7671 4.73739 18.9663 4.52711 19.2093 4.38056C19.4523 4.234 19.73 4.15663 20.013 4.15663C20.2959 4.15663 20.5736 4.234 20.8166 4.38056C21.0596 4.52711 21.2588 4.73739 21.3932 4.9891L36.6705 33.4345C36.8005 33.6764 36.866 33.9483 36.8605 34.2236C36.855 34.4988 36.7787 34.7678 36.6391 35.0042Z" fill="#FFBF30"/>
                </Svg>
            </View>
        )
    }
}

export default Alert