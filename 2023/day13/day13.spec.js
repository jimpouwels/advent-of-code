import { readFile } from '../../common/readlines.js';
import run from './day13.js';

describe('day13', () => {

    it('runs', () => {
        expect(run(readFile('2023/day13/testdata.txt'), false)).toEqual(27300);
        expect(run(readFile('2023/day13/testdata.txt'), true)).toEqual(29276);
    });

});