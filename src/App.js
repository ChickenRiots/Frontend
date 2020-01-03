import React, {useEffect, useState} from 'react';

import './App.css';

import io from 'socket.io-client';

import Chat from './comp/Chat'
import Theater from './comp/Theater';
// https://chickenriot.herokuapp.com/ https://superchatt.herokuapp.com/
let socketio = io('https://chickenriot.herokuapp.com/');

function App() {

  //link the user gives to share to everyone
  const [Link, setLink] = useState('')

  //user data
  const [UserData, setUserData] = useState({});

  //link submission functions
  const handleChange = e =>{
    e.preventDefault();
    setLink(e.target.value)
  }

  const handleSubmit = e =>{
    e.preventDefault();
    let data = Link
    socketio.emit( 'iframe' ,  data)
  }

useEffect(() => {
  socketio.emit('client connected');
  // create random room function later
  socketio.emit('room', 'new room')
  socketio.on('client connected', data => setUserData(data) )
}, [])

console.log(UserData)
return (
  <>
      <input
        placeholder="paste a link here to start sharing!"
        name="link"
        onSubmit={e => handleSubmit(e)}
        onChange={e => handleChange(e)} />
    <div className="App">
      {Link.includes('youtube') ? 
      <div className="theater"> 
        <Theater socketio={socketio} />
      </div>:
      <iframe src={Link}></iframe>}
      <div className="chat">
        <Chat  socketio={socketio}/>
      </div>
    </div>
  </>
  );
}

export default App;
