import GameComponent from "../../GameComponent.js";
import React from "react";
import { GamePage } from "./GamePage.js";
import UserApi from "../../UserApi.js";

export default class HomePage extends GameComponent {
  constructor(props) {
    super(props);
    this.getCurrentPlayerObject = this.getCurrentPlayerObject_.bind(this);
    this.guessWord = this.guessWord_.bind(this);
    this.state = {
      gamePage: "home",
      word: "applesauce",
      scrambledWord: "ecapesplau",
      scoreLimit: 5,
      timeLimit: 15,
      playerList: [
        {
          playerId: this.getSessionCreatorUserId(),
          guessedWords: [],
          points: 0,
          roundWon: false
        }
      ]
    };
  }

  getCurrentPlayerObject_() {
    let currentPlayer = this.getMyUserId();
    for (let i = 0; i < this.state.playerList.length; i++) {
      if (this.state.playerList[i].playerId === currentPlayer) {
        return this.state.playerList[i];
      }
    }
    return null;
  }

  guessWord_(word) {
    let playerObj = this.getCurrentPlayerObject();
    if (!playerObj) return;
    playerObj.guessedWords.push(word);
    if (word === this.state.word) {
      playerObj.points += 1;
      playerObj.roundWon = true;
    }

    let oldPlayerList = this.state.playerList;
    let newPlayerList = [];
    for (let i = 0; i < oldPlayerList.length; i++) {
      if (oldPlayerList[i].playerId === this.getMyUserId()) {
        newPlayerList.push(playerObj);
      } else {
        newPlayerList.push(oldPlayerList[i]);
      }
    }

    this.setState(prevState => {
      return {
        gamePage: prevState.gamePage,
        word: prevState.word,
        scrambledWord: prevState.scrambledWord,
        scoreLimit: prevState.scoreLimit,
        timeLimit: prevState.timeLimit,
        playerList: newPlayerList
      };
    });

    //{ player: [{ guessedWords: newWordList } }]);
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
          player={this.getCurrentPlayerObject()}
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
                let playerIds = this.getSessionUserIds();
                let newPlayerList = [];
                for (let i = 0; i < players.length; i++) {
                  newPlayerList.push({
                    playerId: playerIds[i],
                    guessedWords: [],
                    points: 0,
                    roundWon: false
                  });
                }
                this.setState({ gamePage: "play", playerList: newPlayerList });
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
