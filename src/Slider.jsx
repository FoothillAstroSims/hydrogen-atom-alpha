import React from 'react';
import { getHex } from "./utils/WavelengthToHex";

const PLANCK_CONSTANT = 6.62607004e-34;
const COULOMB_CHARGE = 1.602176634e-19;
const LIGHT_SPEED = 299792458;

export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.bg = `linear-gradient(90deg, rgb(0,255,0) 25%, #d7dcdf 25.1%)`;
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    onPhotonValueChange(e) {
        // If the photon is currently being fired, then don't update anything
        if (this.props.photon.fired) return;

        const getSnappedOnEnergyValues = (energy) => {
            let criticalPhotonEVs = [0.66, 0.97, 1.1, 1.9, 2.5, 2.9, 3.0, 10.2, 12.1, 12.8, 13.1, 13.2];
            let epsilon = 0.08;
            let energyValue = energy;
            criticalPhotonEVs.forEach((element, index) => {
                if (energy < (element + epsilon) && energy > (element - epsilon)) energyValue = element;
            })

            return energyValue;
        }

        let newEnergyValue = getSnappedOnEnergyValues(Number.parseFloat(e.target.value));
        let photonFrequency = (newEnergyValue / PLANCK_CONSTANT) * COULOMB_CHARGE;
        let photonWavelength = ((PLANCK_CONSTANT * LIGHT_SPEED) / newEnergyValue) / COULOMB_CHARGE;

        let newPhoton = {
            fired: false,
            energyValue: newEnergyValue,
            frequency: photonFrequency,
            wavelength: photonWavelength
        }

        this.styling(e, getHex(photonWavelength * 1e9));

        this.props.changePhoton(newPhoton);
    }

    styling(e, color) {
        const settings={
            fill: color,
            background: '#d7dcdf'
        }

        let val = e.target.value;
        const percentage = 100 * (val - 0.03) / (15 - 0.03);

        this.bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage+0.1}%)`;
        console.log(`bg::: ${this.bg}`);
    }

    render() {
        return (
            <div className={"range-slider"}>
                <input
                    type="range"
                    min={0.03}
                    max={15.00}
                    step={0.01}
                    style={{background: this.bg}}
                    className={"range-slider__range"}
                    id={"slider"}
                    value={this.props.photon.energyValue}
                    onChange={this.onPhotonValueChange.bind(this)}
                />
            </div>
        )
    }
}

// import React from 'react';
// import { select, scaleLinear, drag, event} from 'd3/dist/d3';
//
// const WIDTH = 800;
// const HEIGHT = 50;
//
// export default class Slider extends React.Component {
//     constructor(props) {
//         super(props);
//         this.ref = React.createRef();
//     }
//
//     componentDidMount() {
//         let scaleX = scaleLinear()
//             .domain([0, WIDTH])
//             .range([0, WIDTH])
//             .clamp(true);
//
//         let slider = select(this.ref.current)
//             .append("g")
//             .attr("class", "slider")
//             .attr("transform", "translate(50, 25)");
//
//         let firstSlider = slider.append("line")
//             .attr("class", "track")
//             .attr("x1", 0)
//             .attr("x2", WIDTH - 60);
//
//         let secondSlider = firstSlider.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
//             .attr("class", "track-inset");
//
//         let sliderFill = slider.append("line")
//             .attr("class", "filler")
//             .attr("x1", 0)
//             .attr("x2", 0)
//             .attr("stroke", "rgba(0,255,0,0.5)");
//
//         secondSlider
//             .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
//             .attr("class", "track-overlay")
//             .call(drag()
//                 .on("start.interrupt", function() { slider.interrupt(); })
//                 .on("start drag", function() {
//                     let newX = event.x;
//                     console.log(`new X: ${newX}`);
//                     if (newX > WIDTH - 50) newX = WIDTH - 50;
//                     hue(newX);
//                 }));
//
//         let handle = slider.insert("g", ".track-overlay")
//             .attr("class", "handle")
//             .attr("transform", "translate(-5,-10)")
//             .append("path")
//             .attr("d", "M 0 0 L 15 0 L 15 12 L 7.5 18.5 L 0 12 L 0 0 Z")
//             .attr("fill", "white")
//
//         function hue(h) {
//             handle.attr("transform", `translate(${scaleX(h) - 5}, 0)`);
//             sliderFill.attr("x2", scaleX(h));
//         }
//     }
//
//     componentWillUnmount() {
//
//     }
//
//     componentDidUpdate(prevProps, prevState, snapShot) {
//
//     }
//
//     render() {
//         return (
//             <div style={{border: "1px solid darkmagenta"}}>
//                 <svg width={WIDTH} height={HEIGHT}>
//                     <g ref={this.ref} />
//                 </svg>
//             </div>
//
//         )
//     }
// }

