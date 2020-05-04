import React from 'react';
import NavigationBar from './NavigationBar.jsx';
import MainView from './MainView.jsx';
import Spectrum from './Spectrum.jsx';
import ClusterControls from './ClusterControls.jsx';

const PLANCKSCONSTANT = 6.62607004e-34;
const COULUMBCHARGE = 1.602176634e-19;
const LIGHTSPEED = 299792458;

const formatFrequency = (freq) => {
    // let frequency = Math.round(Number.parseFloat(freq) / 1e1) * 1e1;
    let frequency = Number.parseFloat(freq);
    frequency = frequency.toExponential();
    let value = frequency.toString();
    value = Number.parseFloat(value.substr(value.length - 2, 2));
    frequency = Math.round(frequency / Math.pow(10, value - 1)) * Math.pow(10, value - 1);
    return frequency.toString().substr(0,1) + "." + frequency.toString().substr(1,1) + " 10^" + value + " Hz";
}

const formatWavelength = (wavelength) => {

}

const formatEnergy = (energy) => {

}

export default class HydrogenAtomSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            currentEnergyLevel: 1,
            timeUntilDeExcitation: 0,
            photon: {
                fired: false,
                frequency: 3.1E8,
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
                                value={this.state.photon.wavelength}
                            />
                        </div>

                        <div className={"PhotonSpectrum"}>
                            <Spectrum
                                energyValue={this.state.photon.energyValue}
                                value={this.state.photon.energyValue}
                            />
                        </div>

                        <div className={"PhotonSpectrum"}>
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

                        {/*<div className={"FirePhotonButton"}>*/}
                        {/*    <button type="box"*/}
                        {/*            className="btn btn-danger btn-sm"*/}
                        {/*            onClick={this.firePhoton.bind(this)}>*/}
                        {/*        {"Fire Photon"}*/}
                        {/*    </button>*/}
                        {/*</div>*/}

                    </div>

                    <div className={"EventLog"}>
                        <p className={"TitleText"}>Event Log</p>
                    </div>
                </div>

            </React.Fragment>
        );
    }

    // Updates the properties of the photon using the new energy value
    onPhotonValueChange(e) {
        // If the photon is currently being fired, then don't update anything
        if (this.state.photon.fired) return;

        let newEnergyValue = e.target.value;
        let photonFrequency = (newEnergyValue / PLANCKSCONSTANT) * COULUMBCHARGE;
        let photonWavelength = ((PLANCKSCONSTANT * LIGHTSPEED) / newEnergyValue) / COULUMBCHARGE;

        let newPhoton = {
            fired: false,
            energyValue: newEnergyValue,
            frequency: photonFrequency,
            wavelength: photonWavelength
        }

        this.setState({ photon: newPhoton });
        // console.log(`this is it: ${this.state.photon.energyValue} ${newPhoton.energyValue}`);
    }

    handleNewParameters(newParams) {
        this.setState({ parameters: newParams });
    }

    handleReset() {
        this.setState(this.initialState);
    }

}
