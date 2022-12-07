import File from "../model/file.js"
import Command from "./command.js";

export default class FileCommand extends Command {

    name;

    constructor(name, param) {
        super(param);
        this.name = name;
    }

    execute(context) {
        context.currentDir.files.push(new File(this.name, this.param));
    }
}