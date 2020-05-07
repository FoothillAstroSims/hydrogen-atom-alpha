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
import Slider from "./Slider";

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
                color: "rgb(98.7,0,98.7)"
            }
        };

        this.state = this.initialState;
        this.energyLevelValues = [-13.6, -3.4, -1.5, -0.9, -0.5, -0.4];

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
                            <Slider
                                photon={this.state.photon}
                                changePhoton={this.changePhoton.bind(this)}
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

    changePhoton(newPhoton) {
        this.setState({ photon: newPhoton });
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

    handleReset() {
        this.setState(this.initialState);
    }

}
