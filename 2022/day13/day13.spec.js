import { readFile } from '../../common/readlines.js';
import run from './day13.js';

describe('day13', () => {

    it('run', () => {
        const result = run(readFile('2022/day13/testdata.txt'));
        expect(result.part1).toEqual(0);
    });

});