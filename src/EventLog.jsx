import React from 'react';
import { useRef, useEffect } from 'react';

const WIDTH = 250;
const HEIGHT = 300;

const renderEventEntries = () => {
    return (data, index) => {

        const pixelMargin = 50;
        let leftTextMargin = 10;
        let rightTextMargin = 150;
        let pixelHeight = (index + 1) * pixelMargin;

        let previousEnergyText = {};
        let newEnergyText = {};
        let arrowG = {};
        let arrowPath = {};

        let arrowRotation = data.emitted ? 0 : 90;
        if (data.absorbed || data.emitted) {
            previousEnergyText = {
                x: ((leftTextMargin + rightTextMargin) / 2) + 5,
                y: pixelHeight + 12.5,
                id: "previousEnergyText",
            }

            newEnergyText = {
                x: ((leftTextMargin + rightTextMargin) / 2) + 60,
                y: pixelHeight + 12.5,
                id: "newEnergyText",
            }

            arrowG = {
                transform: `translate(95, ${58 + index * 50})`
            };

            // If absorbed then arrow points to right, otherwise it must have been emitted, so arrow points to left
            let d = data.absorbed ? "M 0 0 L 40 0 M 40 0 L 32.5 3.5 M 40 0 L 32.5 -3.5"
                : "M0 0 L 40 0 M 0 0 L 7.5 3.5 M 0 0 L 7.5 -3.5";

            arrowPath = {
                stroke: "white",
                d: d
            };
        }

        let rightHandText = "";
        if (!Number.isNaN(data.photonEnergy)) rightHandText = `${data.photonEnergy.toFixed(2)} eV photon`;

        const leftTextProps = {
            x: leftTextMargin,
            y: pixelHeight,
            id: "leftTextEventLog",
        }

        const rightTextProps = {
            x: rightTextMargin,
            y: pixelHeight - 5,
            id: "rightTextEventLog",
        }

        const rightBottomTextProps = {
            x: rightTextMargin + 20,
            y: pixelHeight + 12.5,
            id: "rightTextEventLog",
        }

        const numEventText = {
            x: leftTextMargin + 5,
            y: pixelHeight - 30.0,
            id: "leftTextEventLog",
        }

        let leftEnergyLevel = Math.min(data.previousEnergyLevel, data.newEnergyLevel);
        let rightEnergyLevel = Math.max(data.previousEnergyLevel, data.newEnergyLevel);

        if (rightEnergyLevel === 7) rightEnergyLevel = "";

        return (<g key={index}>
            <g stroke={"grey"} strokeWidth={1} transform={`translate(0, ${pixelHeight - 25})`}>
                <path strokeDasharray="2,2" d="M 10 0 L 240 0" />
            </g>


            {/*Text that shows the event number (index)*/}
            {/*<text {...numEventText} >{index}</text>*/}

            <text {...leftTextProps} >{data.electronEvent}</text>
            <text {...rightTextProps} >{rightHandText}</text>
            <text {...rightBottomTextProps} >{data.photonEvent}</text>

            <text {...previousEnergyText} >{leftEnergyLevel}</text>
            <text {...newEnergyText} >{rightEnergyLevel}</text>

            <g {...arrowG} >
                <path {...arrowPath} />
                <g transform={`translate(20, -28) scale(0.025) rotate(${arrowRotation})`}>
                    <path fill={data.color} d={"M101 901 c-29 -22 -15 -34 32 -26 25 5 39 1 57 -13 23 -19 25 -27 23 -91 -2 -42 1 -71 7 -71 6 0 10 -6 10 -12 0 -24 60 -48 118 -48 49 0 59 -4 80  -27 20 -23 23 -35 17 -68 -13 -86 58 -159 133 -134 27 9 37 9 40 0 2 -6 10  -11 17 -11 21 0 47 -49 44 -83 -6 -59 9 -91 50 -109 21 -10 42 -18 47 -18 6 0 23 -14 39 -30 41 -43 24 -57 -47 -41 -118 26 -132 29 -144 24 -10 -4 -10 -9  -2 -23 8 -12 29 -20 65 -25 29 -3 55 -10 58 -15 2 -4 26 -11 52 -15 27 -4 53  -11 58 -15 10 -8 64 -14 98 -11 18 1 25 45 8 55 -5 4 -12 30 -16 59 -4 28 -11 57 -15 62 -4 6 -11 30 -14 55 -4 25 -11 54 -16 65 -4 11 -11 28 -14 37 -3 11  -11 15 -21 12 -9 -4 -14 -12 -11 -19 2 -6 7 -37 11 -69 4 -31 11 -59 16 -62 11 -7 12 -51 1 -58 -5 -3 -23 8 -41 25 -18 16 -47 33 -64 36 -51 10 -66 33  -64 102 2 56 0 63 -27 86 -24 21 -39 25 -93 25 -35 0 -63 4 -63 10 0 6 -6 10  -14 10 -24 0 -30 21 -28 87 2 35 -1 63 -6 63 -6 0 -12 8 -14 18 -8 31 -72 54  -124 46 -66 -10 -84 13 -84 104 0 63 -2 71 -26 88 -14 10 -32 25 -39 32 -19 18 -66 14 -94 -7z"} />
                </g>
            </g>
        </g>);
    }
}

// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
// const useMountEffect = (fun) => useEffect(fun, [])

// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)


export default class EventLog extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    scrollToMyRef() {
        // window.scrollTo(0, this.myRef.current.offsetTop);
        // console.log(`scolling now`);
        // const el = document.getElementById("dearScotty");
        // el.scrollTop = 50;
        // this.myRef.scrollTo(0, 100);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(`scrolling`);
        // this.scrollToMyRef();
    }

    render() {
        let adjustedHeight = HEIGHT;
        if (this.props.eventLog.length > 5) adjustedHeight += (this.props.eventLog.length - 5) * 50;

        return (
            // <div ref={this.myRef} style={{height: `${adjustedHeight}`}}>
            <div id={"dearScott"} ref={this.myRef}  style={{height: `${adjustedHeight}px`}} >
                <svg id={"dearScotty"} ref={this.myRef} width={WIDTH} height={adjustedHeight}>
                    <g>{ this.props.eventLog.map(renderEventEntries()) }</g>
                </svg>

                {/*<button onClick={this.scrollToMyRef.bind(this)}> Click to scroll </button>*/}
            </div>
        );
    }
}
