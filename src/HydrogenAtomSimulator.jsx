import React from 'react';
import NavigationBar from './NavigationBar.jsx';
import MainView from './MainView.jsx';
import Spectrum from './Spectrum.jsx';
import PhotonBeams from './PhotonBeams.jsx';
import { formatFrequency, formatEnergy, formatWavelength } from "./utils/FormatValues";
import {tickMarkEnergyValues, tickMarkFrequencyValues, tickMarkWavelengthValues} from "./utils/TickMarksData";
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
            electronIsBeingDragged: false,
            moveElectron: false,
            automaticDeExcitation: true,
            photon: {
                fired: false,
                emitted: false,
                frequency: 6.0E15,
                wavelength: 495E-9,
                energyValue: 2.5,
                passThrough: true,
                color: "rgb(0,255,192)"
            }
        };

        this.state = this.initialState;
        // this.energyLevelValues = [-13.6, -3.4, -1.5, -0.9, -0.5, -0.4];
        this.energyLevelValues = [-13.598, -3.400, -1.511, -0.850, -0.544, -0.378];

        this.timer = {
            id: null,
            started: false,
        };

        this.deExcitation = this.deExcitation.bind(this);
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
                                    emitted={this.state.photon.emitted}
                                    currentEnergyLevel={this.state.currentEnergyLevel}
                                    moveElectron={this.state.moveElectron}
                                    updateEnergyLevel={this.updateEnergyLevel.bind(this)}
                                    startDeExcitation={this.startDeExcitation.bind(this)}
                                    changeElectronState={this.changeElectronState.bind(this)}
                                    electronIsBeingDragged={this.state.electronIsBeingDragged}
                                />
                            </svg>
                        </div>

                        <div className={"BackgroundCanvas"}>
                            <PhotonBeams
                                photon={this.state.photon}
                                currentEnergyLevel={this.state.currentEnergyLevel}
                                stopPhotonAnimation={this.stopPhotonAnimation.bind(this)}
                                startDeExcitation={this.startDeExcitation.bind(this)}
                                changeElectronState={this.changeElectronState.bind(this)}
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
                                tickMarksData={tickMarkFrequencyValues}
                                id={0}
                            />
                        </div>

                        <div className={"PhotonSpectrum"}>
                            <Spectrum
                                energyValue={this.state.photon.energyValue}
                                value={formatWavelength(this.state.photon.wavelength)}
                                tickMarksData={tickMarkWavelengthValues}
                                id={1}
                            />
                        </div>

                        <div className={"PhotonSpectrum"}>
                            <Spectrum
                                energyValue={this.state.photon.energyValue}
                                value={formatEnergy(this.state.photon.energyValue)}
                                tickMarksData={tickMarkEnergyValues}
                                id={2}
                            />
                        </div>

                        <div className={"sliderNames"}>
                            <p id={"infraredLabel"}>Infrared</p>
                            <p id={"visibleLabel"}>Visible</p>
                            <p id={"ultravioletLabel"}>Ultraviolet</p>
                        </div>

                        {/*<div className={"SliderContainer"}>*/}
                            <Slider
                                photon={this.state.photon}
                                changePhoton={this.changePhoton.bind(this)}
                                firePhoton={this.firePhoton.bind(this)}
                            />
                        {/*</div>*/}

                        <div className={"FirePhotonButton"}>
                            <button type="box"
                                    className="fireButton"
                                    style={{backgroundColor: this.state.photon.color}}
                                    onClick={this.firePhoton.bind(this)}>
                                {"Fire Photon "}
                            </button>
                        </div>

                        <div className={"pauseSwitch"}>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    onChange={this.changePauseDeExcitation.bind(this)}
                                    checked={this.state.automaticDeExcitation}
                                />
                                <span className="slider round"/>
                            </label>
                        </div>

                        <p id={"frequencyLabel"}><i>Frequency</i></p>
                        <p id={"wavelengthLabel"}><i>Wavelength</i></p>
                        <p id={"energyLabel"}><i>Energy</i></p>
                        <p id={"pauseSwitchText"}>Automatic<br />DeExcitation</p>

                    </div>

                    <div className={"EventLog"}>
                        <p className={"TitleText"}>Event Log</p>
                    </div>
                </div>

            </React.Fragment>
        );
    }

    changePauseDeExcitation() {
        this.setState({ automaticDeExcitation: !this.state.automaticDeExcitation});
        if (this.state.automaticDeExcitation) {
            clearInterval(this.timer.id);
            this.timer.started = false;
        } else {
            if (this.timer.started) { clearInterval(this.timer.id); }
            this.timer.started = true;
            this.timer.id = setTimeout(() => this.deExcitation(), 3000);
        }
    }

    startDeExcitation() {
        if (this.state.electronIsBeingDragged || !this.state.automaticDeExcitation) {
            clearInterval(this.timer.id);
            this.timer.started = false;
            return;
        }

        if (this.timer.started) { clearInterval(this.timer.id); }
        this.timer.started = true;
        this.timer.id = setTimeout(() => this.deExcitation(), 3000);
    }

    deExcitation() {
        let photonS = this.state.photon;
        photonS.emitted = true;
        let newEnergyLevel = Math.floor(Math.random() * (this.state.currentEnergyLevel - 1)) + 1;
        this.setState({
            photon: photonS,
            currentEnergyLevel: newEnergyLevel,
        });

        this.timer.started = false;
        clearInterval(this.timer.id);
        this.stopPhotonEmission();
        if (newEnergyLevel !== 1) this.timer.id = setTimeout(() => this.deExcitation(), 3000);
    }

    updateEnergyLevel(newEnergyLevel, beingDragged) {
        this.setState({
            currentEnergyLevel: newEnergyLevel,
            electronIsBeingDragged: beingDragged
        });
    }

    stopPhotonEmission() {
        let photonState = this.state.photon;
        photonState.emitted = false;
        this.setState({ photon: photonState });
    }

    stopPhotonAnimation() {
        let photonState = this.state.photon;
        photonState.fired = false;
        this.setState({ photon: photonState });
    }

    changeElectronState(moveElectron) {
        if (this.state.moveElectron !== moveElectron) this.setState( {moveElectron: moveElectron });
    }

    changePhoton(newPhoton, firePhotonNow) {
        this.setState({
            photon: newPhoton
        }, () => {
            if (firePhotonNow) this.firePhoton();
        });
    }

    firePhoton() {
        // If the photon has already been fired, you can't fire it again until it passes.
        if (this.state.photon.fired) return;

        // possibly temporary
        clearInterval(this.timer.id);
        this.timer.started = false;

        // let baseEnergy = -13.598;
        let photonEnergy = this.state.photon.energyValue;
        // let electronEnergy = baseEnergy / Math.pow(this.state.currentEnergyLevel, 2);
        let electronEnergy = this.energyLevelValues[this.state.currentEnergyLevel - 1];
        let totalEnergy = Number.parseFloat((photonEnergy + electronEnergy).toFixed(3));

        let newEnergyLevel = totalEnergy >= 0 ? 7 : this.state.currentEnergyLevel;
        let delta = 0.01;
        this.energyLevelValues.forEach((element, index) => {
            console.log(`total ${totalEnergy} element ${element} the difference: ${totalEnergy - element}`);
            if (totalEnergy >= (element - delta) && totalEnergy <= (element + delta)) {
                newEnergyLevel = index + 1;
            }
        });

        let photonState = this.state.photon;
        photonState.fired = true;
        photonState.passThrough = newEnergyLevel === this.state.currentEnergyLevel;
        this.setState({
            photon: photonState,
            currentEnergyLevel: newEnergyLevel
        });
    }

    handleReset() {
        this.setState(this.initialState);
    }
}