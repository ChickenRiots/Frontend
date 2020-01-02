import React, {useEffect, useState} from 'react';

import './App.css';

import io from 'socket.io-client';

import Chat from './comp/Chat'
import Theater from './comp/Theater';
// https://chickenriot.herokuapp.com/ https://superchatt.herokuapp.com/
let socketio = io('https://chickenriot.herokuapp.com/');

function App() {

  //user data
const [UserData, setUserData] = useState({});

useEffect(() => {
  socketio.emit('client connected');
  // create random room function later
  socketio.emit('room', 'new room')
  socketio.on('client connected', data => setUserData(data) )
}, [])

console.log(UserData)
return (
    <div className="App">
      <div className="theater"> 
        <Theater />
      </div>
      <div className="chat">
        <Chat  socketio={socketio}/>
      </div>
    </div>
  );
}

export default App;
