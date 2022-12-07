import Command from "./command.js";

export default class CdCommand extends Command {

    constructor(param) {
        super(param);
    }

    execute(context) {
        if (this.param === '/') {
            context.currentDir = context.currentDir.getRoot();
        } else if (this.param === '..') {
            context.currentDir = context.currentDir.parentDir;
        } else {
            context.currentDir = context.currentDir.dirs.find(d => d.name === this.param);
        }
    }
}