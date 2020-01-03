import React , {useState, useEffect} from 'react';

export default function Seating(props) {

    const [Animate, setAnimate] = useState([])

    useEffect(() => {
        
        // listen for message
        props.socketio.on('animate', async (msg) => {
            console.log(msg)
            let newMessage = await msg 
            setAnimate(newMessage);
            console.log(newMessage);
        })
   
    })
    const click = (e) =>{
        e.preventDefault();
        props.socketio.emit('animate', '1', "fire");

    }


    return (
    <div className="seat-box" >
        <input onClick={click} type="submit" value="🔥"/>
    </div>
    )
}
