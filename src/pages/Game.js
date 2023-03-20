import React, { Component } from 'react';

class Game extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Game</h1>
          {/* <img /> */}
          {/* <p>{ header-player-name }</p> */}
          <p data-testid="header-score">0</p>
        </header>
      </div>
    );
  }
}

export default Game;
