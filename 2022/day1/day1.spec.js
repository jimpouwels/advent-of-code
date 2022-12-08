import { readFile } from '../../common/readlines.js';
import day1 from './day1.js';

describe('day1', () => {

    it('part1', () => {
        expect(day1(readFile('2022/day1/testdata.txt')).part1).toEqual(30);
    });

    it('part2', () => {
        expect(day1(readFile('2022/day1/testdata.txt')).part2).toEqual(81);
    });

});