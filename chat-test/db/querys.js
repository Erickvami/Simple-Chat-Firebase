import {db} from './db';

export const querys= {
Users: db.database().ref().child('Users'),
GetUsersByName:function(currentUser){
  return db.database().ref().child('Users').orderByChild('Name').equalTo(currentUser);
},
InsertNewUser:function(newUser){
 return db.database().ref().child('Users').push().set(newUser);
},
GetChatMessages:function(me,myChat){
return db.database().ref().child('Chats').orderByChild('User').equalTo(me);
},
SendMessage(me,myChat,message){
  return db.database().ref().child('Chats')
  .child(Math.max(me,myChat)+'-'+Math.min(me,myChat))
  .push().set({
    date:new Date().getTime(),
    from:me,
    message:message
    });
}
,
SearchChat:function(me,myChat){
  return db.database().ref().child('Chats').child(Math.max(me,myChat)+'-'+Math.min(me,myChat)).orderByChild('date');
},
Alert:function(obj){
  return alert(JSON.stringify(obj));
}
};

/*
Object.keys(users.val())
              .map(key => users.val()[key])
              .filter(f => f.Id !== objectUser.Id)

*/