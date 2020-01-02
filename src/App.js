import React, {useEffect, useState} from 'react';

import './App.css';
import { TimelineMax } from "gsap/all";
import testAvatar from "./images/testAvatar.png";

import io from 'socket.io-client';

import Chat from './comp/Chat'
// https://chickenriot.herokuapp.com/ https://superchatt.herokuapp.com/
let socketio = io('https://chickenriot.herokuapp.com/');

function App() {

  //user data
const [UserData, setUserData] = useState({});
const [Animate, setAnimate] = useState([]);

useEffect(() => {
  socketio.emit('client connected');
  // create random room function later
  socketio.emit('room', 'new room')
  socketio.on('client connected', data => setUserData({data}) )
  socketio.on('animate', data => setAnimate([...Animate, data]))
}, [])

useEffect(() => {
  // select the most recent animation in the list and animate the referenced div. 
},[Animate])
console.log(UserData)
  
  return (
      <div className="App">
        <Chat socketio={socketio}/>
          {UserData.data ? UserData.data.map((id, index) => (
          <img src={testAvatar} key={id}/>
        )) : null}
      </div>
    );
}

export default App;
