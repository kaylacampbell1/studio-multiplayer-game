import React, { Component } from "react";

export default class GamePage extends Component {
  render() {
    return (
      <div>
        <div> Tries Left: ___</div>
        <div> Category: ___</div>
        <div> [ scrambled word ] </div>

        <input type="text" id="guesses" />
        <button>Submit</button>

        <div class="guessed-words" />
      </div>
    );
  }
}
