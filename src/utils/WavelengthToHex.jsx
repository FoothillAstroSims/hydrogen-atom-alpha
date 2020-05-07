const getHex = (wavelength) => {
    let w = parseFloat(wavelength);
    let red = 0;
    let green = 0;
    let blue = 0;

    if (w >= 380 && w < 440)
    {
        red   = -(w - 440) / (440 - 380);
        green = 0.0;
        blue  = 1.0;
    }
    else if (w >= 440 && w < 490)
    {
        red   = 0.0;
        green = (w - 440) / (490 - 440);
        blue  = 1.0;
    }
    else if (w >= 490 && w < 510)
    {
        red   = 0.0;
        green = 1.0;
        blue  = -(w - 510) / (510 - 490);
    }
    else if (w >= 510 && w < 580)
    {
        red   = (w - 510) / (580 - 510);
        green = 1.0;
        blue  = 0.0;
    }
    else if (w >= 580 && w < 645)
    {
        red   = 1.0;
        green = -(w - 645) / (645 - 580);
        blue  = 0.0;
    }
    else if (w >= 645 && w < 781)
    {
        red   = 1.0;
        green = 0.0;
        blue  = 0.0;
    }
    else if (w > 781) {
        red   = 1.0;
        green = 0.0;
        blue  = 0.0;
    }
    else
    {
        red   = 1.0;
        green = 0.0;
        blue  = 1.0;
    }

    // Let the intensity fall off near the vision limits

    let factor = 0;
    if (w >= 380 && w < 420)
        factor = 0.3 + 0.7*(w - 380) / (420 - 380);
    else if (w >= 420 && w < 701)
        factor = 1.0;
    else if (w >= 701 && w < 781)
        factor = 0.3 + 0.7*(780 - w) / (780 - 700);
    else
        factor = 0.3055933636847426;

    let gamma = 0.80;
    console.log(`red: ${red} gree: ${green} and blue ${blue} and factor ${factor}`);

    let R = (red   > 0 ? 255*Math.pow(red   * factor, gamma) : 0);
    let G = (green > 0 ? 255*Math.pow(green * factor, gamma) : 0);
    let B = (blue  > 0 ? 255*Math.pow(blue  * factor, gamma) : 0);

    return "#" + decimalToHex(R) + decimalToHex(G) + decimalToHex(B);
}

const decimalToHex = (dec) => {
    let d = Math.round(dec);
    let hex = d.toString(16);
    while (hex.length < 2) {
        hex = "0" + hex;
    }

    return hex;
}


export { getHex };
