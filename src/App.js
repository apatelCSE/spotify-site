import React, { Component } from 'react';
import {Container, Jumbotron, Row, Col, Button} from 'reactstrap';
import './App.css';
import {ReactComponent as PlaylistSVG} from './logo.svg';
import PlaylistMaker from './containers/PlaylistMaker'

export const authEndpoint = 'https://accounts.spotify.com/authorize';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticatedWithSpotify: false
      // menu: this.props.userId.menu
    };
    this.state.handleRedirect = this.handleRedirect.bind(this);
    this.state.generateRandomString = this.generateRandomString.bind(this);
    this.state.getHashParams = this.getHashParams.bind(this);
    this.state.componentDidMount = this.componentDidMount.bind(this);
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

    if (access_token) {
      this.setState({ isAuthenticatedWithSpotify: true });
    }
    if (access_token && (state == null || state !== storedState)) {
      alert('Click "ok" to finish authentication with Spotify');
    } else {
      localStorage.removeItem('stateKey');
    }
    // DO STUFF WITH ACCESS TOKEN HERE
    // this.props.onConnectWithSpotify(access_token);
  }

  handleRedirect(event) {
    event.preventDefault();

    const params = this.getHashParams();
    const access_token = params.access_token;
    console.log(access_token);

    const state = this.generateRandomString(16);
    localStorage.setItem('stateKey', state);

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url +=
      '&client_id=' + encodeURIComponent('2fc74c919fe3493bba402b36ae82eeac');
    url += '&scope=' + encodeURIComponent('user-top-read');
    url += '&redirect_uri=' + encodeURIComponent('http://localhost:3000');
    url += '&state=' + encodeURIComponent(state);
    url += '&show_dialog=true';
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
            <hr />
            <Row>
              <Col>
                <h2>Playlist Maker</h2>
                <div id="playlist-maker">
                  {this.state.isAuthenticatedWithSpotify ?
                  <PlaylistMaker />
                  : <h6>There's nothing to show here yet. Sign in with Spotify to start creating playlists!</h6>
                }
                </div>
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