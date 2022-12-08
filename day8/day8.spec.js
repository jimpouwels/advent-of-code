import { readLines } from '../readlines.js';
import day8 from './day8.js';

describe('day8', () => {

    it('part1', () => {
        expect(day8(readLines('day8/testdata_p1_1.txt')).part1).toEqual(21);
        expect(day8(readLines('day8/testdata_p1_2.txt')).part1).toEqual(1763);
    });

    it('part2', () => {
    });

});