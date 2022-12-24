import { readLines } from '../../common/readlines.js';
import run from './day8.js';

describe('day8', () => {

    it('part1', () => {
        expect(run(readLines('2022/day08/testdata.txt')).part1).toEqual(21);
    });

    it('part2', () => {
        expect(run(readLines('2022/day08/testdata.txt')).part2).toEqual(8);
    });

});