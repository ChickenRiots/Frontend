import React, { useState, useEffect, useRef } from "react";
import logo from './logo.svg';
import './App.css';
import { TimelineMax } from "gsap/all";
import { Timeline } from "react-gsap";
import { Tween } from "react-gsap";


function App() {

  let tl = new TimelineMax();

  useEffect(() => {
    //focus on main element for hotkey
    tl.fromTo()
  }, []);


  return (
    <div className="App">
        <h1 class="header layer_one">Chicken Riot</h1>
        <h1 class="header layer_two">Chicken Riot</h1>
        <Timeline target={ <div class="chicken">🐔</div>}>
    
          <Tween from={{opacity: 0}} to={{opacity: 1}}>
           
          </Tween>
        </Timeline>
        <div>
          <input class="text_input" placeholder="room id" type="text"></input>
          <input class="room_submit" type="submit" value="join"></input>
        </div>
    </div>
  );
}

export default App;
