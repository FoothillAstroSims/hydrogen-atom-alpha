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
        this.energyLevelValues = [-13.6, -3.4, -1.5, -0.9, -0.5, -0.4];

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
                                    updateEnergyLevel={this.updateEnergyLevel.bind(this)}
                                    startDeExcitation={this.startDeExcitation.bind(this)}
                                />
                            </svg>
                        </div>

                        <div className={"BackgroundCanvas"}>
                            <PhotonBeams
                                photon={this.state.photon}
                                currentEnergyLevel={this.state.currentEnergyLevel}
                                stopPhotonAnimation={this.stopPhotonAnimation.bind(this)}
                                startDeExcitation={this.startDeExcitation.bind(this)}
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

                        <p id={"frequencyLabel"}><i>Frequency</i></p>
                        <p id={"wavelengthLabel"}><i>Wavelength</i></p>
                        <p id={"energyLabel"}><i>Energy</i></p>

                    </div>

                    <div className={"EventLog"}>
                        <p className={"TitleText"}>Event Log</p>
                    </div>
                </div>

            </React.Fragment>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (this.state.electronIsBeingDragged) {
        //     clearInterval(this.timer.id);
        //     this.timer.started = false;
        //     return;
        // }
        //
        // console.log(`${this.state.electronIsBeingDragged}`);
        //
        // let canUpdateConditions = prevState.photon !== this.state.photon
        //     || prevState.currentEnergyLevel !== this.state.currentEnergyLevel
        //     || prevState.electronIsBeingDragged !== this.state.electronIsBeingDragged;
        //
        // if (canUpdateConditions) {
        //     this.stopPhotonEmission();
        //
        //     if (this.timer.started) { clearInterval(this.timer.id); }
        //     this.timer.started = true;
        //     this.timer.id = setTimeout(() => this.deExcitation(), 1000);
        // }
    }

    startDeExcitation() {
        // console.log(`${this.state.electronIsBeingDragged} hello`);
        if (this.state.electronIsBeingDragged) {
            clearInterval(this.timer.id);
            this.timer.started = false;
            return;
        }

        if (this.timer.started) { clearInterval(this.timer.id); }
        this.timer.started = true;
        this.timer.id = setTimeout(() => this.deExcitation(), 1000);
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
        if (newEnergyLevel !== 1) this.timer.id = setTimeout(() => this.deExcitation(), 1000);
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

    changePhoton(newPhoton, firePhotonNow) {
        // console.log(`hello new photon: ${newPhoton} and ${this.state.currentEnergyLevel}`);
        this.setState({
            photon: newPhoton
        }, () => {
            if (firePhotonNow) this.firePhoton();
        });
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
        // if (newEnergyLevel !== 1) this.startDeExcitation();
        this.setState({
            photon: photonState,
            currentEnergyLevel: newEnergyLevel
        }, () => {
            // if (newEnergyLevel !== 1) this.startDeExcitation();
        });
    }

    handleReset() {
        this.setState(this.initialState);
    }

}
