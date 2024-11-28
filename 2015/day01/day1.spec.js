import { readFile } from '../../common/readlines.js';
import day1 from './day1.js';

describe('day1', () => {

    it('runs', () => {
        let result = day1(readFile('2015/day01/testdata.txt'));
        expect(result.part1).toEqual(280);
        expect(result.part2).toEqual(1797);
    });

});