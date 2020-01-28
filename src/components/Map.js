import React from 'react';
import L from 'leaflet';
import '../App.css'

import {Helmet} from "react-helmet";


class Map extends React.Component {

    vehicles = [];
    map;
    selectedFunction;
    polygonFunction;
    polygon = undefined;
    constructor(props, context) {
        super(props, context);
        this.vehicles = props.vehicles;
        this.selectedFunction = props.selectedFunction;
        this.polygonFunction = props.polygonFunction;
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


        let mymap = this.map;
        this.polygon = L.polygon([]).addTo(mymap);
        let polygon = this.polygon;

        const polygonFunction = this.polygonFunction;
        function showVehiclesInsidePolygon(latLngs) {
            latLngs= latLngs.map((latlng)=> [latlng.lat,latlng.lng]);
            polygonFunction(latLngs);
        }

        function onMapClick(e) {
            polygon.addLatLng(e.latlng);
            showVehiclesInsidePolygon(polygon.getLatLngs()[0]);
        }

        mymap.on('click', onMapClick);
    }



    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.vehicles === nextProps.vehicles){
            return false;
        }else{
            this.vehicles = nextProps.vehicles;
            if (nextProps.isFull) { this.polygon.setLatLngs([])}
            this.updateView();
            return true;
        }
    }

    layer;
    updateView(){
        if (this.layer !== undefined){ this.layer.remove();}
        this.layer = L.layerGroup().addTo(this.map);
        for(let vehicle of this.vehicles){
            let marker = L.marker(vehicle.location,
                { title: vehicle.id });
            marker.on('click',()=>{this.selectedFunction(vehicle)});
            marker.addTo(this.layer)
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
