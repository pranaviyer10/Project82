import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Header, Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class UserDetailsScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            userId: firebase.auth().currentUser.email,
            recieverId: this.props.navigation.getParam('details')["user_id"],
            requestId: this.props.navigation.getParam('details')["request_id"],
            itemName: this.props.navigation.getParam('details')["item_name"],
            description: this.props.navigation.getParam('details["description'),
            userName: '',
            userContact: '',
            userAddress: '',
            userRequestDocId: ''
        };
    };

    getUserDetails() {
        db.collection('users').where('email_id','==',this.state.recieverId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    userName: doc.data().first_name,
                    userContact: doc.data().contact,
                    userAddress: doc.data().address
                });
            });
        });

        db.collection('requested_items').where('user_id','==',this.state.requestId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({userRequestDocId:doc.id})
            });
        });
    };
    updateItemStatus=()=>{
        db.collection('all_exchanges').add({
            item_name: this.state.itemName,
            request_id: this.state.requestId,
            donor_id: this.state.userId,
            request_status: "User Interested"
        });
    };

    componentDidMount(){
        this.getUserDetails();
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:0.1}}>
                    <Header
                        leftComponent={<Icon name='arrow-left' type='feather' color='#696969' onPress={()=>then.props.navigation.goBack()}/>}
                        centerComponent={{text:"Donate Items", style={color:'#90A5A9',fontSize:20,fontWeight:'bold'}}}
                        backgroundColor='#EAF8FE'
                    />
                </View>
                <View style={{flex:0.3}}>
                    <Card
                        title={"Item Information"}
                        titleStyle={{fontSize:20}}
                    >
                        <Card>
                            <Text style={{fontWeight:'bold'}}>Name : {this.state.itemName}</Text>
                        </Card>
                        <Card>
                            <Text style={{fontWeight:'bold'}}>Description : {this.state.description}</Text>
                        </Card>
                        <Card>
                            <Text style={{fontWeight:'bold'}}>Contact : {this.state.userContact}</Text>
                        </Card>
                        <Card>
                            <Text style={{fontWeight:'bold'}}>Address : {this.state.userAddress}</Text>
                        </Card>
                    </Card>
                </View>
                <View style={styles.buttonContainer}>
                    {
                        this.state.userId !== this.state.recieverId
                        ?(
                            <TouchableOpacity
                                style={styles.button}
                                onPress={()=>{
                                    this.updateItemStatus()
                                    this.props.navigation.navigate('MyBarters')
                                }}
                            >
                                <Text>I want to Exchange</Text>
                            </TouchableOpacity>
                        )
                        :null
                    }
                </View>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    buttonContainer : {
      flex:0.3,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:200,
      height:50,
      justifyContent:'center',
      alignItems : 'center',
      borderRadius: 10,
      backgroundColor: 'orange',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    }
});