import React from 'react';
import L from 'leaflet';
import '../App.css'

import {Helmet} from "react-helmet";


class VehicleMap extends React.Component {

    vehicles = [];
    map;
    selectedFunction;
    polygonFunction;
    polygon = undefined;
    layerMarker = undefined;
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

        const polygon = this.polygon = L.polygon([]).addTo(this.map);
        const polygonFunction = this.polygonFunction;

        function showVehiclesInsidePolygon(latLngs) {
            latLngs = latLngs.map((latlng)=> [latlng.lat,latlng.lng]);
            polygonFunction(latLngs); // show only Vehicles the inside the polygon
        }

        function onMapClick(e) {
            polygon.addLatLng(e.latlng);
            showVehiclesInsidePolygon(polygon.getLatLngs()[0]);
        }

        this.map.on('click', onMapClick);
    }



    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.vehicles === nextProps.vehicles){
            return false;
        }else{
            this.vehicles = nextProps.vehicles;
            if (nextProps.isFull) { this.polygon.setLatLngs([])} // hide/remove polygon shape from map if get the full list
            this.updateView();
            return true;
        }
    }


    updateView(){
        if (this.layerMarker !== undefined){ this.layerMarker.remove();} // remove old markers (layer) from map
        this.layerMarker = L.layerGroup().addTo(this.map);
        for(let vehicle of this.vehicles){
            let marker = L.marker(vehicle.location,
                { title: vehicle.id });
            marker.on('click',()=>{this.selectedFunction(vehicle)});
            marker.addTo(this.layerMarker)
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

export default VehicleMap;
