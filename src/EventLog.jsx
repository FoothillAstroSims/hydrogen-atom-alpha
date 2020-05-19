import React from 'react';

const WIDTH = 285;
const HEIGHT = 330;

const convertToPixel = (energyLevel) => {
    const minHeight = 30;
    const maxHeight = 220;
    const minEnergyLevel = 0.4;
    const maxEnergyLevel = 13.6;

    return ((maxHeight - minHeight) * ((-energyLevel - minEnergyLevel) / (maxEnergyLevel - minEnergyLevel))) + minHeight;
}

const renderEventEntries = () => {
    return (data, index) => {

        const pixelMargin = 50;
        let leftTextMargin = 20;
        let rightTextMargin = 150;
        let pixelHeight = (index + 1) * pixelMargin;

        let photonReaction = "not absorbed";
        let leftHandText = "";
        if (data.emitted) {
            leftHandText = "deexcitation";
            photonReaction = "emitted";
        }
        if (data.absorbed) {
            leftHandText = "excitation";
            photonReaction = "absorbed";
        }

        let rightHandText = `${data.photonEnergy.toFixed(2)} eV photon`;
        const leftTextProps = {
            x: leftTextMargin,
            y: pixelHeight,
            id: "eLevelText",
        }

        const rightTextProps = {
            x: rightTextMargin,
            y: pixelHeight,
            id: "eLevelText",
        }

        const rightBottomTextProps = {
            x: rightTextMargin,
            y: pixelHeight + 12.5,
            id: "eLevelText",
        }

        return (<g key={index}>
            {/*<text x={0} y={pixelHeight} id={"eLevelText"} key={index} >{leftHandText}</text>*/}
            <text {...leftTextProps} >{leftHandText}</text>
            <text {...rightTextProps} >{rightHandText}</text>
            <text {...rightBottomTextProps} >{photonReaction}</text>
        </g>);
    }
}

export default class EnergyLevelDiagram extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    render() {

        return (
            <svg width={WIDTH} height={HEIGHT}>
                <circle cx={0} cy={HEIGHT} r={50} fill={"green"}/>
                <circle cx={0} cy={HEIGHT + 100} r={50} fill={"red"}/>

                <g>{ this.props.eventLog.map(renderEventEntries()) }</g>

                {/*<text x={0} y={50} id={"eLevelText"} key={50} >{"hello bithces"}</text>*/}
            </svg>
        );
    }
}