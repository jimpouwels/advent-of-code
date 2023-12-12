const fs = require('fs');

export default class Logger {
    identifier;
    index;

    constructor(identifier) {
        this.identifier = identifier;
        let i = 0;
        while (true) {
            let indexedIdentifier = this.identifier.replace(identifier, identifier + '-' + i);
            if (!fs.existsSync(this.filePathFrom(indexedIdentifier))) {
                this.identifier = indexedIdentifier;
                this.log("");
                break;
            }
            i++;
        }
        this.logMaster("\n==================================================");
    }

    static getLogger(identifier) {
        return new Logger(identifier);
    }

    log(message) {
        this.appendFile(this.getFilePath(), message);
        this.logMaster(message);
    }

    logMaster(message) {
        this.appendFile(this.getMasterLogPath(), message);
    }

    appendFile(filepath, message) {
        fs.appendFile(filepath, message + (message ? '\n' : ''), () => {});
    }

    getFilePath() {
        return this.filePathFrom(this.identifier);
    }

    getMasterLogPath() {
        return this.filePathFrom('log');
    }

    filePathFrom(filename) {
        return __dirname + '/../log/' + filename + '.txt';
    }

}