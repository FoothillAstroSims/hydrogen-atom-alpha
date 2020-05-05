import React from 'react';

const WIDTH = 950;
const HEIGHT = 300;

export default class PhotonBeams extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.initX = 350;

        this.draw = this.draw.bind(this);
        this.startAnimation = this.startAnimation.bind(this);
        this.stopAnimation = this.stopAnimation.bind(this);
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
        if (this.props.animatePhoton) this.startAnimation();
        else this.stopAnimation();
    }

    startAnimation() {
        this.raf = requestAnimationFrame(this.draw.bind(this));
    }

    stopAnimation() {
        cancelAnimationFrame(this.raf);
    }

    plotSine() {
        let wavelength = 200;
        let x = this.initX;
        let x2 = this.initX + wavelength;
        let y = 0;
        let amplitude = 20;
        let frequency = 5;
        let transparency = 1;
        let incrementValue = 1;

        while (x < x2) {
            y = HEIGHT/2 + amplitude * Math.sin((x)/frequency);
            this.ctx.beginPath();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = `rgb(128,0,128, ${transparency})`;
            this.ctx.moveTo(x-1, HEIGHT / 2 + amplitude * Math.sin((x-incrementValue) / frequency));
            this.ctx.lineTo(x, y);

            this.ctx.stroke();
            x += incrementValue;

            transparency = 1 - ((x - this.initX) / (wavelength));
        }

        this.ctx.stroke();
    }

    draw() {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        this.plotSine();

        let speed = 3;
        this.initX -= speed;
        this.raf = requestAnimationFrame(this.draw);
        if (this.initX <= 0) {
            this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
            this.stopAnimation();
            // this.props.stopPhotonAnimation();
        }
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
