import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import handleStorage from '../services/handleStorage';
import logo from '../trivia.png';

class Feedback extends Component {
  componentDidMount() {
    handleStorage();
  }

  render() {
    const { acertos, pontuação, history } = this.props;
    const MIN_GOOD = 3;

    return (
      <div className="feedback-wrapper">
        <Header />
        <section className="feedback">
          <img className="logo" src={ logo } alt="logo" />
          <h1 data-testid="feedback-text">Resultado</h1>
          <main>
            {
              acertos < MIN_GOOD ? (
                <>
                  <h2 data-testid="feedback-text">Could be better...</h2>
                  <div>
                    <div className="feedback-score">
                      <span>Score: </span>
                      <p data-testid="feedback-total-score">
                        {pontuação}
                      </p>
                    </div>
                    <div className="feedback-score">
                      <span>Right questions: </span>
                      <p data-testid="feedback-total-question">
                        {acertos}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 data-testid="feedback-text">Well Done!</h2>
                  <div>
                    <div className="feedback-score">
                      <span>Score: </span>
                      <p data-testid="feedback-total-score">
                        {pontuação}
                      </p>
                    </div>
                    <div className="feedback-score">
                      <span>Right questions: </span>
                      <p data-testid="feedback-total-question">
                        {acertos}
                      </p>
                    </div>
                  </div>
                </>
              )
            }
            <button
              className="feedback-btn"
              type="button"
              data-testid="btn-play-again"
              value="Play Again"
              onClick={ () => history.push('/') }
            >
              Jogar Novamente
            </button>
            <button
              className="feedback-btn"
              type="button"
              data-testid="btn-ranking"
              value="Ranking"
              onClick={ () => history.push('/ranking') }
            >
              Ranking
            </button>
          </main>
        </section>
      </div>
    );
  }
}

Feedback.propTypes = {
  acertos: PropTypes.number.isRequired,
  pontuação: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func }).isRequired,
  // nome: PropTypes.string.isRequired,
  // gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  acertos: state.player.assertions,
  pontuação: state.player.score,
  nome: state.player.name,
  gravatarEmail: state.player.email,
});

export default connect(mapStateToProps)(Feedback);

// import PropTypes from 'prop-types';
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import Header from '../components/Header';
// import handleStorage from '../servises/handleStorange';

// class Feedback extends Component {
//   componentDidMount() {
//     const { acertos, pontuação, nome, gravatarEmail } = this.props;
//   }

//   render() {
//     const { acertos, pontuação } = this.props;
//     const MIN_GOOD = 3;
//     return (
//       <>
//         <Header />
//         <main>
//           {
//             acertos < MIN_GOOD ? (
//               <>
//                 <h2 data-testid="feedback-text">Could be better...</h2>
//                 <div>
//                   <div>
//                     <span>Score: </span>
//                     <p data-testid="feedback-total-score">
//                       {pontuação}
//                     </p>
//                   </div>
//                   <div>
//                     <span>Right questions: </span>
//                     <p data-testid="feedback-total-question">
//                       {acertos}
//                     </p>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h2 data-testid="feedback-text">Well Done!</h2>
//                 <div>
//                   <div>
//                     <span>Score: </span>
//                     <p data-testid="feedback-total-score">
//                       {pontuação}
//                     </p>
//                   </div>
//                   <div>
//                     <span>Right questions: </span>
//                     <p data-testid="feedback-total-question">
//                       {acertos}
//                     </p>
//                   </div>
//                 </div>
//               </>
//             )
//           }

//           <Link to="/">
//             <input
//               type="button"
//               data-testid="btn-play-again"
//               value="Play Again"
//             />
//           </Link>
//           <Link to="/ranking">
//             <input
//               type="button"
//               data-testid="btn-ranking"
//               value="Ranking"
//             />
//           </Link>
//         </main>
//       </>
//     );
//   }
// }

// Feedback.propTypes = {
//   acertos: PropTypes.number.isRequired,
//   pontuação: PropTypes.number.isRequired,
//   nome: PropTypes.string.isRequired,
//   gravatarEmail: PropTypes.string.isRequired,
// };

// const mapStateToProps = (state) => ({
//   acertos: state.player.assertions,
//   pontuação: state.player.score,
//   nome: state.player.name,
//   gravatarEmail: state.player.email,
// });

// export default connect(mapStateToProps)(Feedback);
