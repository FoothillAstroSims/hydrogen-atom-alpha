import React from 'react';
import { scaleLinear } from 'd3/dist/d3';
import PropTypes from 'prop-types';

const WIDTH = 860;
const HEIGHT = 60;

const scale = scaleLinear()
        .domain([0, 15])
        .range([48, WIDTH - 51]);

export default class Spectrum extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    render() {
        const linePosition = scale(this.props.energyValue);
        const shiftLeftValues = [45, 25, 17];
        // The props id sent to us basically indicates whether we are passing frequency, wavelength, or eV so that
        // we can center align the numbers on top of the tick
        const shiftLeft = shiftLeftValues[this.props.id];
        const topY = (HEIGHT / 2) + 5;
        const bottomY = (HEIGHT / 2) - 5;
        return (
            <svg width={WIDTH} height={HEIGHT}>
                <line x1={linePosition} x2={linePosition} y1={topY} y2={bottomY} stroke={"red"} strokeWidth={2}/>
                <text className={"spectrumTexts"} x={linePosition - shiftLeft} y={20} >{this.props.value}</text>
            </svg>
        );
    }
}
