import { readLines } from '../../common/readlines.js';
import run from './day10.js';

describe('day10', () => {

    it('part1', () => {
        expect(run(readLines('2022/day10/testdata.txt'), 2)).toEqual(13140);
    });

    it('part2', () => {
    });

});