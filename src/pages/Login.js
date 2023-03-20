import React, { Component } from 'react';
import PropTypes from 'prop-types';
import handleToken from '../services/handlerToken';

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
    const { history } = this.props;
    await handleToken();
    history.push('/game');
  };

  render() {
    const { history } = this.props;
    const { name, email, isButtonDisable } = this.state;
    return (
      <section>
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
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ isButtonDisable }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
  // dispatch: PropTypes.func,
}.isRequired;

export default Login;
