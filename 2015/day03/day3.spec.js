import { readFile } from '../../common/readlines.js';
import day3 from './day3.js';

describe('day3', () => {

    it('runs', () => {
        let result = day3(readFile('2015/day03/testdata.txt'));
        expect(result.part1).toEqual(2572);
        expect(result.part2).toEqual(0);
    });

});