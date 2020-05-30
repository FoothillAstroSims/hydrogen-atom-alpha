import React from 'react';

export default class ManualDeexcitation extends React.Component {
    constructor(props) {
        super(props);
        this.currentSelection = 0;
    }

    componentDidMount() {
        this.updateOptions();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateOptions();
    }

    updateOptions() {
        const select = document.getElementById("level-select");
        select.options.length = 0;
        if (this.props.currentEnergyLevel === 1) return;

        let possibleEnergyDrops = this.props.currentEnergyLevel - 1;
        select.options[select.options.length] = new Option(`Random Level`, `${0}`);

        for (let i = 1; i <= possibleEnergyDrops; i++) {
            select.options[select.options.length] = new Option(`Level ${i}`, `${i}`);
        }
    }

    changeCurrentSelection(e) {
        this.currentSelection = e.target.value;
        console.log(`current seletion: ${this.currentSelection}`);
    }

    render() {
        return (
            <div style={{marginTop: "30px"}}>
                <button type="box"
                        className="fireButton"
                    onClick={this.props.manuallyEmit}
                >
                    {"Drop to: "}
                </button>

                <select
                    id="level-select"
                    onChange={this.changeCurrentSelection.bind(this)}
                >

                </select>
            </div>
        );
    }
}

// https://electrictoolbox.com/javascript-add-options-html-select/