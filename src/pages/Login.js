import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import handleToken from '../services/handleToken';
import { userData } from '../redux/actions';
import logo from '../trivia.png';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isButtonDisable: true,
  };

  handleDisable = () => {
    const { name, email } = this.state;
    if (name.length === 0 || email.length === 0) {
      this.setState({
        isButtonDisable: true,
      });
    } else {
      this.setState({
        isButtonDisable: false,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.handleDisable());
  };

  handleClick = async () => {
    const { name, email } = this.state;
    const { history, dispatch } = this.props;
    await handleToken();
    dispatch(userData({ name, email }));
    history.push('/game');
  };

  render() {
    const { history } = this.props;
    const { name, email, isButtonDisable } = this.state;
    return (
      <section className="login-wrapper">
        <img className="App-logo" src={ logo } alt="logo" />
        <div className="login-box">
          <label htmlFor="name">
            Nome:
            {' '}
            <input
              id="name"
              name="name"
              value={ name }
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            {' '}
            <input
              id="email"
              name="email"
              value={ email }
              type="text"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="login-btn-play"
            type="button"
            data-testid="btn-play"
            onClick={ this.handleClick }
            disabled={ isButtonDisable }
          >
            Play
          </button>
          <button
            className="login-btn-settings"
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            Configurações
          </button>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null)(Login);
