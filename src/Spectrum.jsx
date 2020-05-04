import React from 'react';
import { scaleLinear } from 'd3/dist/d3';
import PropTypes from 'prop-types';

const WIDTH = 860;
const HEIGHT = 60;

const scale = scaleLinear()
        .domain([0, 15])
        .range([0, WIDTH]);

const formatValue = (value) => {
    // console.log(`value type: ${typeof value} ${value}`);
    return value;
}

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
        const topY = (HEIGHT / 2) + 5;
        const bottomY = (HEIGHT / 2) - 5;
        const displayValue = formatValue(this.props.value);
        return (
            <svg width={WIDTH} height={HEIGHT}>
                <line x1={linePosition} x2={linePosition} y1={topY} y2={bottomY} stroke={"red"} strokeWidth={2}/>
                <text x={linePosition - 13} y={20} >{displayValue}</text>
                {/*<line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />*/}
            </svg>
        );
    }
}