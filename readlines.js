import * as fs from 'fs';
import * as path from 'path';

export function readLines(filePath) {
    const inputText = readFile(filePath);
    return inputText.split('\n');
}

export function readFile(filePath) {
    return fs.readFileSync(path.join(process.cwd(), filePath)).toString();
}