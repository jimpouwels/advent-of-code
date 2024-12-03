import { readFile } from '../../common/readlines.js';
import run from './day3.js';

describe('day3', () => {

    it('part1', () => {
        expect(run(readFile('2024/day03/testdata.txt'), false)).toEqual(185797128);
    });

});