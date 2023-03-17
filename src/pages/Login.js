import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  handleClick = () => {
    console.log('clicou');
    const { history } = this.props;
    history.push('/lalaland');
  };

  render() {
    const { name, email, isButtonDisable } = this.state;
    return (
      <section>
        <label htmlFor="name">
          Nome:
          {' '}
          <input
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
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  // dispatch: PropTypes.func.isRequired,
};

export default Login;
