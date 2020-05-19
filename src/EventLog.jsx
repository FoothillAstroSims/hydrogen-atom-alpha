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

export default class EnergyLevelDiagram extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    render() {

        return (
            // <div style={{border: "1px solid green"}}>
                <svg width={WIDTH} height={HEIGHT + 100}>
                    <circle cx={0} cy={HEIGHT} r={50} fill={"green"}/>
                    <circle cx={0} cy={HEIGHT + 100} r={50} fill={"red"}/>

                </svg>
            // </div>
        );
    }
}