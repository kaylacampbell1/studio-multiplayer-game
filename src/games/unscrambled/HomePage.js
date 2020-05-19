import GameComponent from "../../GameComponent.js";
import React from "react";
import { GamePage } from "./GamePage.js";
import UserApi from "../../UserApi.js";
import {
  createNewPlayerList,
  guessWord,
  restartRound,
  getPlayer,
  allPlayersDone
} from "./Objects.js";

export default class HomePage extends GameComponent {
  constructor(props) {
    super(props);
    this.state = {
      gamePage: "home",
      word: "applesauce",
      scrambledWord: "ecapesplau",
      scoreLimit: 5,
      timeLimit: 15,
      playerList: createNewPlayerList([this.getMyUserId()])
    };

    this.getSessionDatabaseRef().set({});
    this.guessWord_ = this.guessWord_.bind(this);
  }

  guessWord_(word) {
    let playerList = this.state.playerList;
    let playerObj = getPlayer(this.getMyUserId(), playerList);
    if (playerObj) {
      guessWord(word, this.state.word, playerObj);

      this.getSessionDatabaseRef().update(this.state);
    }
  }

  letsGoClick() {
    let playerIds = this.getSessionUserIds();
    if (playerIds.length > 1) {
      let players = createNewPlayerList(playerIds);

      let state = this.state;
      let newData = {
        gamePage: "play",
        word: state.word,
        scrambledWord: state.scrambledWord,
        scoreLimit: state.scoreLimit,
        timeLimit: state.timeLimit,
        playerList: players
      };
      this.getSessionDatabaseRef().update(newData);
    } else if (playerIds.length > 10) {
      alert("too many players!");
    }
  }

  onSessionDataChanged(data) {
    // check if we need a new round
    let updatedPlayers = data.playerList
      ? data.playerList
      : this.state.playerList;
    let newWord = data.word ? data.word : this.state.word;
    let newScrambledWord = data.scrambledWord
      ? data.scrambledWord
      : this.state.scrambledWord;
    if (data.playerList && allPlayersDone(data.playerList)) {
      newWord = this.getNewWord();
      newScrambledWord = this.scrambleWord(newWord);
      updatedPlayers = restartRound(data.playerList);
    }

    this.setState({
      gamePage: data.gamePage,
      word: newWord,
      scrambledWord: newScrambledWord,
      scoreLimit: data.scoreLimit ? data.scoreLimit : this.state.scoreLimit,
      timeLimit: data.timeLimit ? data.timeLimit : this.state.timeLimit,
      playerList: updatedPlayers
    });
  }

  getNewWord() {
    return "purple";
  }

  scrambleWord(word) {
    return "purpel";
  }

  render() {
    let players = this.getSessionUserIds().map(user_id => (
      <li key={user_id}>{UserApi.getName(user_id)}</li>
    ));

    let currentPlayer = this.state.playerList
      ? getPlayer(this.getMyUserId(), this.state.playerList)
      : null;

    if (this.state.gamePage === "play" && this.state.playerList) {
      return (
        <GamePage
          word={this.state.word}
          scrambledWord={this.state.scrambledWord}
          player={currentPlayer}
          guessWordFn={word => {
            this.guessWord_(word);
          }}
        />
      );
    } else {
      return (
        <div>
          <h1>Welcome to Unscrambled!!</h1>
          <ul>{players}</ul>
          <button onClick={() => this.letsGoClick()}>Let's Go!</button>
        </div>
      );
    }
  }
}

export { HomePage };
