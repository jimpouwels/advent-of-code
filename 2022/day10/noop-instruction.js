import Instruction from "./instruction.js";

export default class NoopInstruction extends Instruction {
    constructor() {
        super(1);
    }

    onFinished() {
    }
}