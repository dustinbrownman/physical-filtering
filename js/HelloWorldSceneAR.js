'use strict';

import React, { Component } from 'react';

import {
  ViroARScene,
  ViroARTrackingTargets,
  ViroConstants,
} from 'react-viro';

import GameMarker from './components/game-marker/index';
const { getCollection, getGames } = require("./utilities/board-game-geek-client");
const MOCK_USERNAME = "dustinbrownman"

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      games: []
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  componentDidMount() {
    // Pretending to fetch games from a service
    this.fetchGames();
  }

  fetchGames() {
    const t = this;

    getCollection(MOCK_USERNAME).then(games => {
      t.addGames(this.formatGames(games));
    });

    // getGames([175117, 232043]).then(response => {
    //   let games = response.items.item
    //   games = Array.isArray(games) ? games : [games];

    //   const formattedGames = games.map(({ name, thumbnail }) => {
    //     return ({
    //       name: name[0].value,
    //       imageUri: thumbnail
    //     });
    //   });
      
    //   t.addGames(formattedGames);
    // });
  }

  addGames(games) {
    let newTargets = {};

    games.forEach(game => {
      newTargets[game.name] = {
        source: { uri: game.imageUri },
        orientation: "Up",
        physicalWidth: .5
      }
    });

    ViroARTrackingTargets.createTargets(newTargets);

    this.setState({ games: [...games, ...this.state.games] });
  }

  formatGames(games) {
    return games.map(({ name, thumbnail }) => ({ name, imageUri: thumbnail }));
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        {this.state.games.map((game, index) => <GameMarker name={game.name} key={index} />)}
      </ViroARScene>
    );
  }

  _onInitialized(state, _reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!",
        loading: false
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // handle tracking loss
    }
  }
}

module.exports = HelloWorldSceneAR;
