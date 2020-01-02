import React, { Component } from "react";
import { TimelineLite, CSSPlugin } from "gsap/all";
import { dataArray } from "./data.js";
import testAvatar from "./images/testAvatar.png";

class MultipleElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spacing: 0
    };
    // cards, elements tha will be used in the tween
    this.cards = [];
    // the timeline instance
    this.tl = new TimelineLite({ paused: true });
    this.cardsTween = [];
  }

  componentDidMount() {
    this.tl.staggerTo(this.cards, 0.5, { autoAlpha: 1, y: 50 }, 0.1);
  }

  animateAvatar(id) {
      this.tlmini = new TimelineLite();
      this.tlmini.to(this.cards[id], 0.5, {y:-10})
  }

  render() {
    console.log(this.tl);
    this.tl.pause(0);

    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-12">
            <div className="mb-2 btn-group">
              <button className="btn gsap-btn" onClick={() => this.tl.play()}>
                Play
              </button>
              <button
                className="btn gsap-btn"
                onClick={() => this.animateAvatar(1)}
              >
                Reverse
              </button>
              <button
                className="btn gsap-btn"
                onClick={() => this.tl.restart()}
              >
                Restart
              </button>
            </div>
            <hr />
          </div>

          {// map through the elements
          dataArray.map((element, index) => (
            <div
              key={element.id}
              className="card-element"
              ref={div => (this.cards[index] = div)}
              style={{ left: 150 * index}}
            >
                <img src={testAvatar} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MultipleElements;
