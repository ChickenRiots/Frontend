import React, { useState, useEffect, useRef } from "react";

import { TweenLite, SlowMo } from "gsap/all";
import ChickenImage from "./ChickenImage";



function LandingPage() {
    let myRef = React.createRef();
    let chickenTween = null;

  
  useEffect(()=>{
    console.log(myRef.current);
    chickenTween = TweenLite.from(myRef.current, 1, {
    x: 500, autoAlpha: 1, ease:SlowMo.ease, paused: true
  });
  chickenTween.play();
 }, [])

  return (
    <div className='App'>
      <ChickenImage ref={myRef} />
      
        <h1 className="header layer_one">Chicken Riot</h1>
        <h1 className="header layer_two">Chicken Riot</h1>
        {/* <div className="chicken"  >🐔</div> */}
        <div>
          <input className="text_input" placeholder="room id" type="text"></input>


          <input className="room_submit" type="submit" value="join"></input>
        </div>
    </div>
  );
}

export default LandingPage;