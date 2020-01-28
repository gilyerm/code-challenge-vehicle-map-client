import * as React from "react";
import {ListGroup} from "react-bootstrap";


class VehicleList extends React.Component{

    ids = [];
    selectedFunction;
    constructor(props, context) {
        super(props, context);
        this.ids = props.ids;
        this.selectedFunction = props.selectedFunction;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.ids === nextProps.ids){
            return false;
        }else{
            this.ids = nextProps.ids;
            // console.log(this.ids);
            return true;
        }
    }

    render() {
        // console.log(this.ids);
        return <div>
            <ListGroup>
                {
                    this.ids.map((vehicleid) =>
                    <ListGroup.Item action variant="secondary" key={vehicleid} onClick={()=>this.selectedFunction(vehicleid)}>
                        {vehicleid}
                    </ListGroup.Item>
                    )
                }
            </ListGroup>
        </div>
    }
}
export default VehicleList;
