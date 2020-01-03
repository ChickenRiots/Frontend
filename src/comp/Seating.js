import React , {useState, useEffect} from 'react';
import testAvatar from '../images/testAvatar.png'
import { TimelineLite } from "gsap/all";

export default function Seating(props) {
    const [Users, setUsers] = useState()
    const [Animate, setAnimate] = useState([])
    const cards = []

    useEffect(() => {
        // listen for message
        props.socketio.on('animate', async (msg) => {
            console.log(msg)
            let newMessage = await msg 
            setAnimate(newMessage);
        })
    })

    useEffect(() => {
        cards.map(card => {
            console.log(card[0])
            if(card[0] === Animate.id){
                let tl = new TimelineLite()
                tl.fromTo(card[1], 4, {x: 0}, {x: 50, onComplete: function(){
                    tl.clear()
                }})
                
            }
        })
    }, [Animate])

    const click = (e) =>{
        e.preventDefault();
        props.socketio.emit('animate', props.userId, "fire");
    }

    console.log(Animate)

    return (

        <div className="seats">
            
            <div className="icon-box" >
                <input onClick={click} type="submit" value="🔥"/>
            </div>

             {// map through the elements
            props.users.map((element, index) => (
            <div
              key={element.id}
              className="card-element"
              ref={div => (cards[index] = [element, div])}
              style={{ left: 150 * index}}
            >
                <img src={testAvatar} />
            </div>
          ))}
        </div>


    )
}
