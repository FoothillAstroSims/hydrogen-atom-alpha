// TODO: PHOTON SELECTION COMPONENT
// 3 Spectrums:
// TODO Add tickmarks to the spectrums
// TODO Change font size and color for spectrum values
// TODO Add labels right above the slider indicating the general range for each (infrared, uv, visible)
// Buttons
// TODO Add buttons that snap to certain photon configurations
// TODO Add snapping action for when you get close to a certain special photon configuration

// TODO: MainView component
// TODO After photon hits, move the electron to outside screen and then bring it back using transition
// TODO Do calculations behind whether photon hitting results in particular action
// TODO: EVENT LOG
// TODO Keep track of all actions in an array to be displayed by the event log

import React from 'react';
import NavigationBar from './NavigationBar.jsx';
import MainView from './MainView.jsx';
import Spectrum from './Spectrum.jsx';
import PhotonBeams from './PhotonBeams.jsx';
import { formatFrequency, formatEnergy, formatWavelength } from "./utils/FormatValues";
import Electron from "./Electron";

const PLANCK_CONSTANT = 6.62607004e-34;
const COULOMB_CHARGE = 1.602176634e-19;
const LIGHT_SPEED = 299792458;

const WIDTH = 950;
const HEIGHT = 300;

export default class HydrogenAtomSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            eventLog: [],
            currentEnergyLevel: 1,
            timeUntilDeExcitation: 0,
            photon: {
                fired: false,
                frequency: 1.1123E15,
                wavelength: 271,
                energyValue: 4.6,
                passThrough: true,
            }
        };

        this.state = this.initialState;
        this.energyLevelValues = [-13.6, -3.4, -1.5, -0.9, -0.5, -0.4];

        this.handleNewParameters = this.handleNewParameters.bind(this);
        this.handleReset = this.handleReset.bind(this)
    }

    render() {
        return (
            <React.Fragment>
                <div className="NavigationBar">
                    <NavigationBar
                        onReset={this.handleReset.bind(this)}
                    />
                </div>

                <div className={"TopHalf"}>
                    <div className={"MainView"}>
                        <div className={"BackgroundSVG"}>
                            <svg width={WIDTH} height={HEIGHT}>
                                <MainView
                                    fired={this.state.photon.fired}
                                    currentEnergyLevel={this.state.currentEnergyLevel}
                                    updateEnergyLevel={this.updateEnergyLevel.bind(this)}
                                />
                            </svg>
                        </div>

                        <div className={"BackgroundCanvas"}>
                            <PhotonBeams
                                photon={this.state.photon}
                                currentEnergyLevel={this.state.currentEnergyLevel}
                                stopPhotonAnimation={this.stopPhotonAnimation.bind(this)}
                            />
                        </div>
                    </div>

                    <div className={"Diagram"}>
                        <p className={"TitleText"}>Energy Level Diagram</p>
                    </div>
                </div>

                <div className={"BottomHalf"}>
                    <div className={"Controls"}>
                        <p className={"TitleText"}>Photon Selection</p>

                        <div className={"PhotonSpectrum"}>
                            <Spectrum
                                energyValue={this.state.photon.energyValue}
                                value={formatFrequency(this.state.photon.frequency)}
                                id={0}
                            />
                        </div>

                        <div className={"PhotonSpectrum"}>
                            <Spectrum
                                energyValue={this.state.photon.energyValue}
                                value={formatWavelength(this.state.photon.wavelength)}
                                id={1}
                            />
                        </div>

                        <div className={"PhotonSpectrum"}>
                            <Spectrum
                                energyValue={this.state.photon.energyValue}
                                value={formatEnergy(this.state.photon.energyValue)}
                                id={2}
                            />
                        </div>

                        <div className={"SliderContainer"}>
                            <input
                                type="range"
                                min={0.03}
                                max={15.00}
                                step={0.01}
                                id={"slider"}
                                value={this.state.photon.energyValue}
                                onChange={this.onPhotonValueChange.bind(this)}
                            />
                        </div>

                        <div className={"FirePhotonButton"}>
                            <button type="box"
                                    className="btn btn-danger btn-sm"
                                    onClick={this.firePhoton.bind(this)}>
                                {"Fire Photon"}
                            </button>
                        </div>

                    </div>

                    <div className={"EventLog"}>
                        <p className={"TitleText"}>Event Log</p>
                    </div>
                </div>

            </React.Fragment>
        );
    }

    updateEnergyLevel(newEnergyLevel) {
        this.setState({ currentEnergyLevel: newEnergyLevel})
    }

    stopPhotonAnimation() {
        let photonState = this.state.photon;
        photonState.fired = false;
        this.setState({ photon: photonState });
    }

    firePhoton() {
        // If the photon has already been fired, you can't fire it again until it passes.
        if (this.state.photon.fired) return;

        let baseEnergy = -13.6;
        let photonEnergy = this.state.photon.energyValue;
        let electronEnergy = baseEnergy / Math.pow(this.state.currentEnergyLevel, 2);
        let totalEnergy = Number.parseFloat((photonEnergy + electronEnergy).toFixed(2));

        let newEnergyLevel = this.state.currentEnergyLevel;
        this.energyLevelValues.forEach((element, index) => {
            if (element === totalEnergy) { newEnergyLevel = index + 1; }
        });

        let photonState = this.state.photon;
        photonState.fired = true;
        photonState.passThrough = newEnergyLevel === this.state.currentEnergyLevel;
        // console.log(`new pass thru value: ${photonState.passThrough}`);
        this.setState({
            photon: photonState,
            currentEnergyLevel: newEnergyLevel
        });
    }

    // Updates the properties of the photon using the new energy value
    onPhotonValueChange(e) {
        // If the photon is currently being fired, then don't update anything
        if (this.state.photon.fired) return;

        const getSnappedOnEnergyValues = (energy) => {
            let criticalPhotonEVs = [0.66, 0.97, 1.1, 1.9, 2.5, 2.9, 3.0, 10.2, 12.1, 12.8, 13.1, 13.2];
            let epsilon = 0.08;
            let energyValue = energy;
            criticalPhotonEVs.forEach((element, index) => {
                if (energy < (element + epsilon) && energy > (element - epsilon)) energyValue = element;
                // console.log(`energyValue: ${energyValue} and type: ${typeof energyValue}`);
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

        this.setState({ photon: newPhoton });
    }

    handleNewParameters(newParams) {
        this.setState({ parameters: newParams });
    }

    handleReset() {
        this.setState(this.initialState);
    }

}
