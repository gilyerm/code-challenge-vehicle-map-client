import React from 'react';
import 'fetch-json';
import 'bootstrap/dist/css/bootstrap.min.css';


import {Col, Container, Row} from 'react-bootstrap';

import './App.css';

import VehicleMap from "./components/VehicleMap";
import VehicleList from "./components/VehicleList";
import VehicleDetail from "./components/VehicleDetail";


class App extends React.Component{

  path = "https://gilyerm-vehicle-map-server.herokuapp.com/";
  // path = "http://localhost:9000/";

  constructor(props, context) {
    super(props, context);
      this.state = { latLngs : [] , ids : [] , selectedVehicle : undefined };
  }

  callAPI(){
    fetch(this.path)
        .then(res => res.json())
        .then(res =>  {
          this.setState({ latLngs : res });
        })
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    let selectedFunction = (selectedVehicleid) => {
        fetch(this.path+"get/?id="+JSON.stringify(selectedVehicleid)) // send request to server to get selected vehicle data
            .then(res => res.json())
            .then(res =>  {
                if (res === undefined || res.length<1) return;
                this.setState({selectedVehicle : res[0]})
            });

    };
    let polygonFunction = (coordinates) =>{
      if (coordinates.length < 3) return; // re-render data only if there is 3 coordinates selected in the map
      fetch(this.path+"query/?data="+JSON.stringify(coordinates)) // send request to server to get all vehicles ids that inside the polygon
          .then(res => res.json())
          .then(res =>  {
            this.setState({ ids : res});
          });
    };
    return (
        <div className="App">
            <Container>
                <Row>
                    <Col>
                        <VehicleMap vehicles={this.state.latLngs}  polygonFunction = {polygonFunction}/>
                    </Col>
                </Row>
                <Row>
                    <Col className="scroller">
                        <VehicleList ids={this.state.ids} selectedFunction={selectedFunction}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <VehicleDetail selectedVehicle = {this.state.selectedVehicle}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
  }
}

export default App;
