import React from 'react';
import L from 'leaflet';
import '../App.css'

import {Helmet} from "react-helmet";


class Map extends React.Component {

    vehicles = [];
    map;
    constructor(props, context) {
        super(props, context);
        this.vehicles = props.vehicles;
    }

    componentDidMount() {
        // create map
        this.map = L.map('map', {
            center: [51.509865, -0.118092],
            zoom: 10,
            layers: [
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }),
            ]
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.vehicles === nextProps.vehicles){
            return false;
        }else{
            this.vehicles = nextProps.vehicles;
            this.updateView();
            return true;
        }
    }

    updateView(){
        for(let vehicle of this.vehicles){
            let marker = L.marker(vehicle.location);
            marker.on('click',()=>{console.log(vehicle.id)});
            marker.addTo(this.map)
        }
    }

    render() {
        return (
                <div id="map">
                    <Helmet>
                        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"/>
                    </Helmet>
                </div>
        )
    }
}

export default Map;
