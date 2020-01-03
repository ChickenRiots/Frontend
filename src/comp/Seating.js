import React , {useState, useEffect} from 'react';
import testAvatar from '../images/testAvatar.png'
import { TimelineLite } from "gsap/all";

export default function Seating(props) {
    const [Users, setUsers] = useState()
    const [Animate, setAnimate] = useState([])
    const cards = []
    const textFields = []

    useEffect(() => {
        // listen for message
        props.socketio.on('animate', async (msg) => {
            console.log(msg)
            let newMessage = await msg 
            setAnimate(newMessage);
        })
    })

    useEffect(() => {
        cards.map((card, index) => {
            console.log(Animate)
            if(card[0] === Animate.id){
                let tl = new TimelineLite()
                if(Animate.type.type === "emoji"){
                    tl.fromTo(card[1], 0.25, {y: 0}, {y: 10, repeat:15, onComplete: function(){
                        tl.clear()
                    }})
                } else if(Animate.type.type === "text") {
                    textFields[index][1].textContent = Animate.type.value
                    tl.fromTo(textFields[index][1], 1, {y: 0, opacity: 0}, {opacity: 1, y: -175, onComplete: function(){
                        tl.clear()
                    }})
                    tl.to(textFields[index][1], 1, {opacity: 0})
                }
                
            }
        })
    }, [Animate])

    const click = (e) =>{
        e.preventDefault();
        props.socketio.emit('animate', props.userId, {type:"emoji", value: "🔥"});
    }

    const click2 = (e) =>{
        e.preventDefault();
        props.socketio.emit('animate', props.userId, {type:"text", value: "Hi hi"});
    }

    console.log(Animate)

    return (

        <div className="seats">
            
            <div className="icon-box" >
                <input className="icon" onClick={click} type="submit" value="🔥"/>
                <input className="icon"onClick={click2} type="submit" value="Hi hi"/>
            </div>
            
            <div className="seatChart">

                {// map through the elements
                props.users.map((element, index) => (
                    <div
                    key={element.id}
                    className="avatar"
                    ref={div => (cards[index] = [element, div])}
                    >
                    <p class="textParagraph" ref={p => (textFields[index] = [element, p])}></p>
                    <img src={testAvatar} style={{width: (100/props.users.length) + "%"}}/>
                </div>
            ))}
          </div>
        </div>


    )
}
