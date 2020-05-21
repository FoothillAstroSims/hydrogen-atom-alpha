import React from 'react';

const WIDTH = 950;
const HEIGHT = 300;

const MIN_X_TRANSLATION = -200;
const MIN_Y_TRANSLATION = -310;

const getTranslationMatrix = (prev, curr) => {
    const energyToPixelMappings = [40, -10, -100, -220, -360, -550];
    let prevEnergyPixel = energyToPixelMappings[prev - 1];
    let currEnergyPixel = energyToPixelMappings[curr - 1];
    return (prevEnergyPixel + currEnergyPixel) / 2;
};

export default class PhotonBeams extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.initX = WIDTH;
        this.speed = 5;
        this.fadeIndex = 1;

        // let prev = 5;
        // let curr = 4;
        // let avg = (prev + curr) / 2;
        // let translate = getTranslationMatrix(avg);
        //
        // this.translateX = MIN_X_TRANSLATION - translate;
        // this.translateY = MIN_Y_TRANSLATION - translate;
        // console.log(`trans x ${this.translateX} and trans y ${this.translateY}`);

        // this.translateX = -200;
        // this.translateY = -310;

        // 200, 310
        // Minimum (-130, -310)
        // Maximum (-630, -810)

        // this.orbitalRadii = [{r: 20}, {r: 40}, {r: 110}, {r: 250}, {r: 420}, {r: 620}, {r: 880}];

        // 6 -> -550
        // 5 -> -360
        // 4 -> -220
        // 3 -> -100
        // 2 -> -10
        // 1 -> 40

        this.translateX = -200;
        this.translateY = -310;

        this.isPlaying = false;
        this.orbitalDistances = [40, 110, 250, 420, 620, 880, 880];
        this.energyLevel = 1;

        this.animatePhotonFire = this.animatePhotonFire.bind(this);
        this.animatePhotonEmission = this.animatePhotonEmission.bind(this);
        this.startAnimation = this.startAnimation.bind(this);
        this.stopAnimation = this.stopAnimation.bind(this);
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext("2d");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.energyLevel = prevProps.currentEnergyLevel;

        if (this.props.photon.fired && !this.isPlaying) {
            this.startAnimation();
            this.isPlaying = true;
        } else if (prevProps.deExcitation !== this.props.deexcitation && this.props.deexcitation) {
            // console.log(`i should only be running ONCE`);
            this.startAnimation(prevProps);
        } else {
            // this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
            this.isPlaying = false;
            this.stopAnimation();
        }
    }

    startAnimation(prevProps) {
        // this.makeCircle();

        if (this.props.photon.fired) {
            this.initX = WIDTH;
            this.raf = requestAnimationFrame(this.animatePhotonFire.bind(this));
        } else if (this.props.deexcitation) {
            if (prevProps.currentEnergyLevel !== this.props.currentEnergyLevel && prevProps.currentEnergyLevel !== 7) {
                this.initX = 150;
                let translation = getTranslationMatrix(prevProps.currentEnergyLevel, this.props.currentEnergyLevel);

                this.translateX = MIN_X_TRANSLATION + translation;
                this.translateY = MIN_Y_TRANSLATION + translation;

                this.ctx.rotate(3 * Math.PI / 4);
                this.ctx.translate(this.translateX, this.translateY);
                this.raf = requestAnimationFrame(this.animatePhotonEmission.bind(this));
            }
        }
    }

    makeCircle() {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 30, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'green';
        this.ctx.fill();
        this.ctx.stroke();
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

    animatePhotonEmission() {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);

        let amplitude = 10;
        let frequency = 10;
        let wavelength = 100;

        this.plotSine(amplitude, frequency, wavelength, this.props.photon.color);

        let end = -wavelength;
        this.initX -= this.speed;

        this.raf = requestAnimationFrame(this.animatePhotonEmission);

        if (this.initX <= -100) {
            this.ctx.translate(-this.translateX, -this.translateY);
            this.ctx.rotate(-3 * Math.PI / 4);

            this.initX = WIDTH;
            this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
            this.stopAnimation();
            this.props.changeDeExcitationState();
        }
    }

    animatePhotonFire() {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);

        let amplitude = 10;
        let frequency = 10;
        let wavelength = 200;
        this.plotSine(amplitude, frequency, wavelength, this.props.photon.color);

        let end = -wavelength;
        this.initX -= this.speed;

        this.raf = requestAnimationFrame(this.animatePhotonFire);
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
