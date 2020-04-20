import React, { Component } from "react";

export default class GuessedWords extends Component {
  render() {
    return (
      <div>
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
