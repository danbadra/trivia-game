import React, { Component } from 'react';
import Header from '../components/Header';

class Ranking extends Component {
  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Header />
      </section>
    );
  }
}

export default Ranking;
