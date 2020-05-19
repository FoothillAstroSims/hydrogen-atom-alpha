import React from 'react';
import PropTypes from 'prop-types';
import MainView from "./MainView";

const WIDTH = 230;
const HEIGHT = 230;

export default class EnergyLevelDiagram extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            deExciting: false,
        }

        this.state = this.initialState;
    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    render() {

        const e1 = 200;
        const e2 = 200;
        const e3 = 200;
        const e4 = 200;
        const e5 = 200;
        const e6 = 200;

        return (
            <svg width={WIDTH} height={HEIGHT}>
                {/*<circle cx={0} cy={0} r={10} fill={"green"}/>*/}

                {/*Energy Level 1*/}
                <line x1={85} y1={e1} x2={145} y2={e1} strokeWidth={3} stroke={"red"}/>

                {/*Energy Level 2*/}
                <line x1={85} y1={80} x2={145} y2={80} strokeWidth={1} stroke={"red"}/>

                {/*Energy Level 3*/}
                <line x1={85} y1={57.4} x2={145} y2={57.4} strokeWidth={1} stroke={"red"}/>

                {/*Energy Level 4*/}
                <line x1={85} y1={60} x2={145} y2={60} strokeWidth={1} stroke={"red"}/>

                {/*Energy Level 5*/}
                <line x1={85} y1={50} x2={145} y2={50} strokeWidth={1} stroke={"red"}/>

                {/*Energy Level 6*/}
                <line x1={85} y1={53} x2={145} y2={53} strokeWidth={1} stroke={"red"}/>

                {/*<line x1={85} y1={200} x2={145} y2={200} strokeWidth={3} stroke={"red"}/>*/}
            </svg>
        );
    }
}