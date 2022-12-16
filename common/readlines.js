import * as fs from 'fs';
import * as path from 'path';

export function readLines(filePath) {
    return readFile(filePath).split('\n');
}

export function readLinesAsInts(filePath) {
    return readLines(filePath).map(l => +l);
}

export function readFile(filePath) {
    return fs.readFileSync(path.join(process.cwd(), filePath)).toString();
}