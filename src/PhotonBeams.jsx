import React from 'react';

const WIDTH = 950;
const HEIGHT = 300;

export default class PhotonBeams extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.initX = WIDTH;

        this.isPlaying = false;
        this.draw = this.draw.bind(this);
        this.startAnimation = this.startAnimation.bind(this);
        this.stopAnimation = this.stopAnimation.bind(this);
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext("2d");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.animatePhoton) { this.startAnimation(); }
        else {this.stopAnimation(); }
    }

    startAnimation() {
        this.raf = requestAnimationFrame(this.draw.bind(this));
    }

    stopAnimation() {
        cancelAnimationFrame(this.raf);
    }

    plotSine(amplitude, frequency, wavelength) {
       let x = this.initX;
        let x2 = this.initX + wavelength;
        let y = 0;

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

        let amplitude = 20;
        let frequency = 1;
        let wavelength = 200;
        this.plotSine(amplitude, frequency, wavelength);


        let speed = 10;
        this.initX -= speed;
        this.raf = requestAnimationFrame(this.draw);
        // TODO Wavelength should change to something provided by props that tells us how far the photon should travel
        if (this.initX <= -wavelength) {
            this.initX = WIDTH;
            this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
            this.isPlaying = false;
            this.stopAnimation();
            this.props.stopPhotonAnimation();
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
