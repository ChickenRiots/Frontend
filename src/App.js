import React, {useEffect, useState} from 'react';

import './App.css';

import io from 'socket.io-client';

import Chat from './comp/Chat'
// https://chickenriot.herokuapp.com/ https://superchatt.herokuapp.com/
let socketio = io('https://superchatt.herokuapp.com/');

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
      <Chat  socketio={socketio}/>
    </div>
  );
}

export default App;
