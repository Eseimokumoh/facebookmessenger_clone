import React, {useState, useEffect} from 'react';
import './App.css';
import {FormControl, Input} from '@mui/material';
import Message from "./Message";
import db from "./firebase";
import firebase from 'firebase/app';
import 'firebase/firestore';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@mui/material';
//downgrade the firebase version to 8.2.3 just like this in whatsapp clone
//use these configurations for whatsapp clone 
//downgrade the firebase and work on the configuration and codes 
//with this app

function App() {
  const [input, setInput]= useState('');
  const [messages, setMessages]= useState([]);
  const [username, setUsername]= useState('');
  
 //useState = variables in REACT
 //useEffect = run code on a condition in REACT

  useEffect(()=>{
    // run once when the app component loads
    db.collection('messages').orderBy('timestamp', 'desc')
    .onSnapshot(snapshot =>{
      setMessages(snapshot.docs.map(doc => ({id: doc.id , message:doc.data()})))
    });
  },  [])

  useEffect(() => {
    setUsername(prompt('Please enter your name'))

  }, []) //condition

  const sendMessage = (event)=>{
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  
  return (
    <div className="App">
      <img src='https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100'alt="facebook-messenger-logo"/>
      <h1>Facebook Messenger</h1>
      <h2>Welcome {username}</h2>

      <form className='app_form'>
      <FormControl className='app_formControl'>
         <Input className='app_input' placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)}/>

         <IconButton className='app_iconButton' disabled={!input} variant='contained'color='primary' type='submit' onClick={sendMessage} placeholder='send Message'>
            <SendIcon/>
         </IconButton>

      </FormControl>
      </form>

      <FlipMove>
       {
        messages.map(({id, message}) => <Message key={id} username={username} message={message}/>)
       }
      </FlipMove>

    </div>
  );
}

export default App;
