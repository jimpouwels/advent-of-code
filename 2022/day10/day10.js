import AddXInstruction from "./addx-instruction.js";
import Cpu from "./cpu.js";
import Crt from "./crt.js";
import NoopInstruction from "./noop-instruction.js";
import XRegister from "./x-register.js";

export default function run(lines) {
    let signalStrengthsTotal = 0;
    const xRegister = new XRegister();
    const crt = new Crt(xRegister);
    let instructions = parseInstructions(lines, xRegister);
    const cpu = new Cpu(instructions);

    let cycle = 1;
    while (cpu.hasMoreInstructions()) {
        if (cycle % 40 == 20) {
            signalStrengthsTotal += (xRegister.value * cycle);
        }
        
        crt.tick(xRegister);
        cpu.tick();
        cycle++;
    };

    return {
        part1: signalStrengthsTotal,
        part2: crt.output
    }
}

function parseInstructions(lines, xRegister) {
    return lines.map(line => {
        const split = line.split(' ');
        switch (split[0]) {
            case 'noop':
                return new NoopInstruction();
            case 'addx':
                return new AddXInstruction(parseInt(split[1]), xRegister);
        }
    });
}