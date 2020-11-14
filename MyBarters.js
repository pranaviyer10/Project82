import React, {Component} from 'react';
import {View,Text,TouchableOpacity,FlatList,StyleSheet} from 'react-native';
import {Icon,ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config';

export default class MyBarters extends Component{
    constructor(){
        super();
        this.state={
            donorId: firebase.auth().currentUser.email,
            allExchanges: []
        };
        this.requestRef=null
    };

    getAllExchanges=()=>{
        this.requestRef=db.collection('all_exchanges').where('donor_id','==',this.state.donorId)
        .onSnapshot((snapshot)=>{
            var allExchanges=[];
            snapshot.docs.map((doc)=>{
                var exchange=doc.data();
                exchange['doc_id']=doc.id;
                allExchanges.push(exchange)
            });
            this.setState({
                allExchanges: allExchanges
            });
        });
    };

    componentDidMount(){
        this.getAllExchanges();
    };

    componentWillUnmount(){
        this.requestRef();
    }

    keyExtractor=(item,index)=>index.toString();

    renderItem=({item,i})=>{
        return(
            <ListItem
                key={i}
                title={itemm.item_name}
                subtitle={item.description}
                titleStyle={{color:'black',fontWeight:'bold'}}
                rightElement={
                    <TouchableOpacity style={styles.button}
                        onPress={()=>{
                            this.props.navigation.navigate("ReceiverDetails",{"details":item})
                        }}
                    >
                        <Text style={{color:'#ffff'}}>View</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        );
    };

    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title="Exchange Items" navigation={this.props.navigation}/>
                <View style={{flex:1}}>
                    {
                        this.state.allExchanges.length===0
                        ?(
                            <View style={styles.subContainer}>
                                <Text style={{ fontSize: 20}}>List Of All Requested Books</Text>

                            </View>
                        )
                        :(
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.state.allExchanges}
                                renderItem={this.renderItem}
                            />
                        )
                    }
                </View>
            </View>
        )
    }
};

const styles=StyleSheet.create({
    subContainer:{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        }
    }
})