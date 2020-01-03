import React , {useState, useEffect} from 'react';
import testAvatar from '../images/testAvatar.png'

export default function Seating(props) {
    const [Users, setUsers] = useState([])
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

    useEffect(() => {

    }, [setAnimate])

    const click = (e) =>{
        e.preventDefault();
        props.socketio.emit('animate', '1', "fire");
    }

    console.log(props)

    return (

        <div className="seats">
            
              <div className="icon-box" >
                <input onClick={click} type="submit" value="🔥"/>
            </div>
        </div>


    )
}
