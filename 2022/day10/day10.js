
export default function run(lines) {
    let signalStrengthsTotal = 0;
    let crtOutput = '';
    const xRegister = new XRegister();
    let instructions = parseCycles(lines, xRegister);
    let currentInstruction = instructions.shift();

    let crtX = 1;
    for (let cycle = 1; currentInstruction; cycle++) {
        if (cycle % 40 == 20) {
            signalStrengthsTotal += (xRegister.value * cycle);
        }
        crtX = (cycle % 40);
        if (xRegister.value === crtX || xRegister.value +1 === crtX || xRegister.value + 2 === crtX) {
            crtOutput += "#";
        } else {
            crtOutput += '.';
        }
        
        if (cycle % 40 == 0) {
            crtOutput += "\n";
        }
        currentInstruction.tick();
        if (currentInstruction.isFinished) {
            currentInstruction = instructions.shift();
        }
    };
    console.log(crtOutput);
    return {
        part1: signalStrengthsTotal,
        part2: crtOutput
    }
}

function parseCycles(lines, xRegister) {
    return lines.map(line => {
        const split = line.split(' ');
        switch (split[0]) {
            case 'noop':
                return new Noop();
            case 'addx':
                return new Add(parseInt(split[1]), xRegister);
        }
    });
}

class Instruction {
    remainingCycles = 0;
    isFinished = false;

    constructor(remainingCycles) {
        this.remainingCycles = remainingCycles;
    }

    tick() {
        this.remainingCycles--;
        if (this.remainingCycles == 0) {
            this.isFinished = true;
            this.onFinished();
        }
    }

    onFinished() {
        throw new Error('Not implemented');
    }
}

class Noop extends Instruction {
    constructor() {
        super(1);
    }

    onFinished() {
    }
}

class Add extends Instruction {
    value;
    xRegister;

    constructor(value, xRegister) {
        super(2);
        this.value = value;
        this.xRegister = xRegister;
    }

    onFinished() {
        this.xRegister.value += this.value;
    }
}

class XRegister {
    value = 1;
}