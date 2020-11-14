import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDcbrrFUo-l4nLs_ejfZxXS9ChKGN3r0mo",
  authDomain: "bartersystemapp-2bb89.firebaseapp.com",
  databaseURL: "https://bartersystemapp-2bb89.firebaseio.com",
  projectId: "bartersystemapp-2bb89",
  storageBucket: "bartersystemapp-2bb89.appspot.com",
  messagingSenderId: "760283983054",
  appId: "1:760283983054:web:d26ccea97b97d6577ab49f"
}
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();