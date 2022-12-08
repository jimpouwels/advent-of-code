import { readLines } from '../../common/readlines.js';
import day8 from './day8.js';

describe('day8', () => {

    it('part1', () => {
        expect(day8(readLines('2022/day8/testdata.txt')).part1).toEqual(21);
    });

    it('part2', () => {
        expect(day8(readLines('2022/day8/testdata.txt')).part2).toEqual(8);
    });

});