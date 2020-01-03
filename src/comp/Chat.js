import React , {useState, useEffect} from 'react';
import Riot from '../images/chickenriot.png'

import './chat.css'

import nameList from './nameList'

export default function Chat(props) {

    //CREATES USERS NAME
    const randomName =  nameList[Math.floor(Math.random() * nameList.length)];
    const [Username, setUsername] = useState(randomName);

    const [Typing, setTyping] = useState(false)

    const [Messages, setMessages] = useState([])

    const [Input, setInput] = useState('')

    useEffect(() => {
        
        // listen for typing
        props.socketio.on('typing', () => {
            setTyping(true);
        });

        // listen for message
        props.socketio.on('chat message', async (msg) => {
            console.log(msg)
            let newMessage = await msg 
            setMessages([...Messages , newMessage]);
            console.log(Messages);
        })
   
    }, [Messages])

    const handleChange = (e) =>{
        e.preventDefault();
        props.socketio.emit('typing');
        setInput(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setTyping(false);
        if(Input.length === 0) {
            alert('Please enter a message!'); 
            return null;
        }
        props.socketio.emit('chat message',Username, Input, function(data) {
            console.log(data)});
        setInput('');
    }

    const handleUsername = (e) =>{
        e.preventDefault();
        setUsername(e.target.value)
    }

    let now = Date.now();

    return (
    <div className="chat-box" >
            <img src={Riot} alt="Chicken Riot Logo" className="logo" />
        <div className="messages">
        {Messages === null || Messages === undefined || Messages.length === 0 ? <p className="txt-message">Yell something! </p>
        : Messages.map((message, i) => <p className="txt-message" key={i}> <span className="usr-chat-name">{message.split(':')[0]}</span> | {message.split(':')[1]}</p>)}<br/>
        </div>
            <label >Username</label><br/>
            <input
                className="user-input"
                placeholder={Username}
                name="username"
                value={Username}
                onChange={e => handleUsername(e)} />
        <form id="form" onSubmit={e => handleSubmit(e)}><br/>
            <input
            className="mess-input"
                placeholder="Send a message..." 
                name="message"
                value={Input}
                onChange={e => handleChange(e)}></input>
            <button type="button" onClick={e => handleSubmit(e)} className="send-button"> > </button>
        </form>
    </div>
    )
}
