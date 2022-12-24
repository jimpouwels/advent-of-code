import { readLines } from '../../common/readlines.js';
import run from './day4.js';

describe('day4', () => {

    it('part1', () => {
        expect(run(readLines('2022/day04/testdata.txt')).part1).toEqual(526);
    });

    it('part2', () => {
        expect(run(readLines('2022/day04/testdata.txt')).part2).toEqual(886);
    });

});