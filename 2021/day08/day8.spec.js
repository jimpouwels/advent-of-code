import { readLines } from '../../common/readlines.js';
import run from './day8.js';

describe('day8', () => {

    it('part1', () => {
        expect(run(readLines('2021/day08/testdata.txt')).part1).toEqual(397);
    });

    it('part2', () => {
        expect(run(readLines('2021/day08/testdata.txt')).part2).toEqual(1027422);
    });

}); 