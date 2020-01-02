import React , {useState, useEffect} from 'react'

export default function Chat(props) {

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
        })
   
    }, [Messages, Typing])

    const handleChange = (e) =>{
        e.preventDefault();
        props.socketio.emit('typing');
        setInput(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setTyping(false);
        if(Input.length === 0) {
            alert('Please enter a message!'); 
            return null;
        }
        props.socketio.emit('chat message', 'username', Input );
        setInput('');
    }

    return (
    <div>
{Messages === null || Messages === undefined ? null : Messages.map((message, i) => <ul key={i}>{message}</ul>)}<br/>
        ....
        <form id="form" onSubmit={e => handleSubmit(e)}>
            <input
                placeholder="Send a message..." 
                name="message"
                value={Input}
                onChange={e => handleChange(e)}></input>
            <button type="button" onClick={e => handleSubmit(e)}>send</button>
        </form>
    </div>
    )
}
