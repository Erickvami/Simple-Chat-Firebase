import * as React from 'react';
import {
  Text,
  View,
  BackHandler,
  AsyncStorage,
  TextInput,
  Button,
  ScrollView,
  SectionList,
} from 'react-native';
import { Constants } from 'expo';
import Modal from 'react-native-modal';
import {querys} from './db/querys';
import { Card } from 'react-native-paper';
import Chat from './Chat';
import { Ionicons } from '@expo/vector-icons';
import SwipeUpDown from 'react-native-swipe-up-down';
import {styles} from './Styles/Styles-main';
//import Database from './Database.js';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isVisibleChat: false,
      currentChat: { Name: 'Unknown', Id: 0 },
      user: null,
      userInput: null,
    };
    
    this.RenderUsers = this.RenderUsers.bind(this);
    this.RenderUserSelection = this.RenderUserSelection.bind(this);
    this.CloseChat = this.CloseChat.bind(this);
  }
  CloseChat(){
    this.setState({isVisibleChat:false});
  }
  componentDidMount() {
    this.RenderUsers();
  }

  RenderUsers() {
    var that= this;
     AsyncStorage.getItem('user').then(function(u){
          if (u !== null) {
          var objectUser = JSON.parse(u);
           querys.Users.on(
        'value',
        function(users) {
          //alert(JSON.stringify(users));
          this.setState({
            user: objectUser,
            users: Object.keys(users.val())
              .map(key => users.val()[key])
              .filter(f => f.Id !== objectUser.Id),
          });
        },that);
          }
     });
        
     
// if (u !== null) {
//       //alert('paso');
//       var objectUser = JSON.parse(u);
//       alert(u);
//       //y();
      
//       // querys.Users.on(
//       //   'value',
//       //   function(users) {
//       //     alert(JSON.stringify(users));
//       //     this.setState({
//       //       user: objectUser,
//       //       users: Object.keys(users.val())
//       //         .map(key => users.val()[key])
//       //         .filter(f => f.Id !== objectUser.Id),
//       //     });
//       //   },this);
//     }
//     });
    
    
  }
  OpenChat(chat) {
    this.setState({ isVisibleChat: true, currentChat: chat });
  }
  RenderChat() {
    return <View>
    <Chat CloseChat={this.CloseChat} CurrentUser={this.state.user} Name={this.state.currentChat.Name} Id={this.state.currentChat.Id}/>
   
    </View>;
  }

  RenderUserSelection() {
    if (this.state.user !== null) {
      //alert('render user selection');
      //alert(JSON.stringify(this.state.user));
      return (
        <View style={{ backgroundColor: 'green' }}>
          <Text style={{ color: 'white' }}>Welcome {this.state.user.Name}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{ fontSize: 25 }}>I am:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ userInput: text })}
          />
          <Button
            title="Init"
            onPress={async () => {
              querys.GetUsersByName(this.state.userInput).once(
                'value',
                function(items) {
                  if (items.val() === null) {
                    var newUser = { 
                      Id: new Date().getTime(), 
                      Name: this.state.userInput,
                      Chats:[] 
                      };
                      querys.InsertNewUser(newUser);
                    AsyncStorage.setItem('user', JSON.stringify(newUser)).then(function(){
                    this.RenderUsers();
                    alert('New User created');  
                    });
                    
                  } else {
                    AsyncStorage.setItem(
                      'User',
                      JSON.stringify(items.val()[Object.keys(items.val())[0]])
                    ).then(function(){
                    this.RenderUsers();
                    alert('User selected');
                    });
                    
                  }
                },
                this
              );
            }}
          />
        </View>
      );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.RenderUserSelection()}
        <Card>
          <ScrollView>
            <SectionList
              sections={[{ title: 'Chats', data: this.state.users }]}
              renderItem={({ item }) => (
                <Card onPress={this.OpenChat.bind(this, item)}>
                  <View style={styles.listItem}>
                    <Ionicons name='md-person' size={30}/>
                    <Text style={styles.listItemText}>{item.Name}</Text>
                  </View>
                </Card>
              )}
              renderSectionHeader={({ section }) => (
                <Text style={styles.listHeader}>{section.title}</Text>
              )}
              keyExtractor={(item, index) => index}
            />
          </ScrollView>
        </Card>
        <Modal
          isVisible={this.state.isVisibleChat}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
          onRequestClose={() => this.setState({isVisibleChat:false})}
          >
          {this.RenderChat()}
        </Modal>
      </View>
    );
  }
}
