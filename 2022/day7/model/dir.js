export default class Dir {
    
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

    getRoot() {
        return this.parentDir || this;
    }
}