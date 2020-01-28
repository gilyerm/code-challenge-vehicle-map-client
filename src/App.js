import React from 'react';
import 'fetch-json';
import 'bootstrap/dist/css/bootstrap.min.css';


import {Button, Col, Container, Row} from 'react-bootstrap';

import './App.css';

import VehicleMap from "./components/VehicleMap";
import VehicleList from "./components/VehicleList";
import VehicleDetail from "./components/VehicleDetail";


class App extends React.Component{

  path = "https://gilyerm-vehicle-map-server.herokuapp.com/";
  // path = "http://localhost:9000/";

  fullVehicles = [];  // full list of vehicles
  constructor(props, context) {
    super(props, context);
      this.state = { vehicles : [] , isFull : true};  // vehicles : all vehicles that need to show
                                                      // isFull: is that the full list of the vehicles
  }

  callAPI(){
    fetch(this.path)
        .then(res => res.json())
        .then(res =>  {
          this.setState({ vehicles : res , isFull : true});
          this.fullVehicles = res; // full list of vehicles are saved for future calls
        })
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    let selectedFunction = (selectedVehicle) => {this.setState({selectedVehicle : selectedVehicle})};
    let polygonFunction = (coordinates) =>{
      if (coordinates.length < 3) return; // re-render data only if there is 3 coordinates selected in the map
      fetch(this.path+"query/?data="+JSON.stringify(coordinates)) // send request to server to get all vehicles that inside the polygon
          .then(res => res.json())
          .then(res =>  {
            this.setState({ vehicles : res , isFull : false});
          });
    };
    return (
        <div className="App">
            <Container>
              <Row>
                <Col sm={7}>
                  <VehicleMap vehicles={this.state.vehicles} isFull={this.state.isFull} selectedFunction={selectedFunction} polygonFunction = {polygonFunction}/>
                </Col>
                <Col sm={5} className="scroller">
                  <VehicleList vehicles={this.state.vehicles} selectedFunction={selectedFunction}/>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <VehicleDetail selectedVehicle = {this.state.selectedVehicle}/>
                </Col>
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
