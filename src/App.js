import React, {useState} from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC24WitlFu1qxn8sNXu-N_StDLV21tvxCY",
  authDomain: "test2-19bcc.firebaseapp.com",
  projectId: "test2-19bcc",
  storageBucket: "test2-19bcc.appspot.com",
  messagingSenderId: "661195503013",
  appId: "1:661195503013:web:489afb9591efb7df27244c",
  measurementId: "G-D5HKS4X5W5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');

  
  
  const handleClickFetchButton = async () => {
    const db = firebase.firestore();
    //collection 取得
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    const _users = [];
    snapshot.forEach(doc => {
      _users.push({
        userId: doc.id,
        ...doc.data()
      })
    });
  };


  const handleClickAddButton = async () => {
    if (!userName || !age) {
      alert('"username"or"age"が空です');
        return;
    }
    const parsedAge = parseInt(age, 10);

    if ( isNaN(parsedAge) ) {
      alert('numberは半角の数字でセットしてください');
      return;
    }

    const db = firebase.firestore();
    await db
    .collection("users")
    .add({
      name: userName,
      age: parsedAge
    });

    setUserName('');
    setAge('');
  };
    
    
    setUsers(_users);

    //特定の条件に合うものだけ取得(where,limit)
    /*
    const usersRef = db.collection('users');
    const snapshot = await usersRef
    .where("age", ">=", 20)
    .limit(1)
    .get();
    snapshot.forEach(doc => {
      console.log(doc.id, doc.data());
    });
    */

    // document取得
    /*
    const userRef = db.collection('users').doc('cTHCCZTUjcDzyy2RSMMj')
    const doc = await userRef.get()
    console.log('Document data:', doc.data());
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
    */

  //データベースの変更
  /*
  const handleClickSetButton = async () => {
    const db = firebase.firestore();
    await db
    .collection("users")
    .doc("1")
    .set({
      name: "設定君",
      age: 99
    });
  };

  const handleClickEditButton = async () => {
    const db = firebase.firestore();
    await db
    .collection("users")
    .doc("1")
    .set({ name: "変更君" }, { merge: true });
  };

  const handleClickAddButton = async () => {
    const db = firebase.firestore();
    await db
    .collection("users")
    .add({
      name: "追加君",
      age: 1000
    });
  };
  */

  const userListItems = users.map(user => {
    return(
      <li key={user.userId}> {user.name} : {user.age} : {user.location} </li>
    )});

  return (
    <div className="App">
      <h1>hello world</h1>
      <button onClick={handleClickFetchButton}>取得</button>
      <button onClick={handleClickSetButton}>設定</button>
      <button onClick={handleClickEditButton}>変更</button>
      <button onClick={handleClickAddButton}>追加</button>

      <ul>{userListItems}</ul>
    </div>
  );
};

export default App;
