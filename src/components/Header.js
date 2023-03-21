import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import store from '../redux/store';
import handlePicture from '../services/handlePicture';

class Header extends Component {
  render() {
    const { name, gravatarEmail } = this.props;
    const picture = handlePicture(gravatarEmail);
    return (
      <header>
        <h1>Game</h1>
        <img src={ picture } alt="foto do usuário" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Header.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
