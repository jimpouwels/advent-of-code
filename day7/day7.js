export default function day7(input, spaceToBeFreed = 0) {
    const root = new Dir(null);
    let context = { currentDir: root };    

    parseCommands(input, root).forEach(c => c.execute(context));
    const sizePart1 = root.getDirsRecursive().filter(d => d.getTotalSize() <= 100000)
                                             .reduce((sum, val) => sum + val.getTotalSize(), 0);
    const sizePart2 = root.getDirsRecursive().filter(d => d.getTotalSize() >= spaceToBeFreed)
                                             .sort((a, b) => a.getTotalSize() - b.getTotalSize())[0].getTotalSize();
    return { 
        part1: sizePart1,
        part2: sizePart2
    };
}

function parseCommands(commandsArray, root) {
    return commandsArray.map(c => {
        let splitted = c.split(' ');  
        if (c.startsWith('$')) {      
            if (splitted[1] === 'cd') {
                return new CdCommand(splitted[2], root);
            } else {
                return new Command();
            }
        } else {
            if (splitted[0] === 'dir') {
                return new DirCommand(splitted[1]);
            } else {
                return new FileCommand(splitted[1], parseInt(splitted[0]));
            }
        }
    });
}

class Dir {
    name;
    parentDir;
    dirs = [];
    files = [];

    constructor(name, parentDir) {
        this.name = name;
        this.parentDir = parentDir;
    }

    getTotalSize() {
        let totalSize = this.files.reduce((sum, file) => sum + file.size, 0);
        if (this.dirs.length > 0) {
            totalSize += this.dirs.reduce((sum, dir) => sum + dir.getTotalSize(), 0);
        }
        return totalSize;
    }

    getDirsRecursive() {
        return [ ...this.dirs, ...this.dirs.flatMap(subDir => subDir.getDirsRecursive()) ];
    }

    print(depth = '  ') {
        let fullString = `- ${this.name || '/'} (dir)\n`;
        this.files.forEach(f => fullString += `${depth}${f.print(depth + '  ')}`);
        this.dirs.forEach(d => fullString += `${depth}${d.print(depth +  '  ')}`);
        return fullString;
    }
}

class File {
    name;
    size = 0;

    constructor(name, size) {
        this.name = name;
        this.size = size;
    }

    print() {
        return `- ${this.name} ${this.size}\n`;
    }
}

class Command {
    param;

    constructor(param) {
        this.param = param;
    }

    execute() {}
}

class DirCommand extends Command {
    constructor(param) {
        super(param);
    }

    execute(context) {
        context.currentDir.dirs.push(new Dir(this.param, context.currentDir));
    }
}

class CdCommand extends Command {

    root;

    constructor(param, root) {
        super(param);
        this.root = root;
    }

    execute(context) {
        if (this.param === '/') {
            context.currentDir = this.root;
        } else if (this.param === '..') {
            context.currentDir = context.currentDir.parentDir;
        } else {
            context.currentDir = context.currentDir.dirs.find(d => d.name === this.param);
        }
    }
}

class FileCommand extends Command {

    name;

    constructor(name, param) {
        super(param);
        this.name = name;
    }

    execute(context) {
        context.currentDir.files.push(new File(this.name, this.param));
    }
}