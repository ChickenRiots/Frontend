import React , {useState, useEffect} from 'react';
import testAvatar from '../images/testAvatar.png'
import fist from '../images/fist.png'
import peace from '../images/peace.png'
import { TimelineLite } from "gsap/all";

export default function Seating(props) {
    const [Users, setUsers] = useState()
    const [Animate, setAnimate] = useState([])
    const cards = []
    const fists = []
    const fists2 = []

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
                if(Animate.type.type === "mosh"){
                    tl.to(card[1], 0.25, {x: 8, ease: "bounce"})
                    tl.to(card[1], 0.45, {x: -8, ease: "bounce"})
                    tl.repeat(15);
                } else if(Animate.type.type === "mosh2"){
                    tl.to(card[1], 0.25, {y: 8, ease: "bounce"})
                    tl.to(card[1], 0.45, {y: -8, ease: "bounce"})
                    tl.repeat(15);
                } else if(Animate.type.type === "fist"){
                    tl.fromTo(fists[index][1], .2, {opacity: 1, y: 55}, {y: -15, rotation: 0, ease: "bounce"})
                    tl.to(fists[index][1], .45, {y: 105 })
                }  else if(Animate.type.type === "peace"){
                    tl.fromTo(fists2[index][1], 1, {opacity: 1, y: 55}, {y: -15, rotation: -15, ease: "bounce"})
                    tl.to(fists2[index][1], .45, {rotation: 15})
                    tl.to(fists2[index][1], .45, {y: 105 })
                }
            }
        })
    }, [Animate])

    //move up down
    const click = (e) =>{
        e.preventDefault();
        props.socketio.emit('animate', props.userId, {type:"mosh", value: "<>"});
    }
    //move up down
    const click3 = (e) =>{
        e.preventDefault();
        props.socketio.emit('animate', props.userId, {type:"mosh2", value: "^"});
    }

    //raise fist
    const click4 = (e) =>{
        e.preventDefault();
        props.socketio.emit('animate', props.userId, {type:"fist", value: "fist"});
    }

    const click5 = (e) =>{
        e.preventDefault();
        props.socketio.emit('animate', props.userId, {type:"peace", value: "peace"});
    }


    console.log(Animate)

    return (

        <div className="seats">
            
            <div className="icon-box" >
                <input className="icon" onClick={click} type="submit" value="move"/>
                <input className="icon" onClick={click3} type="submit" value="move2"/>
                <input className="icon" onClick={click4} type="submit" value="fist"/>
                <input className="icon" onClick={click5} type="submit" value="peace"/>

            </div>
            
            <div className="seatChart">

                {// map through the elements
                props.users.map((element, index) => (
                    <>
                    <div
                    key={element.id}
                    className="avatar"
                    ref={div => (cards[index] = [element, div])}

                    >
                    <img class="peaceImage" src={peace} ref={img => (fists2[index] = [element, img])} />
                    <img class="avatarImage" src={testAvatar} />
                    <img class="fistImage" src={fist} ref={img => (fists[index] = [element, img])} />
                </div>
                </>
            ))}
          </div>
        </div>


    )
}
