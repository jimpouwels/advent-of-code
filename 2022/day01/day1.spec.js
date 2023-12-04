import { readFile } from '../../common/readlines.js';
import run from './day1.js';

describe('day1', () => {

    it('runs', () => {
        expect(run(readFile('2022/day01/testdata.txt')).part1).toEqual(30);
        expect(run(readFile('2022/day01/testdata.txt')).part2).toEqual(81);
    });

});