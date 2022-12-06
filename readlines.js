import * as fs from 'fs';
import * as path from 'path';

export default function readLines(filePath) {
    const inputText = fs.readFileSync(path.join(process.cwd(), filePath)).toString();
    return inputText.split('\n');
}