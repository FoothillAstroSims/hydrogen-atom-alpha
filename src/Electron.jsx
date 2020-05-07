import React from 'react';
import { select, drag, event} from 'd3/dist/d3';
import PropTypes from 'prop-types';


export default class Electron extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.val = false;
        this.orbitalDistances = [40, 110, 250, 420, 620, 880];
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
        const handleDrag = drag()
            .on('end', function() {
                const me = select(this);
                let finalX = findClosestOrbital(event.x);
                const transform = `translate(${finalX}, 0)`;
                me.transition().attr('transform', transform);
            })
            .on('drag', function() {
                const me = select(this);
                const transform = `translate(${event.x}, ${0})`;
                findClosestOrbital(event.x);
                me.attr('transform', transform);
            });

        select(node).call(handleDrag);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // If the photon wasn't fired, simply return
        if (!this.props.fired) return;

        let node = this.ref.current;
        let newEnergyLevel = this.orbitalDistances[this.props.currentEnergyLevel - 1];
        select(node).transition().delay(1500).attr('transform', `translate(${newEnergyLevel}, 0)`).duration(500);
    }

    findClosestOrbital(endX) {
        let distanceFromEndXToOrbital = this.orbitalDistances.map(element => Math.abs(element - endX));
        let indexOfClosestOrbital = distanceFromEndXToOrbital.indexOf(Math.min(...distanceFromEndXToOrbital));
        this.props.updateEnergyLevel(indexOfClosestOrbital + 1);
        return this.orbitalDistances[indexOfClosestOrbital];
    }

    up(x,y) {
        // console.log(`hapenning ${x} ${y}`);
    }

    render() {
        return (
            <g ref={this.ref} />
        )
    }
}
