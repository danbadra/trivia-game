import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import store from '../redux/store';
import handlePicture from '../services/handlePicture';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const picture = handlePicture(gravatarEmail);
    return (
      <header>
        <img
          className="player-picture"
          src={ picture }
          alt="foto do usuário"
          data-testid="header-profile-picture"
        />
        <h3 className="player-name" data-testid="header-player-name">{ name }</h3>
        <div className="score-wrapper">
          <p className="score">Score: </p>
          <p className="player-score" data-testid="header-score">{ score }</p>
        </div>
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
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
