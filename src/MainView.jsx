import React from 'react';
import PropTypes from 'prop-types';
import Electron from './Electron';

const WIDTH = 950;
const HEIGHT = 300;

const renderOrbitalRadii = () => {
    return (data, index) => {
        const circleProperties = {
            cx: 0,
            cy: HEIGHT / 2,
            r: data.r,
            stroke: data.stroke,
            fill: "none",
            key: index
        }

        return <circle {...circleProperties} />;
    }
}

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        // Settings the properties of the curved lines
        this.orbitalRadii = [{r: 20}, {r: 40}, {r: 110}, {r: 250}, {r: 420}, {r: 620}, {r: 880}];
        // Setting the stroke property of the curved lines to grey
        this.orbitalRadii.forEach(element => { element.stroke = "grey" });

        this.initialState = {
            deExciting: false,
        }

        this.state = this.initialState;
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        
    }

    render() {
        const center = HEIGHT / 2;
        return (
            // <svg width={WIDTH} height={HEIGHT}>

            <g>
                {/*The following <g> tag will hold all the red orbital lines*/}
                <g>{ this.orbitalRadii.map(renderOrbitalRadii()) }</g>
                {/*The following circle and text are for the red proton with the letter p*/}
                <circle cx={0} cy={center} r={20} stroke={"red"} fill={"red"}/>
                <text x={2} y={center + 4} id={"HydrogenAtomText"}>p</text>

                {/*<Electron*/}

                {/*/>*/}

            </g>

            // </svg>
        );
    }
}

