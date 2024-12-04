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

    logGrid(array, lambda) {
        let message = '';
        array.forEach(a => {
            a.forEach(i => message += lambda(i));
            message += '\n';
        });
        this.log(message);
    }

    logObject(object) {
        this.logMaster(JSON.stringify(object));
    }

    log(message) {
        this.logMaster(message);
    }

    logMaster(message) {
        this.appendFile(this.getMasterLogPath(), message);
    }

    appendFile(filepath, message) {
        fs.appendFileSync(filepath, message + '\n'), () => { };
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