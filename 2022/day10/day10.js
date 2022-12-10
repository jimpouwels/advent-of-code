export default function run(lines) {
    let signalStrengthsTotal = 0;
    const xRegister = new XRegister();
    let operationBacklog = parseCycles(lines, xRegister);
    let currentOperation = operationBacklog.shift();

    for (let cycle = 1; currentOperation; cycle++) {
        if (cycle % 40 == 20) {
            signalStrengthsTotal += (xRegister.value * cycle);
        }
        currentOperation.tick();
        if (currentOperation.isFinished) {
            currentOperation = operationBacklog.shift();
        }
    };

    return signalStrengthsTotal;
}

function parseCycles(lines, xRegister) {
    return lines.map(line => {
        const split = line.split(' ');
        if (split[0] === 'noop') {
            return new Noop();
        } else {
            return new Add(parseInt(split[1]), xRegister);
        }
    });
}

class Operation {
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

class Noop extends Operation {
    constructor() {
        super(1);
    }

    onFinished() {
    }

}

class Add extends Operation {
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