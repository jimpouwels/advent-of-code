export default class Cpu {
    instructions;
    currentInstruction;

    constructor(instructions) {
        this.instructions = instructions;
        this.currentInstruction = instructions.shift();
    }

    tick() {
        this.currentInstruction.tick();
        if (this.currentInstruction.isFinished) {
            this.currentInstruction = this.instructions.shift();
        }
    }

    hasMoreInstructions() {
        return this.currentInstruction;
    }
}