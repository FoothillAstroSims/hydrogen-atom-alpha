import React from 'react';
import ReactDOM from 'react-dom';
import { select, drag, raise, event } from 'd3/dist/d3';
import PropTypes from 'prop-types';

function makeDraggable(comp) {
    let translateX = 0;
    let translateY = 0;
    const handleDrag = drag()
        .subject(function() {
            const me = select(this);
            return { x: translateX, y: translateY }
        })
        .on('drag', function() {
            const me = select(this);
            const transform = `translate(${event.x}, ${event.y})`;
            translateX = event.x;
            translateY = event.y;
            me.attr('transform', transform);
        });
    const node = ReactDOM.findDOMNode(comp);
    // const node = comp;
    handleDrag(select(node));
}

class Circle extends React.Component {
    componentDidMount() {
        // this.ref = React.createRef();
        // makeDraggable(this.ref.current);
        makeDraggable(this);
    }
    render() {
        return <circle {...this.props} />
    }
}

export default class Electron extends React.Component {
    render() {
        return (
            <svg width={100} height={300}>
                <Circle cx={50} cy={50} r={30} fill={"magenta"}/>
            </svg>
        )
    }
}
//
// export default class Electron extends React.Component {
//     constructor(props) {
//         super(props);
//         this.ref = React.createRef();
//     }
//
//     componentDidMount() {
//         this.renderElectron();
//     }
//
//     componentDidUpdate(prevProps, prevState, snapShot) {
//         this.renderElectron();
//     }
//
//     renderElectron() { this.electronNode = select(this.ref.current);
//
//         this.dragFunc = () => {
//             function dragStarted(d) {
//                 console.log(`im here`)
//                 select(this).raise().attr("stroke", "red");
//             }
//
//             function dragging(d) {
//                 console.log(`im here`)
//                 select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
//             }
//
//             function dragended(d) {
//                 console.log(`im here`)
//                 select(this).attr("stroke", null);
//             }
//
//             return drag()
//                 .on("start", dragStarted)
//                 .on("drag", dragging)
//                 .on("end", dragended);
//         }
//
//         const circle = this.electronNode.append("circle")
//             .attr("cx", 50)
//             .attr("cy", 100)
//             .attr("r", 30)
//             .attr("fill", "red")
//             .enter()
//             .call(this.dragFunc);
//     }
//
//     render() {
//         return (
//             <svg width={100} height={300}>
//                 <g className={"Electron"} ref={this.ref}>
//
//                 </g>
//                 <circle cx={50} cy={50} r={50} fill={"green"} />
//             </svg>
//
//         );
//     }
// }