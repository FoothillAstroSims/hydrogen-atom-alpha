import React from 'react';

const WIDTH = 950;
const HEIGHT = 300;

export default class PhotonBeams extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.initX = WIDTH;
        this.speed = 10;
        this.fadeIndex = 1;

        this.isPlaying = false;
        this.orbitalDistances = [40, 110, 250, 420, 620, 880, 880];
        this.energyLevel = 1;

        this.draw = this.draw.bind(this);
        this.startAnimation = this.startAnimation.bind(this);
        this.stopAnimation = this.stopAnimation.bind(this);
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.save();
        // this.ctx.rotate(3 * Math.PI / 4);
        // this.ctx.translate(0, -300);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.energyLevel = prevProps.currentEnergyLevel;

        if (this.props.photon.fired && !this.isPlaying) {
            this.startAnimation();
            this.isPlaying = true;
        } else {
            // this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
            this.isPlaying = false;
            this.stopAnimation();
        }

    }

    startAnimation() {
        this.raf = requestAnimationFrame(this.draw.bind(this));
    }

    stopAnimation() {
        cancelAnimationFrame(this.raf);
    }

    plotSine(amplitude, frequency, wavelength, rgb) {
        let x = this.initX;
        let x2 = this.initX + wavelength;
        let y = 0;

        let transparency = 1;
        let incrementValue = 1;

        while (x < x2) {
            let prevX = x - incrementValue;
            let prevY = HEIGHT / 2 + amplitude * Math.sin((x - incrementValue) / frequency);

            y = HEIGHT/2 + amplitude * Math.sin((x)/frequency);
            this.ctx.beginPath();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = rgb.substring(0, rgb.length - 1) + `,${transparency})`;
            this.ctx.moveTo(prevX, prevY);
            this.ctx.lineTo(x, y);

            this.ctx.stroke();
            x += incrementValue;

            transparency = 1 - ((x - this.initX) / (wavelength));
            transparency *= this.fadeIndex;
        }

        this.ctx.stroke();
    }

    draw() {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);

        let amplitude = 10;
        let frequency = 10;
        let wavelength = 200;
        this.plotSine(amplitude, frequency, wavelength, this.props.photon.color);

        let end = -wavelength;
        this.initX -= this.speed;

        this.raf = requestAnimationFrame(this.draw);
        if (!this.props.photon.passThrough) {
            end = this.orbitalDistances[this.energyLevel - 1] - 20;
        }

        if (this.initX <= end) {
            this.initX = WIDTH;
            this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
            this.stopAnimation();
            this.props.stopPhotonAnimation();
            this.props.changeElectronState(true);
            this.props.startDeExcitation();
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
