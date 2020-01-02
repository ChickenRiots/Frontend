import React, { useState, useEffect, useRef } from "react";
import logo from './logo.svg';
import './App.css';
import { TimelineMax } from "gsap/all";
import { Timeline } from "react-gsap";
import { Tween } from "react-gsap";

import MultipleElements from "./testMultiple"


function App() {  
  return (
    <div className="App">
        <h1 class="header layer_one">Chicken Riot</h1>
        <h1 class="header layer_two">Chicken Riot</h1>
        {/* <Timeline target={ <div class="chicken">🐔</div>}>
    
          <Tween from={{opacity: 0, x:"-7500px"}} to={{x:0, opacity: 1}}>
           
          </Tween>
        </Timeline> */}
        <MultipleElements />
        <div>
          <input class="text_input" placeholder="room id" type="text"></input>
          <input class="room_submit" type="submit" value="join"></input>
        </div>
    </div>
  );
}

export default App;
