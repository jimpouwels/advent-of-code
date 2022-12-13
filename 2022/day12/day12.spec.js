import { readLines } from '../../common/readlines.js';
import run from './day12.js';

describe('day12', () => {

    it('part1', () => {
        expect(run(readLines('2022/day12/testdata.txt')).part1).toEqual(481);
    });

    it('part2', () => {
        expect(run(readLines('2022/day12/testdata.txt')).part2).toEqual(0);
    });

});