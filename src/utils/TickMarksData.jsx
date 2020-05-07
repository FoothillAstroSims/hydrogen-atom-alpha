const tickMarkEnergyValues = [];
const tickMarkWavelengthValues = [
    {x: 54.1, text: `10 μm`, bottom: 25, top: 35},
    {x: 110.4, text: `1 μm`, bottom: 25, top: 35},
    {x: 173.3, text: `500 nm`, bottom: 25, top: 35},
    {x: 361, text: `200 nm`, bottom: 25, top: 35},
    {x: 676.1, text: `100 nm`, bottom: 25, top: 35}
];
const tickMarkFrequencyValues = [
    {x: 69.8, text: `1E14 Hz`, bottom: 25, top: 35},
    {x: 265.7, text: `1E15 Hz`, bottom: 25, top: 35},
    {x: 460, text: `2E15 Hz`, bottom: 25, top: 35},
    {x: 670.5, text: `3E15 Hz`, bottom: 25, top: 35},
    // {x: 676.1, text: `100 nm`, bottom: 25, top: 35}
];
const numEnergyTickMarks = 16;

// (48, 809)
for (let i = 0; i < numEnergyTickMarks; i++) {
    let text = "";
    let bottom = 25;
    let top = 35;

    if (i % 5 === 0) {
        console.log(`hello ${i}`);
        bottom = 20;
        top = 40;
        text = `${i} eV`;
    }

    let data = {
        x:  48 + (i * 50.7333),
        bottom: bottom,
        top: top,
        text: text
    }

    tickMarkEnergyValues.push(data);
}

export { tickMarkEnergyValues, tickMarkWavelengthValues, tickMarkFrequencyValues };
