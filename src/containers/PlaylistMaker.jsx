import React, {Component} from 'react';
import {UncontrolledAlert, Form, Button, Row, Col, FormGroup, Label} from 'reactstrap';
import Input from 'reactstrap/lib/Input';

class PlaylistMaker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artistName : '',
        }
        this.handleArtistChange = this.handleArtistChange.bind(this);
    }

    handleArtistChange(e) {
        let value = e.target.value;
        this.setState({artistName : value});
    }

    submitForm(e) {
        e.preventDefault();
    }

    render() {
        return(
            <div>
            <div className="playlist-maker">
                <UncontrolledAlert color="success">Logged In!</UncontrolledAlert>
            </div>
            <div>
            <Form className="artist-input" onSubmit={(e)=>this.submitForm(e)}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Artist Name</Label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Taylor Swift"
                                value={this.state.artistName}
                                onChange={this.handleArtistChange}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Button color="success">Build Playlist!</Button>
                    </Col>
                </Row>
            </Form>
          </div>
          </div>
        )
    }
}

export default PlaylistMaker;