import React, { Component } from 'react';
import {Container, Jumbotron, Row, Col, Button} from 'reactstrap';
import './App.css';
import {ReactComponent as PlaylistSVG} from './logo.svg';

export const authEndpoint = 'https://accounts.spotify.com/authorize';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticatedWithSpotify: false
      // menu: this.props.userId.menu
    };
    this.state.handleRedirect = this.handleRedirect.bind(this);
  }

  generateRandomString(length) {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  getHashParams() {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    let e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  componentDidMount() {
    //if (this.props.isAuthenticated) {
    const params = this.getHashParams();

    const access_token = params.access_token;
    const state = params.state;
    const storedState = localStorage.getItem('stateKey');
    localStorage.setItem('spotifyAuthToken', access_token);
    localStorage.getItem('spotifyAuthToken');

    if (window.localStorage.getItem('authToken')) {
      this.setState({ isAuthenticatedWithSpotify: true });
    }
    if (access_token && (state == null || state !== storedState)) {
      alert('Click "ok" to finish authentication with Spotify');
    } else {
      localStorage.removeItem('stateKey');
    }
    console.log(access_token);
    // DO STUFF WITH ACCESS TOKEN HERE
    // this.props.onConnectWithSpotify(access_token);
  }

  handleRedirect(event) {
    event.preventDefault();
    console.log('You linked your Spotify account!', 'success');

    const params = this.getHashParams();
    const access_token = params.access_token;
    console.log(access_token);

    const state = this.generateRandomString(16);
    localStorage.setItem('stateKey', state);

    // let url = 'https://accounts.spotify.com/authorize';
    // url += '?response_type=token';
    // url +=
    //   '&client_id=' + encodeURIComponent('f09fbf600009433dadce5836c57584c3');
    // url += '&scope=' + encodeURIComponent('user-top-read');
    // url += '&redirect_uri=' + encodeURIComponent('http://localhost:3000/abc');
    // url += '&state=' + encodeURIComponent(state);
    // url += '&show_dialog=true';
    let url =
      'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=f09fbf600009433dadce5836c57584c3' +
      '&scope=' +
      encodeURIComponent('user-read-private%20user-read-email') +
      '&redirect_uri=' +
      encodeURIComponent('http://localhost:3000/loginsuccess');
    window.location = url;
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
              <Button color="success"
                onClick={(event) => this.handleRedirect(event)}
              >Login with Spotify</Button>
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
