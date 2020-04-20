import GameComponent from "../../GameComponent.js";
import React from "react";
import { GamePage } from "./GamePage.js";
import UserApi from "../../UserApi.js";

export default class HomePage extends GameComponent {
  constructor(props) {
    super(props);
    this.state = {
      gamePage: "home",
      word: "applesauce",
      scrambledWord: "ecapesplau",
      player: {
        guessedWords: [],
        points: 0,
        roundWon: false
      }
    };
  }

  guessWord(word) {
    let newWordList = this.state.player.guessedWords;
    newWordList.push(word);
    this.setState({ player: { guessedWords: newWordList } });
  }

  render() {
    // ['player1', 'player2', 'player3']
    let players = this.getSessionUserIds().map(user_id => (
      <li key={user_id}>{UserApi.getName(user_id)}</li>
    ));

    if (this.state.gamePage === "play") {
      return (
        <GamePage
          word={this.state.word}
          scrambledWord={this.state.scrambledWord}
          player={this.state.player}
          guessWordFn={word => {
            this.guessWord(word);
          }}
        />
      );
    } else {
      return (
        <div>
          <h1>Welcome to Unscrambled!</h1>
          <ul>{players}</ul>
          <button
            onClick={() => {
              if (players.length >= 1) {
                this.setState({ gamePage: "play" });
                alert("you can play!");
              } else if (players.length > 10) {
                alert("too many players!");
              }
            }}
          >
            Let's Go!
          </button>
        </div>
      );
    }
  }
}

export { HomePage };
