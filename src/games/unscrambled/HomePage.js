import GameComponent from "../../GameComponent.js";
import React from "react";
import { GamePage } from "./GamePage.js";

export default class HomePage extends GameComponent {
  constructor(props) {
    super(props);
    this.state = {
      gamePage: "play",
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
      return <div>Welcome to Unscrambled!</div>;
    }
  }
}

export { HomePage };
