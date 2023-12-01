import { readLines } from '../../common/readlines.js';
import run from './day1.js';

describe('day1', () => {

    it('part1', () => {
        expect(run(readLines('2023/day01/testdata.txt')).part1).toEqual(54916);
    });

    it('part2', () => {
        expect(run(readLines('2023/day01/testdata.txt')).part2).toEqual(54728);
    });

});