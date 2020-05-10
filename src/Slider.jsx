import React from 'react';
import { getWavelengthHex, getWavelengthRGB } from "./utils/WavelengthToHex";
import Button from "./utils/Button";

const PLANCK_CONSTANT = 6.62607004e-34;
const COULOMB_CHARGE = 1.602176634e-19;
const LIGHT_SPEED = 299792458;

export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.bg = `linear-gradient(90deg, #630063 30.8%, #d7dcdf 30.9%)`;
        this.criticalPhotonEVs = [0.66, 0.97, 1.1, 1.9, 2.5, 2.9, 3.0, 10.2, 12.1, 12.8, 13.1, 13.2];
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
            let epsilon = 0.04;
            let energyValue = energy;
            this.criticalPhotonEVs.forEach((element, index) => {
                if (energy < (element + epsilon) && energy > (element - epsilon)) energyValue = element;
            })

            return energyValue;
        }

        let newEnergyValue = getSnappedOnEnergyValues(Number.parseFloat(e.target.value));
        let photonFrequency = (newEnergyValue / PLANCK_CONSTANT) * COULOMB_CHARGE;
        let photonWavelength = ((PLANCK_CONSTANT * LIGHT_SPEED) / newEnergyValue) / COULOMB_CHARGE;
        let photonColorHex = getWavelengthHex(photonWavelength * 1e9);
        let photonColorRGB = getWavelengthRGB(photonWavelength * 1e9);

        let newPhoton = {
            fired: this.props.photon.fired,
            frequency: photonFrequency,
            wavelength: photonWavelength,
            energyValue: newEnergyValue,
            passThrough: this.props.photon.passThrough,
            color: photonColorRGB
        }

        this.styling(newEnergyValue, photonColorHex);
        this.props.changePhoton(newPhoton);
    }

    styling(energy, color) {
        const settings={
            fill: color,
            background: '#d7dcdf'
        }

        const percentage = 100 * (energy - 0.03) / (15 - 0.03);
        this.bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage+0.1}%)`;
    }

    changeSlider(e) {
        console.log(`hello ${e}`);
    }

    render() {
        return (
            <React.Fragment>
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

                <Button
                    symbol={"Pα"}
                    changeSliderValue={this.changeSlider.bind(this)}
                    id={"Pa"}
                />

                <Button
                    symbol={"Pᵧ"}
                    changeSliderValue={this.changeSlider.bind(this)}
                    id={"Py"}
                />

                <Button
                    symbol={"Hᵦ"}
                    changeSliderValue={this.changeSlider.bind(this)}
                    id={"Hb"}
                />

                <Button
                    symbol={"Hδ"}
                    changeSliderValue={this.changeSlider.bind(this)}
                    id={"Hd"}
                />

                <Button
                    symbol={"Pᵦ"}
                    changeSliderValue={this.changeSlider.bind(this)}
                    id={"Pb"}
                />

                <Button
                    symbol={"Hα"}
                    changeSliderValue={this.changeSlider.bind(this)}
                    id={"Ha"}
                />

                <Button
                    symbol={"Hᵧ"}
                    changeSliderValue={this.changeSlider.bind(this)}
                    id={"Hy"}
                />

                <Button
                    symbol={"Lα"}
                    changeSliderValue={this.changeSlider.bind(this)}
                    id={"La"}
                />

                <Button
                    symbol={"Lᵦ"}
                    changeSliderValue={this.changeSlider.bind(this)}
                    id={"Lb"}
                />

                <Button
                    symbol={"Lᵧ"}
                    changeSliderValue={this.changeSlider.bind(this)}
                    id={"Ly"}
                />

                <Button
                    symbol={"Lε"}
                    changeSliderValue={this.changeSlider.bind(this)}
                    id={"Le"}
                />

                <Button
                    symbol={"Lδ"}
                    changeSliderValue={this.changeSlider.bind(this)}
                    id={"Ld"}
                />


            </React.Fragment>

        )
    }
}

