const firebaseConfig = {
  apiKey: "AIzaSyA5tZPpMdmIxUgO7VmQdqQEYScWZ40H-nE",
  authDomain: "venus-pro-c12b6.firebaseapp.com",
  projectId: "venus-pro-c12b6",
  storageBucket: "venus-pro-c12b6.firebasestorage.app",
  messagingSenderId: "1042732928236",
  appId: "1:1042732928236:web:44a6297a681f5a3739e9c9",
  measurementId: "G-7JEM6JQEEC"
};

//opret forbindelse til firebase
firebase.initializeApp(firebaseConfig)
console.log('firebase startet med: ', firebaseConfig.projectId)


//vi får nu et fire store objekt som vi bruger til at komunikere med firestore
var db = firebase.firestore()
console.log('forbindelse til firestore startet')