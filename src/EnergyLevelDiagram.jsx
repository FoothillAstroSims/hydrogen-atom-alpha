import React from 'react';
import PropTypes from 'prop-types';
import MainView from "./MainView";

const WIDTH = 230;
const HEIGHT = 230;

const convertToPixel = (energyLevel) => {
    const minHeight = 30;
    const maxHeight = 220;
    const minEnergyLevel = 0.4;
    const maxEnergyLevel = 13.6;

    return ((maxHeight - minHeight) * ((-energyLevel - minEnergyLevel) / (maxEnergyLevel - minEnergyLevel))) + minHeight;
}

export default class EnergyLevelDiagram extends React.Component {
    constructor(props) {
        super(props);

        this.energyLevelValues = [-13.6, -3.4, -1.5, -0.9, -0.5, -0.4];
        
        // this.initialState = {
        //     deExciting: false,
        // }
        //
        // this.state = this.initialState;
    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    render() {

        // Energy level heights
        const e1 = convertToPixel(-13.6);
        const e2 = convertToPixel(-3.4);
        const e3 = convertToPixel(-1.5);
        const e4 = convertToPixel(-0.9);
        const e5 = convertToPixel(-0.5);
        const e6 = convertToPixel(-0.4);


        const leftX = 85;
        const rightX = 145;

        return (
            <svg width={WIDTH} height={HEIGHT}>
                {/*<circle cx={0} cy={0} r={10} fill={"green"}/>*/}

                {/*Energy Level 1*/}
                <line x1={leftX} y1={e1} x2={rightX} y2={e1} strokeWidth={1} stroke={"purple"}/>

                {/*Energy Level 2*/}
                <line x1={leftX} y1={e2} x2={rightX} y2={e2} strokeWidth={1} stroke={"grey"}/>

                {/*Energy Level 3*/}
                <line x1={leftX} y1={e3} x2={rightX} y2={e3} strokeWidth={1} stroke={"grey"}/>

                {/*Energy Level 4*/}
                <line x1={leftX} y1={e4} x2={rightX} y2={e4} strokeWidth={1} stroke={"grey"}/>

                {/*Energy Level 5*/}
                <line x1={leftX} y1={e5} x2={rightX} y2={e5} strokeWidth={1} stroke={"grey"}/>

                {/*Energy Level 6*/}
                <line x1={leftX} y1={e6} x2={rightX} y2={e6} strokeWidth={1} stroke={"grey"}/>

            </svg>
        );
    }
}