import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Header from '../components/Header';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const savedRankingJson = localStorage.getItem('ranking');
    const savedRanking = JSON.parse(savedRankingJson);
    // const one = 1;
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        {/* <Header /> */}
        <main>
          <h1 data-testid="ranking-title">Ranking</h1>
          <table>
            <thead>
              <th>Avatar</th>
              <th>Nome</th>
              <th>Pontuação</th>
            </thead>
            <tbody>
              {
                savedRanking.sort((a, b) => b.score - a.score).map((rank, index) => (
                  <tr key={ index }>
                    <td>
                      <img src={ rank.picture } alt="Gravatar." />
                    </td>
                    <td data-testid={ `player-name-${index}` }>{rank.name}</td>
                    <td data-testid={ `player-score-${index}` }>{rank.score}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <button
            type="button"
            data-testid="btn-go-home"
            value="Tela Inicial"
            onClick={ () => history.push('/') }
          >
            Tela Inicial
          </button>
        </main>
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func }).isRequired,
  // nome: PropTypes.string.isRequired,
  // gravatarEmail: PropTypes.string.isRequired,
};

export default Ranking;

// LOCAL STORAGE:
// ranking: [
//   { name: nome_da_pessoa, score: 10, picture: url_da_foto_no_gravatar }
// ],

// Pergunta de múltipla escolha
// {
//   "response_code":0,
//   "results":[
//       {
//         "category":"Entertainment: Video Games",
//         "type":"multiple",
//         "difficulty":"easy",
//         "question":"What is the first weapon you acquire in Half-Life?",
//         "correct_answer":"A crowbar",
//         "incorrect_answers":[
//             "A pistol",
//             "The H.E.V suit",
//             "Your fists"
//         ]
//       }
//       {... x5}
//   ]
// }
