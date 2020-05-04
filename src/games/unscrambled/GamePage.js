import React, { Component } from "react";
import { GuessedWords } from "./GuessedWords.js";

export default class GamePage extends Component {
  readInput() {
    let textArea = document.getElementById("guesses");
    let value = textArea.value;
    this.props.guessWordFn(value);
    textArea.value = "";
  }

  shouldButtonBeDisabled() {
    return (
      this.props.player.guessedWords.length > 3 || this.props.player.roundWon
    );
  }

  render() {
    if (!this.props.player) {
      return <div>Uh oh, something went wrong!</div>;
    } else {
      return (
        <div>
          <div> [ {this.props.scrambledWord} ] </div>

          <textarea rows="1" type="text" id="guesses" />
          <button
            onClick={() => this.readInput()}
            disabled={this.shouldButtonBeDisabled()}
          >
            Submit
          </button>
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
}

export { GamePage };
