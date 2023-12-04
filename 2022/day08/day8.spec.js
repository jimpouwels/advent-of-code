import { readLines } from '../../common/readlines.js';
import run from './day8.js';

describe('day8', () => {

    it('runs', () => {
        expect(run(readLines('2022/day08/testdata.txt')).part1).toEqual(21);
        expect(run(readLines('2022/day08/testdata.txt')).part2).toEqual(8);
    });

});