import React from 'react';
import { select, drag, event} from 'd3/dist/d3';
import PropTypes from 'prop-types';

export default class Electron extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.orbitalDistances = [40, 110, 250, 420, 620, 880, 880];

        this.timer = {
            id: null,
            started: false,
        };
    }

    componentDidMount() {
        this.circle = select(this.ref.current)
            .attr("transform", `translate(40, 0)`)
            .append("circle")
            .attr("cx", 0)
            .attr("cy", 150)
            .attr("r", 7)
            .attr("fill", "green");

        // makeDraggable(this.ref.current, this.up);
        this.makeDraggable(this.ref.current);
    }

    makeDraggable(node) {
        const findClosestOrbital = this.findClosestOrbital.bind(this);
        const startDeExcitation = this.props.startDeExcitation.bind(this);
        const handleDrag = drag()
            .on('end', function() {
                const me = select(this);
                let finalX = findClosestOrbital(event.x, false);
                const transform = `translate(${finalX}, 0)`;
                me.transition().attr('transform', transform);
                startDeExcitation();
            })
            .on('drag', function() {
                const me = select(this);
                const transform = `translate(${event.x}, ${0})`;
                findClosestOrbital(event.x, true);
                me.attr('transform', transform);
                startDeExcitation();
            });

        select(node).call(handleDrag);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // If the photon wasn't fired, simply return
        if (!(this.props.moveElectron || this.props.emitted) || this.props.electronIsBeingDragged) return;

        if (this.props.moveElectron) this.moveElectron();
        if (this.props.emitted) this.photonEmission();
    }

    photonEmission() {
        let node = this.ref.current;
        let newEnergyLevel = this.orbitalDistances[this.props.currentEnergyLevel - 1];
        select(node).transition().attr('transform', `translate(${newEnergyLevel}, 0)`).duration(500);
    }

    moveElectron() {
        let node = this.ref.current;
        let x;
        let y;

        // If the energy level is 7, that means that the electron is ionized and needs to
        // be moved to a random location off screen. Or else, simply move it to its correct energy level
        if (this.props.currentEnergyLevel === 7) {
            let randomPosition = this.ionizeElectron();
            x = randomPosition.xPos;
            y = randomPosition.yPos;
        } else {
            x = this.orbitalDistances[this.props.currentEnergyLevel - 1];
            y = 0;
        }

        select(node).transition().attr('transform', `translate(${x}, ${y})`).duration(500);
        this.props.changeElectronState(false);
    }

    ionizeElectron() {
        const width = 950;
        const height = 300;

        let xOffset = 500;
        let yOffset = 500;

        let x = Math.random() * width;
        let y = Math.random() * height;

        if (Math.random() > 0.5) {
            x = Math.random() * xOffset + width + 100;
            if (Math.random() > 0.5) x = -1 * Math.random() * xOffset - 100;
        } else {
            y = Math.random() * yOffset + height + 100;
            if (Math.random() > 0.5) y = -1 * Math.random() * yOffset - 100;
        }

        return {
            xPos: x,
            yPos: y
        };
    }

    findClosestOrbital(endX, beingDragged) {
        let distanceFromEndXToOrbital = this.orbitalDistances.map(element => Math.abs(element - endX));
        let indexOfClosestOrbital = distanceFromEndXToOrbital.indexOf(Math.min(...distanceFromEndXToOrbital));
        this.props.updateEnergyLevel(indexOfClosestOrbital + 1, beingDragged);
        return this.orbitalDistances[indexOfClosestOrbital];
    }

    render() {
        return (
            <g ref={this.ref} />
        )
    }
}
