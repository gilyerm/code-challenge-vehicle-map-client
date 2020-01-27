import * as React from "react";
import {ListGroup} from "react-bootstrap";


class List extends React.Component{

    vehicles = [];
    selectedFunction;
    constructor(props, context) {
        super(props, context);
        this.vehicles = props.vehicles;
        this.selectedFunction = props.selectedFunction
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.vehicles === nextProps.vehicles){
            return false;
        }else{
            this.vehicles = nextProps.vehicles;
            return true;
        }
    }

    render() {
        return <div>
            <ListGroup>
                { this.vehicles.map((vehicle) => {
                    return <ListGroup.Item action variant="secondary" key={vehicle.id} onClick={()=>this.selectedFunction(vehicle)}>{vehicle.id}</ListGroup.Item>;
                })}
            </ListGroup>
        </div>
    }
}
export default List;
