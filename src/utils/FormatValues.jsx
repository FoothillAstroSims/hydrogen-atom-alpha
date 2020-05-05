const formatFrequency = (freq) => {
    let frequency = Number.parseFloat(freq).toExponential();
    let value = frequency.toString();
    value = Number.parseFloat(value.substr(value.length - 2, 2));
    frequency = Math.round(frequency / Math.pow(10, value - 1)) * Math.pow(10, value - 1);
    return frequency.toString().substr(0,1) + "." + frequency.toString().substr(1,1) + " x 10^" + value + " Hz";
}

const formatWavelength = (wavelength) => {
    let lambda = wavelength.toString();
    let units = " nm";
    if (Number.parseFloat(wavelength) > 1e-6) {
        units = " μm";
        lambda = Number.parseFloat(wavelength).toExponential();
    }

    lambda = lambda.substr(0, 4) + units;
    return lambda;
}

const formatEnergy = (energy) => {
    let eV = Number.parseFloat(energy).toFixed(1);
    if (energy < 1) {
        eV = Number.parseFloat(energy).toFixed(2);
    }

    return eV.toString() + " eV";
}

export { formatWavelength, formatEnergy, formatFrequency };