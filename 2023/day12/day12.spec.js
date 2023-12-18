import { readLines } from '../../common/readlines.js';
import run from './day12.js';

describe('day11', () => {

    it('runs', () => {
        expect(run(readLines('2023/day12/testdata.txt'))).toEqual(21);
    });

});