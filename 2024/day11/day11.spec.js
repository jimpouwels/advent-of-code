import { readFile } from '../../common/readlines.js';
import run from './day11.js';

describe('day11', () => {

    it('run', () => {
        expect(run(readFile('2024/day11/testdata.txt'), 25)).toEqual(194782);
        expect(run(readFile('2024/day11/testdata.txt'), 75)).toEqual(233007586663131);
    });

});