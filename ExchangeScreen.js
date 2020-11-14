import React, {Component} from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class ExchangeScreen extends Component{
    constructor() {
        super();
        this.state={
            userId: firebase.auth().currentUser.email,
            itemName: '',
            description: ''
        }
    }

    createUniqueId() {
        return Math.random().toString(36).substring(7);
    }

    addItem = (itemName, description) => {
        var userId = this.state.userId;
        var randomRequestId = this.createUniqueId()
        db.collection('requested_items').add({
            "user_id": userId,
            "item_name": itemName,
            "description": description,
            "request_id": randomRequestId
        })

        this.setState({
            itemName: '',
            description: ''
        })

        return Alert.alert("Item Successfully Added!")
    }

    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title="Exchange Items"/>
                <KeyboardAvoidingView style={styles.keyboardStyle}>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Enter Item Name"}
                        onChangeText={(text)=>{
                            this.setState({
                                itemName: text
                            })
                        }}
                        value={this.state.itemName}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        multiline
                        numberOfLines={7}
                        placeholder={"Description"}
                        onChangeText={(text)=>{
                            this.setState({
                                description: text
                            })
                        }}
                        value={this.state.description}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{this.addItem(this.state.itemName,this.state.description)}}
                    >
                        <Text>Add Item</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyboardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
    },
});