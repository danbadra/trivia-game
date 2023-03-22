import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { userScore } from '../redux/actions';
import handleDifficulty from '../services/handleDifficulty';
import random from '../services/random';

class Game extends Component {
  state = {
    assertions: 0,
    score: 0,
    index: 0,
    questions: [],
    answers: [],
    category: [],
    timer: 30,
    disable: false,
    answerIsClicked: false,
    arrDifficulty: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const API_QUESTIONS = `https://opentdb.com/api.php?amount=5&token=${token}`;

    try {
      const response = await fetch(API_QUESTIONS);
      const data = await response.json();
      const { results } = data;
      const failedToken = 3;

      if (data.response_code === failedToken) {
        localStorage.setItem('token', '');
        history.push('/');
      } else {
        this.setState({
          questions: results.map((result) => result.question),
          answers: results.map(
            (result) => random(result.correct_answer, result.incorrect_answers),
          ),
          category: results.map((result) => result.category),
          arrDifficulty: results.map((result) => result.difficulty),
        });
      }
    } catch (error) {
      console.log(error.message);
    }

    this.handleTimer();
  }

  handleTimer = () => {
    const sec = 1000;
    const countDown = setInterval(() => {
      const { timer, answerIsClicked } = this.state;
      if (timer > 0 && answerIsClicked === false) {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      } else {
        clearInterval(countDown);
        this.setState({
          disable: true,
        });
      }
    }, sec);
  };

  handleAnswerClick = ({ target }) => {
    const correctAnswer = 'correct-answer';
    const allAnswers = document.querySelectorAll('.answers');
    const { timer, arrDifficulty, index } = this.state;
    const { dispatch } = this.props;
    const ten = 10;

    this.setState({
      answerIsClicked: true,
    });

    allAnswers.forEach((answer) => {
      if (answer.id === correctAnswer) {
        answer.style.border = '3px solid rgb(6, 240, 15)';
      } else {
        answer.style.border = '3px solid red';
      }
    });

    if (target.id === correctAnswer) {
      const scoreCalc = ten + (handleDifficulty(arrDifficulty[index]) * timer);
      this.setState((prevState) => ({
        score: prevState.score + scoreCalc,
        assertions: prevState.assertions + 1,
      }), () => {
        const { score, assertions } = this.state;
        const data = {
          assertions,
          score,
        };
        dispatch(userScore(data));
      });
    } else {
      this.setState((prevState) => ({
        score: prevState.score,
        assertions: prevState.assertions,
      }), () => {
        const { score, assertions } = this.state;
        const data = {
          assertions,
          score,
        };
        dispatch(userScore(data));
      });
    }
  };

  handleNextBtn = () => {
    const { index } = this.state;
    const lastQuestion = 4;

    this.setState({
      index: index + 1,
      disable: false,
      answerIsClicked: false,
      timer: 30,
    });

    this.handleTimer();

    const allAnswers = document.querySelectorAll('.answers');
    allAnswers.forEach((answer) => {
      answer.style.border = '1px solid black';
    });

    if (index === lastQuestion) {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  render() {
    const { questions, answers, index, category, timer, disable,
      answerIsClicked } = this.state;
    const arrayAnswers = answers[index];
    return (
      <section>
        <Header />
        <p data-testid="question-category">{category[index]}</p>
        <div data-testid="question-category" id="questions">
          <p data-testid="question-text">{questions[index]}</p>
        </div>
        <p>{ timer }</p>
        <div data-testid="answer-options" id="answer">
          { answers.length === 0 ? <p>Carregando...</p>
            : arrayAnswers.map((answer, i) => (
              <button
                key={ i }
                id={ answer.testeID }
                data-testid={ answer.testeID }
                onClick={ this.handleAnswerClick }
                className="answers"
                disabled={ disable }
              >
                {answer.wrong || answer.correct}
              </button>))}
        </div>
        <div>
          {(answerIsClicked === true)
          && (
            <button
              data-testid="btn-next"
              onClick={ this.handleNextBtn }
            >
              Next
            </button>
          )}
        </div>
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null)(Game);

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
