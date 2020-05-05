import React from 'react';
import { select, drag, event} from 'd3/dist/d3';
import PropTypes from 'prop-types';

const makeDraggable = (node, fn) => {
    let translateX = 0;
    let translateY = 0;
    const handleDrag = drag()
        .subject(function() {
            return { x: translateX, y: translateY }
        })
        .on('start', function() {
            console.log(`starting dragging stuff`);
        })
        .on('end', function() {
            console.log(`starting edning stuff`);
        })
        .on('drag', function() {
            const me = select(this);
            fn(event.x,event.y);
            const transform = `translate(${event.x}, ${0})`;
            translateX = event.x;
            translateY = 0;
            me.attr('transform', transform);
        });

    select(node).call(handleDrag);
}

export default class Electron extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        this.circle = select(this.ref.current).append("circle")
            .attr("cx", 110)
            .attr("cy", 150)
            .attr("r", 10)
            .attr("fill", "green");
        makeDraggable(this.ref.current, this.up);
        console.log(`circe; ${this.circle}`);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        let node = this.ref.current;
        // select(node).attr('transform', `translate(50, 50)`);
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
