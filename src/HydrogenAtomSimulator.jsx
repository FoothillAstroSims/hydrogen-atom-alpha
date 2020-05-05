// TODO: PHOTON SELECTION COMPONENT
// 3 Spectrums:
// TODO Add tickmarks to the spectrums
// TODO Change font size and color for spectrum values
// TODO Add labels right above the slider indicating the general range for each (infrared, uv, visible)
// Buttons
// TODO Add buttons that snap to certain photon configurations
// TODO Add snapping action for when you get close to a certain special photon configuration

// TODO: MainView component
// TODO After photon hits, move the electron to outside screen and then bring it back using animation
// TODO Do calculations behind whether photon hitting results in particular action
// TODO: EVENT LOG
// TODO Keep track of all actions in an array to be displayed by the event log

import React from 'react';
import NavigationBar from './NavigationBar.jsx';
import MainView from './MainView.jsx';
import Spectrum from './Spectrum.jsx';
import PhotonBeams from './PhotonBeams.jsx';
import { formatFrequency, formatEnergy, formatWavelength } from "./utils/FormatValues";

const PLANCK_CONSTANT = 6.62607004e-34;
const COULOMB_CHARGE = 1.602176634e-19;
const LIGHT_SPEED = 299792458;

export default class HydrogenAtomSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            currentEnergyLevel: 1,
            timeUntilDeExcitation: 0,
            photon: {
                fired: false,
                frequency: 1.1123E15,
                wavelength: 271,
                energyValue: 4.6
            }
        };

        this.state = this.initialState;

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
                        <MainView

                        />
                        <div className={"BackgroundCanvas"}>
                            <PhotonBeams
                                animatePhoton={this.state.photon.fired}
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
                            />
                        </div>

                        <div className={"PhotonSpectrum"}>
                            <Spectrum
                                energyValue={this.state.photon.energyValue}
                                value={formatWavelength(this.state.photon.wavelength)}
                            />
                        </div>

                        <div className={"PhotonSpectrum"}>
                            <Spectrum
                                energyValue={this.state.photon.energyValue}
                                value={formatEnergy(this.state.photon.energyValue)}
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

    stopPhotonAnimation() {
        let photonState = this.state.photon;
        photonState.fired = false;
        this.setState({ photon: photonState });
    }

    firePhoton() {
        // If the photon has already ben fired, you can't fire it again until it passes.
        if (this.state.photon.fired) return;

        let photonState = this.state.photon;
        photonState.fired = true;
        this.setState({ photon: photonState });
    }

    // Updates the properties of the photon using the new energy value
    onPhotonValueChange(e) {
        // If the photon is currently being fired, then don't update anything
        if (this.state.photon.fired) return;

        let newEnergyValue = e.target.value;
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
