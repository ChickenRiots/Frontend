import React, {useEffect, useState} from 'react';

import './App.css';

import io from 'socket.io-client';

import Chat from './comp/Chat'
import Theater from './comp/Theater';
import Seating from './comp/Seating';
// https://chickenriot.herokuapp.com/ https://superchatt.herokuapp.com/
let socketio = io('https://chickenriot.herokuapp.com/');

function App() {

  //link the user gives to share to everyone
  const [Link, setLink] = useState('')

  //user data
  const [UserData, setUserData] = useState();

  //user id
  const [UserId, setUserId] = useState();

  //bool
  const [Searched, setSearched] = useState(false)

  // synced video
  const [SyncedV, setSyncedV] = useState([])

  //link submission functions
  const handleChange = e =>{
    e.preventDefault();
    setLink(e.target.value)
  }

  const handleSubmit = e =>{
    e.preventDefault();
    socketio.emit( 'iframe' ,  Link);
    // when serach is submitted then the html decided if its youtube or not
    setSearched(true)
  }

  const SyncHandle= e =>{
    e.preventDefault();
    setSearched(true);
    console.log('link, sink',Link, SyncedV)
    if(Link === SyncedV){
      return 'Already Synced'
    } else{ setLink(SyncedV) }
  }

useEffect(() => {
  socketio.emit('client connected');
  // create random room function later
  socketio.emit('room', 'new room')
  socketio.on('client connected', data => setUserData(data) )
  socketio.on('sync', syncVideo =>{
    setSyncedV(syncVideo)
  })

  socketio.on('client connected', data => setUserData(data))
  socketio.on('userId', data => setUserId(data))
}, [])

console.log(UserId)
if(Searched){
return (
  <>
    <form onSubmit={e => handleSubmit(e)}>
    <input
        placeholder="paste a link here to start sharing!"
        name="links"
        onChange={e => handleChange(e)} 
        />
      <button onSubmit={e => handleSubmit(e)}> Search </button>
    </form>
    <div className="App">
      {Link.includes('youtube') ? 
      <div className="theater"> 
        <Theater socketio={socketio} Link={Link}/>
      </div>:
      <iframe crossorigin="anonymous" className="frame" src={Link}></iframe>}

      <div className="chat">
        <Chat  socketio={socketio}/>
        <button onClick={e => SyncHandle(e)}> sync </button>
      </div>
          </div>
      {UserData ? <Seating socketio={socketio} users={UserData} userId={UserId}/> : <div>loading</div>
      }
      
  </>
  )}else{
    return(
       <>
    <form onSubmit={e => handleSubmit(e)}>
    <input
        placeholder="paste a link here to start sharing!"
        name="links"
        onChange={e => handleChange(e)} 
        />
      <button onSubmit={e => handleSubmit(e)}> Search </button>
    </form>
    <div className="App">
      <iframe crossorigin="anonymous" className="frame" src={Link}></iframe>
      <div className="chat">
        <Chat  socketio={socketio}/>
        <button onClick={e => SyncHandle(e)}> sync </button>
      </div>
      
    </div>
    {UserData ? <Seating socketio={socketio} users={UserData} userId={UserId}/> : <div>loading</div>
      }
  </>
    )
  }
}

export default App;
