import firebase from 'firebase'; // 4.8.1

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyCdgRdU-qT9RXGnIBSyEUNVvCJtGhai1Ck",
        authDomain: "colearning-282420.firebaseapp.com",
        databaseURL: "https://colearning-282420.firebaseio.com",
        projectId: "colearning-282420",
        storageBucket: "colearning-282420.appspot.com",
        messagingSenderId: "735554357895",
        appId: "1:735554357895:web:0f76e12b1e7a552f96c622",
        measurementId: "G-YGJ4EG8L4S"
      });
    }
  }
  checkAuth = () =>
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      if (!user) {  
        firebase.auth().signInAnonymously();
      }
    })

  send = messages => {
    messages.forEach(item => {
      const messages = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user
      }
      this.db.push(messages)
    });
  }
  parse = messages => {
    const { user, text, timestamp } = messages.val()
    const { key: _id } = messages
    const createAt = new Date(timestamp)

    return {
      _id,
      createAt,
      text,
      user
    }
  }

  get = callback => {
    this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
  }

  off() {
    this.db.off
  }
  get db() {
    return firebase.database().ref('messages')
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}
export default new Fire();
