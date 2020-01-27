import React from 'react';
import 'fetch-json';
import 'bootstrap/dist/css/bootstrap.min.css';


import {Button, Col, Container, Row} from 'react-bootstrap';

import './App.css';

import Map from "./components/Map";
import List from "./components/List";


class App extends React.Component{

  constructor(props, context) {
    super(props, context);
    this.state = { vehicles : [] }
  }

  callAPI(){
    fetch("http://localhost:9000/testApi")
        .then(res => res.json())
        // .then(res => JSON.parse(res))
        .then(res =>  this.setState({ vehicles : res }))
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
        <div className="App">
          {/*<header className="App-header">*/}
            <Container>
              <Row>
                <Col sm={7}><Map vehicles={this.state.vehicles}/></Col>
                <Col sm={5} className="scroller"><List vehicles={this.state.vehicles}/></Col>
              </Row>
            </Container>
          {/*</header>*/}
        </div>
    );
  }
}

export default App;
