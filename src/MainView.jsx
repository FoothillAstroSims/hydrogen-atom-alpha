import React from 'react';
import PropTypes from 'prop-types';

const WIDTH = 950;
const HEIGHT = 300;

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentDidUpdate() {

    }

    render() {
        return (
                <svg width={WIDTH} height={HEIGHT}>
                    <circle cx={0} cy={150} r={40} stroke={"red"} fill={"none"}/>
                    <circle cx={0} cy={150} r={110} stroke={"red"} fill={"none"}/>
                    <circle cx={0} cy={150} r={250} stroke={"red"} fill={"none"}/>
                    <circle cx={0} cy={150} r={420} stroke={"red"} fill={"none"}/>
                    <circle cx={0} cy={150} r={650} stroke={"red"} fill={"none"}/>
                    <circle cx={0} cy={150} r={850} stroke={"red"} fill={"none"}/>
                </svg>
        );
    }
}

