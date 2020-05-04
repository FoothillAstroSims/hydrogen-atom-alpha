import React from 'react';
import NavigationBar from './NavigationBar.jsx';
import MainView from './MainView.jsx';
import ClusterControls from './ClusterControls.jsx';

export default class HydrogenAtomSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {

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

    firePhoton() {
        console.log(`fireing`);
    }

    handleNewParameters(newParams) {
        this.setState({ parameters: newParams });
    }

    handleReset() {
        this.setState(this.initialState);
    }

}
