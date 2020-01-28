import * as React from "react";
import {Alert, Col, Form} from "react-bootstrap";

class VehicleDetail extends React.Component{
    selectedVehicle = undefined;

    constructor(props, context) {
        super(props, context);
        this.selectedVehicle = props.selectedVehicle;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.selectedVehicle === nextProps.selectedVehicle){
            return false;
        }else{
            this.selectedVehicle = nextProps.selectedVehicle;
            return true;
        }
    }

    render() {
        if (this.selectedVehicle === undefined){  // show if there isn't selected vehicle
            return <Alert variant="info">Select vehicle to display</Alert>
        }
        let vehicle = this.selectedVehicle;
        return (
            <Form>
                <Form.Row>
                    <Form.Group as={Col} md={4}>
                        <Form.Label>Id</Form.Label>
                        <Form.Text>
                            {vehicle.id}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} md={4}>
                        <Form.Label>State</Form.Label>
                        <Form.Text>
                            {vehicle.state}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} md={4}>
                        <Form.Label>Route Commit Id</Form.Label>
                        <Form.Text>
                            {vehicle.routeCommitId ?? "undefined"}
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md={6}>
                        <Form.Label>Seats</Form.Label>
                        <Form.Text>
                            {vehicle.seats}
                        </Form.Text>
                    </Form.Group>


                    <Form.Group as={Col} md={6}>
                        <Form.Label>Distance</Form.Label>
                        <Form.Text>
                            {vehicle.distance}
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                        <Form.Label>Location:</Form.Label>
                        <Form.Group as={Col}>
                            <Form.Label>Lat</Form.Label>
                            <Form.Text>
                                {vehicle.location.lat}
                            </Form.Text>
                        </Form.Group>
                    <Form.Group as={Col}>
                            <Form.Label>Lng</Form.Label>
                            <Form.Text>
                                {vehicle.location.lng}
                            </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col}>
                            <Form.Label>Bearing</Form.Label>
                            <Form.Text>
                                {vehicle.location.bearing}
                            </Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Label>Class:</Form.Label>
                    <Form.Group as={Col}>
                        <Form.Label>Name</Form.Label>
                        <Form.Text>
                            {vehicle.class.name}
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
            </Form>
        )
    }
}
export default VehicleDetail;
