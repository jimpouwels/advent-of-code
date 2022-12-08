import { readLines } from '../readlines.js';
import day8 from './day8.js';

describe('day8', () => {

    it('part1', () => {
        expect(day8(readLines('day8/testdata.txt')).part1).toEqual(21);
    });

    it('part2', () => {
        expect(day8(readLines('day8/testdata.txt')).part2).toEqual(8);
    });

});