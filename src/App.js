import React from 'react';
import 'fetch-json';

import { Button } from 'react-bootstrap';

import './App.css';

import Map from "./components/Map";


class App extends React.Component{

  constructor(props, context) {
    super(props, context);
    this.state = { apiResponse : [] }
  }

  callAPI(){
    fetch("http://localhost:9000/testApi")
        .then(res => res.json())
        // .then(res => JSON.parse(res))
        .then(res =>  this.setState({ apiResponse : res }))
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            
            <Map vehicles={this.state.apiResponse}/>
            <p>
              {/*{this.state.apiResponse}*/}
            </p>
          </header>
        </div>
    );
  }
}

export default App;
