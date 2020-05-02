import React from 'react';
import PropTypes from 'prop-types';

const WIDTH = 950;
const HEIGHT = 300;

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentDidUpdate() {

    }

    render() {
        const center = HEIGHT / 2;
        return (
            <svg width={WIDTH} height={HEIGHT}>
                <circle cx={0} cy={center} r={20} stroke={"red"} fill={"red"}/>
                <circle cx={0} cy={center} r={40} stroke={"red"} fill={"none"}/>
                <circle cx={0} cy={center} r={110} stroke={"red"} fill={"none"}/>
                <circle cx={0} cy={center} r={250} stroke={"red"} fill={"none"}/>
                <circle cx={0} cy={center} r={420} stroke={"red"} fill={"none"}/>
                <circle cx={0} cy={center} r={620} stroke={"red"} fill={"none"}/>
                <circle cx={0} cy={center} r={880} stroke={"red"} fill={"none"}/>
                <text x={2} y={center + 4} id={"HydrogenAtomText"}>p</text>
            </svg>
        );
    }
}

