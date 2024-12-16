import { readFile } from '../../common/readlines.js';
import run from './day13.js';

describe('day13', () => {

    it('run', () => {
        expect(run(readFile('2024/day13/testdata.txt'))).toEqual(0);
    });

});