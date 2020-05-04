import React from 'react';
import { scaleLinear } from 'd3/dist/d3';
import PropTypes from 'prop-types';

const WIDTH = 950;
const HEIGHT = 300;

const scale = () => {
    return scaleLinear()
        .domain([0, 15])
        .range([0, WIDTH]);
};

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
        const lineScale = scale();
        const linePosition = lineScale(this.props.energyValue);
        console.log(`linePos: ${linePosition} and energy Val: ${this.props.energyValue}`);
        return (
            <svg width={WIDTH} height={HEIGHT}>
                <line x1={linePosition} x2={linePosition} y1={0} y2={30} stroke={"red"} strokeWidth={2}/>
                {/*<line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />*/}
            </svg>
        );
    }
}