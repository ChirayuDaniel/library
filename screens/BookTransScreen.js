import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';


export default class BookTransScreen extends React.Component{
constructor(){
    super();
    this.state = {
hasCameraPermissions : null,
scanned : false,
scannedData : '',
buttonState : 'normal',
scannedBookID : '',
scannedStudentID : '',
    }
}
getCameraPermissions = async (id) => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
        hasCameraPermissions : status === "granted",
        buttonState : id,
        scanned : false
    })
}
handleBarCodeScanned = async ({type,data}) => {
    const {buttonState} = this.state
    if(buttonState === "bookID"){
        this.setState({
            scanned : true,
            scannedBookID : data,
            buttonState : 'normal'
        })
    }
    else if(buttonState === "studentID"){
        this.setState({
            scanned : true,
            scannedstudentID : data,
            buttonState : 'normal'
    })
} 
}
render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState !== "normal" && hasCameraPermissions){
      return(
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
else if(buttonState === "normal"){

return(
<View style = {styles.container}>
    <View>
    <Image
    source = {require("../assets/booklogo.jpg")}
    style = {{width : 200, height : 200}}
    />  
     <Text style = {{textAlign : 'center', fontSize : 30}}>
         W.I.L.Y
     </Text>
    </View>
    <View style = {styles.inputView}>
        <TextInput style = {styles.InputBox}
        placeholder = "Book ID"
        value = {this.state.scannedBookID}
        />
        <TouchableOpacity style = {styles.scanButton}
        onPress = {() => {
            this.getCameraPermissions("bookID")
        }}>
<Text style = {styles.buttonText}>
    SCAN
</Text>
        </TouchableOpacity>
    </View>
    <View style = {styles.inputView}>
<TextInput style = {styles.InputBox}
placeholder = "Student ID"
        value = {this.state.scannedStudentID}/>
            <TouchableOpacity style = {styles.scanButton}
        onPress = {() => {
            this.getCameraPermissions("studentID")
        }}>
           
            <Text style = {styles.buttonText}>
    SCAN
</Text>
</TouchableOpacity>  
    </View>
</View>
    )
}
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    displayText : {
        fontSize : 15,
        textDecorationLine : 'underline',
    },
    scanButton : {
        backgroundColor : 'lightblue',
        padding : 10,
        margin : 10
    },
    buttonText : {
        fontSize : 20,
        textAlign : 'center',
        marginTop : 10,
    },
    InputBox : {
        width : 200,
        height : 40,
        borderWidth : 1.5,
        fontSize : 20
    },
    scannedButton : {
        backgroundColor : 'lightblue',
        width : 50,
        borderWidth : 1.5,

    }
})