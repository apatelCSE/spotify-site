

import React, { Component } from 'react';
import {Container, Jumbotron, Row, Col, Button} from 'reactstrap';
import './App.css';
import SpotifyAuth from './containers/SpotifyAuth'
import {ReactComponent as PlaylistSVG} from './logo.svg';

export const authEndpoint = 'https://accounts.spotify.com/authorize';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticatedWithSpotify: false
      // menu: this.props.userId.menu
    };

  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
          <Jumbotron>
            <h1 className="display-3">The Full Collection</h1>
            <hr />
            <Col>
              <PlaylistSVG className="svg" />
            </Col>
            <hr />
            <Row>
              <Col>
              <p>The Full Collection allows you to create playlists with your favorite artist's entire works. Get started by logging in with Spotify below!</p>
              </Col>
            </Row>
            <Row>
              <Col>
              <SpotifyAuth />
              </Col>
            </Row>
          </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}


export default App;
