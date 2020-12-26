import React, { Component } from 'react';
import {Button} from 'reactstrap';

export const authEndpoint = 'https://accounts.spotify.com/authorize';
class SpotifyAuth extends Component {
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

    if (window.localStorage.getItem('authToken')) {
      this.setState({ isAuthenticatedWithSpotify: true });
    }
    if (access_token && (state == null || state !== storedState)) {
      alert('Click "ok" to finish authentication with Spotify');
    } else {
      localStorage.removeItem('stateKey');
    }
    console.log(access_token);
    // DO STUFF WITH ACCEES TOKEN HERE
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
      <div>
        <Button color="success"
          onClick={(event) => this.handleRedirect(event)}
        >Login with Spotify</Button>
      </div>
    );
  }
}

export default SpotifyAuth;