import React from 'react';

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
    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    render() {

        const energyLevelValues = [-13.6, -3.4, -1.5, -0.9, -0.5, -0.4];

        // Energy level heights
        const e1 = convertToPixel(energyLevelValues[0]);
        const e2 = convertToPixel(energyLevelValues[1]);
        const e3 = convertToPixel(energyLevelValues[2]);
        const e4 = convertToPixel(energyLevelValues[3]);
        const e5 = convertToPixel(energyLevelValues[4]);
        const e6 = convertToPixel(energyLevelValues[5]);

        const e1Color = this.props.currentEnergyLevel === 1 ? "deeppink" : "grey";
        const e2Color = this.props.currentEnergyLevel === 2 ? "deeppink" : "grey";
        const e3Color = this.props.currentEnergyLevel === 3 ? "deeppink" : "grey";
        const e4Color = this.props.currentEnergyLevel === 4 ? "deeppink" : "grey";
        const e5Color = this.props.currentEnergyLevel === 5 ? "deeppink" : "grey";
        const e6Color = this.props.currentEnergyLevel === 6 ? "deeppink" : "grey";

        const leftX = 85;
        const rightX = 145;

        const heightOfText = convertToPixel(energyLevelValues[this.props.currentEnergyLevel - 1]) + 5;
        const xEnergyLevelText = leftX - 50;

        const xEnergyLevelValue = leftX + 75;

        const energyLevel = `level ${this.props.currentEnergyLevel}`;
        const energyValue = `${energyLevelValues[this.props.currentEnergyLevel - 1]} eV`;

        return (
            <svg width={WIDTH} height={HEIGHT}>
                {/*<circle cx={0} cy={0} r={10} fill={"green"}/>*/}

                {/*Energy Level 1*/}
                <line x1={leftX} y1={e1} x2={rightX} y2={e1} strokeWidth={1} stroke={e1Color}/>

                {/*Energy Level 2*/}
                <line x1={leftX} y1={e2} x2={rightX} y2={e2} strokeWidth={1} stroke={e2Color}/>

                {/*Energy Level 3*/}
                <line x1={leftX} y1={e3} x2={rightX} y2={e3} strokeWidth={1} stroke={e3Color}/>

                {/*Energy Level 4*/}
                <line x1={leftX} y1={e4} x2={rightX} y2={e4} strokeWidth={1} stroke={e4Color}/>

                {/*Energy Level 5*/}
                <line x1={leftX} y1={e5} x2={rightX} y2={e5} strokeWidth={1} stroke={e5Color}/>

                {/*Energy Level 6*/}
                <line x1={leftX} y1={e6} x2={rightX} y2={e6} strokeWidth={1} stroke={e6Color}/>

                <text x={xEnergyLevelText} y={heightOfText} id={"eLevelText"}>{energyLevel}</text>
                <text x={xEnergyLevelValue} y={heightOfText} id={"eLevelText"}>{energyValue}</text>

            </svg>
        );
    }
}