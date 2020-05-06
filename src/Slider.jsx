import React from 'react';
import { select, scaleLinear, drag, event} from 'd3/dist/d3';

const WIDTH = 800;
const HEIGHT = 150;

export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        let x = scaleLinear()
            .domain([0, WIDTH])
            .range([0, WIDTH])
            .clamp(true);

        let slider = select(this.ref.current)
            .append("g")
            .attr("class", "slider")
            .attr("transform", "translate(50, 25)");

        let firstSlider = slider.append("line")
            .attr("class", "track")
            .attr("x1", x.range()[0])
            .attr("x2", x.range()[1]);

        let secondSlider = firstSlider.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
            .attr("class", "track-inset");

        let sliderFill = slider.append("line")
            .attr("class", "filler")
            .attr("x1", 0)
            .attr("x2", 0)
            // .attr("fill", "rgba(0,255,0,1)");
            .attr("stroke", "rgba(0,255,0,0.5)");

        secondSlider
            .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
            .attr("class", "track-overlay")
            .call(drag()
                .on("start.interrupt", function() { slider.interrupt(); })
                .on("start drag", function() { hue(event.x); }));

        let handle = slider.insert("g", ".track-overlay")
            .attr("class", "handle")
            .attr("transform", "translate(-5,-10)")
            .append("path")
            .attr("d", "M 0 0 L 15 0 L 15 12 L 7.5 18.5 L 0 12 L 0 0 Z")
            .attr("fill", "white")

        function hue(h) {
            handle.attr("transform", `translate(${x(h) - 5}, 0)`);
            sliderFill.attr("x2", x(h));
        }
    }

    componentWillUnmount() {

    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    render() {
        return (
            <svg width={WIDTH} height={HEIGHT}>
                <g ref={this.ref} />
            </svg>
        )
    }
}

