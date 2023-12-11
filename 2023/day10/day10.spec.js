import { readLines } from '../../common/readlines.js';
import run from './day10.js';

describe('day10', () => {

    it('runs', () => {
        expect(run(readLines('2023/day10/testdata.txt'))).toEqual(6649);
    });

});