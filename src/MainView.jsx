import React from 'react';
import PropTypes from 'prop-types';

const WIDTH = 950;
const HEIGHT = 300;

const renderOrbitalRadii = () => {
    return (data, index) => {
        const circleProperties = {
            cx: 0,
            cy: HEIGHT / 2,
            r: data,
            stroke: "red",
            fill: "none",
            key: index
        }

        return <circle {...circleProperties} />;
    }
}

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.orbitalRadii = [20, 40, 110, 250, 420, 620, 880];

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
            <svg width={WIDTH} height={HEIGHT}>

                {/*The following <g> tag will hold all the red orbital lines*/}
                <g>{ this.orbitalRadii.map(renderOrbitalRadii()) }</g>
                <circle cx={0} cy={center} r={20} stroke={"red"} fill={"red"}/>
                <text x={2} y={center + 4} id={"HydrogenAtomText"}>p</text>
            </svg>
        );
    }
}

