import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import firebase from 'firebase';
import uuid from 'uuid';
import { call } from 'react-native-reanimated';

const config = {
  apiKey: "AIzaSyCdgRdU-qT9RXGnIBSyEUNVvCJtGhai1Ck",
  authDomain: "colearning-282420.firebaseapp.com",
  databaseURL: "https://colearning-282420.firebaseio.com",
  projectId: "colearning-282420",
  storageBucket: "colearning-282420.appspot.com",
  messagingSenderId: "735554357895",
  appId: "1:735554357895:web:0f76e12b1e7a552f96c622",
  measurementId: "G-YGJ4EG8L4S"
}

class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } else {
      console.log("firebase apps already running...")
    }
  }

  login = async(user, success_callback, failed_callback) => {
    console.log("logging in");
    const output = await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(success_callback, failed_callback);
  }

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        this.login(user);
      } catch ({ message }) {
        console.log("Failed:" + message);
      }
    } else {
      console.log("Reusing auth...");
    }
  };

  createAccount = async (user) => {
    firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(function() {
        console.log("created user successfully. User email:" + user.email + " name:" + user.name);
        var userf = firebase.auth().currentUser;
        userf.updateProfile({ displayName: user.name})
        .then(function() {
          console.log("Updated displayName successfully. name:" + user.name);
          alert("User " + user.name + " was created successfully. Please login.");
        }, function(error) {
          console.warn("Error update displayName.");
        });
      }, function(error) {
        console.error("got error:" + typeof(error) + " string:" + error.message);
        alert("Create account failed. Error: "+error.message);
      });
  }

  uploadImage = async uri => {
    console.log('got image to upload. uri:' + uri);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref('avatar')
        .child(uuid.v4());
      const task = ref.put(blob);
    
      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          () => {
              /* noop but you can track the progress here */
          },
          reject /* this is where you would put an error callback! */,
          () => resolve(task.snapshot.downloadURL)
        );
      });
    } catch (err) {
      console.log('uploadImage try/catch error: ' + err.message); //Cannot load an empty url
    }
  }

  updateAvatar = (url) => {
    //await this.setState({ avatar: url });
    var userf = firebase.auth().currentUser;
    if (userf != null) {
      userf.updateProfile({ avatar: url})
      .then(function() {
        console.log("Updated avatar successfully. url:" + url);
        alert("Avatar image is saved successfully.");
      }, function(error) {
        console.warn("Error update avatar.");
        alert("Error update avatar. Error:" + error.message);
      });
    } else {
      console.log("can't update avatar, user is not login.");
      alert("Unable to update avatar. You must login first.");
    }
  }
     
  onLogout = user => {
    firebase.auth().signOut().then(function() {
      console.log("Sign-out successful.");
    }).catch(function(error) {
      console.log("An error happened when signing out");
    });
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref("Users");
  }
  get refUltimoMensaje() {
    return firebase.database().ref().child("Chats").orderByChild( "user/id_user" )
  }
  refUltimoMensajeOrigen(usuarioOrigen) {
    return firebase.database().ref().child("Chats").orderByChild( "user/id_user" ).equalTo(usuarioOrigen)
    //return firebase.database().ref("Chats");
  }
  refUltimoMensajeDestino(usuarioDestino) {
    return firebase.database().ref().child("Chats").orderByChild( "user/id_user" ).equalTo(usuarioDestino)
    //return firebase.database().ref("Chats");
  }

  parse = snapshot => {
    const {createdAt, id_user, userDestino } = snapshot.val();
    var ultimoMensaje = "";
    this.refOnUltimoMensaje(mensaje => ultimoMensaje=mensaje, id_user, userDestino.id_user)
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat
    //const timestamp = new Date(createdAt);
    const message = {
      id_user,
      userDestino,
      ultimoMensaje
    };
    return message;
  };

  refOn = callback => {
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  }
  refOnUltimoMensaje = (callback, usuarioOrigen, usuarioDestino) =>{
    this.refUltimoMensajeOrigen(usuarioOrigen)
    .limitToLast(1).on('child_added',mensaje => callback(mensaje.val()));
    this.refUltimoMensajeDestino(usuarioDestino)
    .limitToLast(1).on('child_added',mensaje => callback(mensaje.val()));
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  
  // send the message to the Backend
  // send = (messages, destino) => {
  //   alert("hola")
  //   for (let i = 0; i < messages.length; i++) {
  //     console.log(destino)
  //     const { text, user, destino } = messages[i];
  //     const message = {
  //       destino: destino,
  //       text,
  //       user,
  //       createdAt: this.timestamp,
  //     };
  //     console.log(message)
  //     //this.ref.push(message);
  //   }
  // };
  send(messages, userDestino){
    for (let i = 0; i < messages.length; i++) {
      console.log(messages)
      const { text, user } = messages[i];
      const message = {
        user,
        userDestino: userDestino,
        text,
        createdAt: this.timestamp,
      };
      this.ref.push(message);
    }
  };

  refOff(id_userOrigen, chatList) {
    this.ref.off();
    this.refUltimoMensajeOrigen(id_userOrigen).off();
    for(var i=0; i<chatList.length;i++){
      this.refUltimoMensajeDestino(chatList[i].userDestino.id_user).off();
    }
    this.refUltimoMensaje.off();
  }
  refOffStart() {
    this.ref.off();
    this.refUltimoMensaje.off();
  }
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
