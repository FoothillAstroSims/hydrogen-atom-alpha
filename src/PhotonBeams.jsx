import React from 'react';

const WIDTH = 950;
const HEIGHT = 300;

export default class PhotonBeams extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();

    }

    componentDidMount() {
        // const canvas = this.canvasRef.current;
        // const ctx = canvas.getContext("2d");
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext("2d");

        // this.ctx.fillRect(0, 0, 50, 350);

        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = `rgb(128,0,128, ${1})`;
        this.ctx.moveTo(50, 50);
        this.ctx.lineTo(150, 150);
        this.ctx.stroke();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        return(
            <div>
                <canvas ref={this.canvasRef} width={WIDTH} height={HEIGHT} />
            </div>
        )
    }
}
//
// const plotSine = (ctx, initX) => {
//     let width = 150;
//     let height = ctx.canvas.height;
//
//     let x = initX;
//     let x2 = initX + width;
//     let y = 0;
//     let amplitude = 20;
//     let frequency = 5;
//     let transparency = 1;
//     let incrementValue = 1;
//
//     while (x < x2) {
//         y = height/2 + amplitude * Math.sin((x)/frequency);
//         ctx.beginPath();
//         ctx.lineWidth = 2;
//         ctx.strokeStyle = `rgb(128,0,128, ${transparency})`;
//         ctx.moveTo(x-1, height / 2 + amplitude * Math.sin((x-incrementValue) / frequency));
//         ctx.lineTo(x, y);
//
//         ctx.stroke();
//         x += incrementValue;
//
//         transparency = 1 - ((x - initX) / (width));
//     }
//
//     ctx.stroke();
// }
//
// const draw = () => {
//     context.clearRect(0, 0, 500, 500);
//     plotSine(context, initialX);
//
//     let speed = 3;
//     initialX -= speed;
//     if (initialX <= 0) {
//         initialX = 400;
//         step = 0;
//     }
//     window.requestAnimationFrame(draw);
// }
//
// const canvas = document.getElementById("canvas");
// const context = canvas.getContext("2d");
//
// let initialX = 350;
//
// draw();
