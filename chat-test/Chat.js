import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Picker,
  AsyncStorage,
  TextInput,
  Button,
  ScrollView,
  SectionList,
  Image,
} from 'react-native';
import { Constants } from 'expo';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './Styles/Styles-chat';
import {querys} from './db/querys';
class Chat extends React.Component{
constructor(props){
  super(props);
    this.state={
      Name:this.props.Name,
      Id:this.props.Id,
      User:this.props.CurrentUser,
      Messages:[],
      Message:''
    }
    this.SetChatData= this.SetChatData.bind(this);
}
componentDidMount(){
    this.SetChatData();
    //var that= this;
   
}
SetChatData(){
  querys.SearchChat(this.props.CurrentUser.Id,this.props.Id).on('value',function(data){
    this.setState({
      Name:this.props.Name,
      Id:this.props.Id,
      User:this.props.CurrentUser,
      Messages:data.val()!==null?Object.keys(data.val()).map(item=> data.val()[item]):[]
    });
  },this); 
}

render(){
   return <Card style={styles.modalChat}>
    <Text style={styles.listHeader}>
    <Ionicons name='md-chatbubbles' size={32}/>
    {this.state.Name}
    </Text>
    <ScrollView style={styles.messages} 
    onContentSizeChange={(contentWidth, contentHeight)=>{        
        this.scrollView.scrollToEnd({animated: true});
    }} ref={ref => this.scrollView = ref} >
    <SectionList
              sections={[{ title: '', data: this.state.Messages }]}
              renderItem={({ item }) => (
                <Card style={{width:'90%',backgroundColor:item.from===this.state.User.Id?'#5ccfe6':'gray',marginLeft:item.from===this.state.User.Id?'10%':'0%',marginTop:10}}>
                  <Text style={{color:'white',fontSize:18}}>{item.message}</Text>
                  <Text style={{color:'gray',backgroundColor:'white',textAlign:'right',fontSize:9}}>{new Date(item.date).toDateString().concat(' ',new Date(item.date).toLocaleTimeString())}</Text>
                </Card>
              )}
              renderSectionHeader={({ section }) => (
                <Text style={styles.listHeader}>{section.title}</Text>
              )}
              keyExtractor={(item, index) => index}
            />
    </ScrollView>
    <View style={{flexDirection:'row', width: '100%', alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:'#888', borderRadius:10, backgroundColor:'white'}}>
  <View style={{flex:4}}>
    <TextInput
    style={{backgroundColor:'white'}}
        value={this.state.Message}
    onChangeText={text=> this.setState({Message:text})} 
      />
  </View>
  <View style={{flex:1}}>
  <TouchableOpacity style={{marginLeft:30,flex:1,display:this.state.Message===''?'none':'flex'}} onPress={()=> {querys.SendMessage(this.state.User.Id,this.state.Id,this.state.Message); this.setState({Message:''})}}>
    <Ionicons name='md-send' color='#2ecc71' size={30}/>
</TouchableOpacity>
  </View>
</View>
    </Card>;
}
}

export default Chat;
