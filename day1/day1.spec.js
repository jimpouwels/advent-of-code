import { readFile } from '../readlines.js';
import day1 from './day1.js';

describe('day1', () => {

    it('part1', () => {
        const result = day1(readFile('day1/testdata.txt'));
        expect(result.part1).toEqual(30);
    });

    it('part2', () => {
        const result = day1(readFile('day1/testdata.txt'));
        expect(result.part2).toEqual(81);
    });

});