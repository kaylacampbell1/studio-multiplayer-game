import React, { Component } from "react";

export default class GuessedWords extends Component {
  render() {
    let note = "";
    if (this.props.guessedRight) {
      note = <h1 className="correct">You guessed correct!</h1>;
    } else if (this.props.wordList.length > 3) {
      note = <h1 className="guess-limit"> You ran out of guesses! </h1>;
    }
    return (
      <div>
        {note}
        <br />
        Guesses:
        <ol>
          {this.props.wordList.map((item, index) => (
            <li key={index}> {item} </li>
          ))}
        </ol>
      </div>
    );
  }
}

export { GuessedWords };
