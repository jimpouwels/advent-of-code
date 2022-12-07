import CdCommand from "./commands/cd-command.js";
import Command from "./commands/command.js";
import DirCommand from "./commands/dir-command.js";
import FileCommand from "./commands/file-command.js";
import Dir from "./model/dir.js";

export default function day7(input, spaceToBeFreed = 0) {
    const root = new Dir(null);
    let context = { currentDir: root };    

    parseCommands(input).forEach(c => c.execute(context));
    const sizePart1 = root.getDirsRecursive().filter(d => d.getTotalSize() <= 100000)
                                             .reduce((sum, val) => sum + val.getTotalSize(), 0);
    const sizePart2 = root.getDirsRecursive().filter(d => d.getTotalSize() >= spaceToBeFreed)
                                             .sort((a, b) => a.getTotalSize() - b.getTotalSize())[0].getTotalSize();
    return { 
        part1: sizePart1,
        part2: sizePart2
    };
}

function parseCommands(commandsArray) {
    return commandsArray.map(command => {
        let splitted = command.split(' ');  
        if (command.startsWith('$')) { 
            return splitted[1] === 'cd' ? new CdCommand(splitted[2]) : new Command();  
        } else {
            return splitted[0] === 'dir' ? new DirCommand(splitted[1]) : new FileCommand(splitted[1], parseInt(splitted[0]));;  
        }
    });
}