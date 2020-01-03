import React, {useEffect, useState} from 'react';

import './App.css';

import io from 'socket.io-client';

import Chat from './comp/Chat'
import Theater from './comp/Theater';
import Seating from './comp/Seating';
//MAIN SERVER: https://chickenriot.herokuapp.com/ TEST:https://superchatt.herokuapp.com/
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
  const [SyncedV, setSyncedV] = useState([]);
  const [SYNCED, setSYNCED] = useState(false)

  //link submission functions
  const handleChange = e =>{
    e.preventDefault();
    setLink(e.target.value)
  }

  // creates the video τνΠ
  const handleSubmit = e =>{
    e.preventDefault();
    console.log(Link)
    socketio.emit( 'iframe' ,  Link.toString());
    // when serach is submitted then the html decided if its youtube or not
    setSearched(true)
  }
  // SYNC BUTTON   (ノ｀Д)ノo  w  (ノ｀Д)ノo
  const SyncHandle= e =>{
    e.preventDefault();
    socketio.emit( 'sync', SyncedV.toString());
    
    console.log('link, sink', Link , SyncedV.toString());
    
    setLink(SyncedV.toString())

    handleSubmit(e);
  }

useEffect(() => {
  // INIT CONNECT
  socketio.emit('client connected');
  // create random room function later
  socketio.emit('room', 'new room')
  // COLLECT CONNECTIONS
  socketio.on('client connected', data => setUserData(data) )
  // VIDEO SYNC SOCKET
  socketio.on('sync', syncVideo =>{
    setSyncedV(syncVideo)
  })
  socketio.on('userId', data => setUserId(data))
}, [])

if(Searched){
return (
  <>
    <form onSubmit={e => handleSubmit(e)} className="searchbar" >
    <input
    className="search-input"
        placeholder="paste a link here to start sharing!"
        name="links"
        onChange={e => handleChange(e)} 
        />
      <button onSubmit={e => handleSubmit(e)}> Search </button>
      <button onClick={e => SyncHandle(e)} disabled="true"> sync </button>
    </form>
    <div className="App">
      {Link != undefined &&  Link.includes('youtube')  ?
      <div className="theater"> 
        <Theater socketio={socketio} Link={Link}/>
      </div>:
      <iframe crossorigin="anonymous" className="frame" src={Link}></iframe>}

      <div className="chat">
        <Chat  socketio={socketio}/>
      </div>
          </div>
      {UserData ? <Seating socketio={socketio} users={UserData} userId={UserId}/> : <div>loading</div>
      }
      
  </>
  )}else{
    return(
       <>
    <form onSubmit={e => handleSubmit(e)} className="searchbar" >
    <input
    className="search-input"
        placeholder="paste a link here to start sharing!"
        name="links"
        onChange={e => handleChange(e)} 
        />
      <button onSubmit={e => handleSubmit(e)}> Search </button>
      <button onClick={e => SyncHandle(e)} disabled="true"> sync </button>
    </form>
    <div className="App">
      <div className="vid">
        <iframe width="960" height="700" src="https://www.youtube.com/embed/hHW1oY26kxQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div className="chat">
        <Chat  socketio={socketio}/>
      </div>
      
    </div>
    {UserData ? <Seating socketio={socketio} users={UserData} userId={UserId}/> : <div>loading</div>
      }
  </>
    )
  }
}

export default App;
