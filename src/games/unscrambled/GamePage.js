import React, { Component } from "react";
import { GuessedWords } from "./GuessedWords.js";

export default class GamePage extends Component {
  readInput() {
    let textArea = document.getElementById("guesses");
    let value = textArea.value;

    // TODO: Update the state so it knows if the guess is
    // wrong or right. Use the updated state to tell the user.
    // If the guess is correct, update the player's point value.
    if (value === this.props.word) {
      console.log("GamePage: correct answer!");
    } else {
      console.log("GamePage: incorrect");
    }

    // TODO: limit the player, so they can only guess
    // a certain number of times.
    this.props.guessWordFn(value);
    textArea.value = "";
  }

  render() {
    return (
      <div>
        <div> [ {this.props.scrambledWord} ] </div>

        <textarea rows="1" type="text" id="guesses" />
        <button onClick={() => this.readInput()}>Submit</button>
        <br />
        <br />
        <div id="tries">
          Tries Left: {4 - this.props.player.guessedWords.length}
        </div>
        <div id="points">Points: {this.props.player.points}</div>
        <GuessedWords
          wordList={this.props.player.guessedWords}
          guessedRight={this.props.player.roundWon}
        />
      </div>
    );
  }
}

export { GamePage };
