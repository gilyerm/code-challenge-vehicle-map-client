import React from 'react';
import 'fetch-json';
import 'bootstrap/dist/css/bootstrap.min.css';


import {Button, Col, Container, Row} from 'react-bootstrap';

import './App.css';

import Map from "./components/Map";
import List from "./components/List";
import VehicleDetail from "./components/VehicleDetail";


class App extends React.Component{

  fullVehicles = [];
  constructor(props, context) {
    super(props, context);
      this.state = { vehicles : [] , isFull : true};
  }

  callAPI(){
    fetch("http://localhost:9000/testApi")
        .then(res => res.json())
        .then(res =>  {
          this.setState({ vehicles : res , isFull : true});
          this.fullVehicles = res;
        })
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    let selectedFunction = (selectedVehicle) => {this.setState({selectedVehicle : selectedVehicle})};
    let polygonFunction = (coordinates) =>{
      if (coordinates.length < 3) return;
      fetch("http://localhost:9000/testApi/query/?data="+JSON.stringify(coordinates))
          .then(res => res.json())
          .then(res =>  {
            // console.log(res);
            this.setState({ vehicles : res , isFull : false});
          })
    };
    return (
        <div className="App">
            <Container>

              <Row>
                <Col sm={7}><Map vehicles={this.state.vehicles} isFull={this.state.isFull} selectedFunction={selectedFunction} polygonFunction = {polygonFunction}/></Col>
                <Col sm={5} className="scroller"><List vehicles={this.state.vehicles} selectedFunction={selectedFunction}/></Col>
              </Row>
              <Row>
                <Col sm={12}><VehicleDetail selectedVehicle = {this.state.selectedVehicle}/></Col>
              </Row>
              <Row>
                <Button variant="secondary" size="lg" block active onClick={()=>this.setState({ vehicles : this.fullVehicles , isFull : true})}>
                  Reset Map
                </Button>
              </Row>
            </Container>
        </div>
    );
  }
}

export default App;
