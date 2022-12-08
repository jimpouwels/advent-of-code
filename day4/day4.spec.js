import { readLines } from '../readlines.js';
import day4 from './day4.js';

describe('day4', () => {

    it('part1', () => {
        const result = day4(readLines('day4/testdata.txt'));
        expect(result.part1).toEqual(526);
    });

    it('part2', () => {
        const result = day4(readLines('day4/testdata.txt'));
        expect(result.part2).toEqual(886);
    });

});