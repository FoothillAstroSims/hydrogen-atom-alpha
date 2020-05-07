const tickMarkEnergyValues = [];
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

export { tickMarkEnergyValues };
