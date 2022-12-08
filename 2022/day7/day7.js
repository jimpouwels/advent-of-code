import Dir from "./model/dir.js";
import File from "./model/file.js";

export default function run(input, spaceToBeFreed = 0) {
    const root = new Dir(null);
    let context = { currentDir: root };    

    parseCommands(input).forEach(command => command.execute(context));
    const sizePart1 = root.getDirsRecursive().filter(dir => dir.getTotalSize() <= 100000)
                                             .reduce((sum, val) => sum + val.getTotalSize(), 0);
    const sizePart2 = root.getDirsRecursive().filter(dir => dir.getTotalSize() >= spaceToBeFreed)
                                             .sort((dirA, dirB) => dirA.getTotalSize() - dirB.getTotalSize())[0]
                                             .getTotalSize();
    return { 
        part1: sizePart1,
        part2: sizePart2
    };
}

function parseCommands(commandsArray) {
    return commandsArray.map(command => { 
        return createCommand(command.split(' '));
    });
}

function createCommand(commandComponents) {
    if (commandComponents[0] === '$') {
        return commandComponents[1] === 'cd' ? 
            createCdCommand(commandComponents) : 
            createDummyCommand();
    } else {
        return commandComponents[0] === 'dir' ? 
            createDirCommand(commandComponents) : 
            createFileCommand(commandComponents);
    }
}

function changeDirectory(context, dirName) {
    if (dirName === '/') {
        context.currentDir = context.currentDir.getRoot();
    } else if (dirName === '..') {
        context.currentDir = context.currentDir.parentDir;
    } else {
        context.currentDir = context.currentDir.dirs.find(d => d.name === dirName);
    }
}

function createDirectory(context, dirName) {
    context.currentDir.dirs.push(new Dir(dirName, context.currentDir));
}

function createFile(context, name, size) {
    context.currentDir.files.push(new File(name, size));
}

function createFileCommand(commandComponents) {
    return {
        name: commandComponents[1],
        size: parseInt(commandComponents[0]),
        execute: function (context) { createFile(context, this.name, this.size); }
    };
}

function createDirCommand(commandComponents) {
    return {
        dirName: commandComponents[1],
        execute: function (context) { createDirectory(context, this.dirName); }
    };
}

function createDummyCommand() {
    return {
        execute: function (_context) { }
    };
}

function createCdCommand(commandComponents) {
    return {
        dirName: commandComponents[2],
        execute: function (context) { changeDirectory(context, this.dirName); }
    };
}