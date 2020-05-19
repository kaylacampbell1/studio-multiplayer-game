function createNewPlayer(playerId) {
  return {
    playerId: playerId,
    guessedWords: [],
    points: 0,
    roundWon: false
  };
}

function createNewPlayerList(playerIdList) {
  let playerList = [];
  playerIdList.forEach(id => {
    playerList.push(createNewPlayer(id));
  });
  return playerList;
}

function guessWord(word, correctWord, playerObj) {
  if (playerObj.guessedWords) {
    playerObj.guessedWords.push(word);
    if (word === correctWord) {
      playerObj.points += 1;
      playerObj.roundWon = true;
    }
  } else {
    playerObj.guessedWords = [word];
  }
  return playerObj;
}

function isDone(playerObj) {
  return (
    playerObj.roundWon ||
    (playerObj.guessedWords && playerObj.guessedWords.length > 3)
  );
}

function restartRound(playerList) {
  playerList.forEach(player => {
    player.guessedWords = [];
  });
  return playerList;
}

function getPlayer(playerId, playerList) {
  for (let i = 0; i < playerList.length; i++) {
    if (playerList[i].playerId === playerId) {
      return playerList[i];
    }
  }
}

function allPlayersDone(playerList) {
  let playersDone = true;
  playerList.forEach(player => {
    if (!isDone(player)) {
      playersDone = false;
      return false;
    }
  });
  return playersDone;
}

export {
  createNewPlayer,
  createNewPlayerList,
  isDone,
  guessWord,
  restartRound,
  getPlayer,
  allPlayersDone
};
