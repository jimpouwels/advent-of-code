import Command from './command.js';
import Dir from '../model/dir.js';

export default class DirCommand extends Command {
    
    constructor(param) {
        super(param);
    }

    execute(context) {
        context.currentDir.dirs.push(new Dir(this.param, context.currentDir));
    }
}