import React from 'react';
import { select, drag, event} from 'd3/dist/d3';
import PropTypes from 'prop-types';

const findClosestOrbital = (endX) => {
    let orbitalDistances = [40, 110, 250, 420, 620, 880];
    let distanceFromEndXToOrbital = orbitalDistances.map(element => Math.abs(element - endX));
    let indexOfClosestOrbital = distanceFromEndXToOrbital.indexOf(Math.min(...distanceFromEndXToOrbital));
    return orbitalDistances[indexOfClosestOrbital];
}

// const makeDraggable = (node, fn) => {
//     let translateX = 0;
//     const handleDrag = drag()
//         .subject(function() {
//             return { x: translateX, y: 0 }
//         })
//         .on('start', function() {
//             console.log(`starting dragging stuff`);
//         })
//         .on('end', function() {
//             const me = select(this);
//             let finalX = findClosestOrbital(event.x);
//             const transform = `translate(${finalX}, 0)`;
//             translateX = finalX;
//             me.attr('transform', transform);
//         })
//         .on('drag', function() {
//             const me = select(this);
//             fn(event.x,event.y);
//             console.log(`eventX ${event.x}`);
//             const transform = `translate(${event.x}, ${0})`;
//             translateX = event.x;
//             me.attr('transform', transform);
//         });
//
//     select(node).call(handleDrag);
// }

export default class Electron extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.translateX = 0;
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
        this.makeDraggable(this.ref.current, this.up);
    }

    makeDraggable(node, fn) {
        let translateX = this.translateX;
        const setTranslateX = (x) => this.translateX = x;

        const handleDrag = drag()
            // .subject(function() {
            //     return { x: translateX, y: 0 }
            // })
            .on('start', function() {
                console.log(`starting dragging stuff`);
            })
            .on('end', function() {
                const me = select(this);
                let finalX = findClosestOrbital(event.x);
                const transform = `translate(${finalX}, 0)`;
                translateX = finalX;
                me.attr('transform', transform);
            })
            .on('drag', function() {
                const me = select(this);
                fn(event.x,event.y);
                console.log(`eventX ${event.x}`);
                const transform = `translate(${event.x}, ${0})`;
                translateX = event.x;
                me.attr('transform', transform);
            });

        select(node).call(handleDrag);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        let node = this.ref.current;
        select(node).attr('transform', `translate(210, 0)`);

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
