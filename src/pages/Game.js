import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { userScore } from '../redux/actions';
import handleDifficulty from '../services/handleDifficulty';
import random from '../services/random';
import logo from '../trivia.png';

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
        answer.style.boxShadow = '0px 0px 8px 1px rgb(6, 240, 15)';
      } else {
        answer.style.border = '3px solid red';
        answer.style.boxShadow = '0px 0px 8px 1px red';
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
      answer.style.boxShadow = 'none';
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
        <div className="game-wrapper">
          <div className="question-wrapper">
            <img className="logo" src={ logo } alt="logo" />
            <div className="category-wrapper">
              <strong>Category: </strong>
              <p data-testid="question-category">{category[index]}</p>
            </div>
            <div
              className="question"
              data-testid="question-category"
              id="questions"
            >
              <strong>Q: </strong>
              <p data-testid="question-text">{questions[index]}</p>
            </div>
            <p className="timer">
              { timer }
              <span>s</span>
            </p>
          </div>
          <div className="answer-wrapper" data-testid="answer-options" id="answer">
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
        </div>
        <div className="next-btn-wrapper">
          {(answerIsClicked === true)
          && (
            <button
              className="next-btn"
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
