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
        // Setting the first energy level stroke to red to indicate that's our current level
        this.orbitalRadii[1].stroke = "red";

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
        this.updateCurrentCurve();
    }

    updateCurrentCurve() {
        for (let i = 0; i < this.orbitalRadii.length; i++) {
            this.orbitalRadii[i].stroke = "grey";
        }

        this.orbitalRadii[this.props.currentEnergyLevel].stroke = "red";
    }

    render() {
        const center = HEIGHT / 2;
        // this.updateCurrentCurve();
        return (
            <g>
                {/*The following <g> tag will hold all the red orbital lines*/}
                <g>{ this.orbitalRadii.map(renderOrbitalRadii()) }</g>
                {/*The following circle and text are for the red proton with the letter p*/}
                <circle cx={0} cy={center} r={20} stroke={"red"} fill={"red"}/>
                <text x={2} y={center + 4} id={"HydrogenAtomText"}>p</text>

                {/*The Electron component returns a <g> tag that draws the draggable circle for us*/}
                <Electron
                    fired={this.props.fired}
                    emitted={this.props.emitted}
                    currentEnergyLevel={this.props.currentEnergyLevel}
                    updateEnergyLevel={this.props.updateEnergyLevel}
                    startDeExcitation={this.props.startDeExcitation}
                />
            </g>
        );
    }
}

