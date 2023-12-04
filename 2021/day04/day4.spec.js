import { readFile } from '../../common/readlines.js';
import run from './day4.js';

describe('day4', () => {

    it('runs', () => {
        expect(run(readFile('2021/day04/testdata.txt')).part1).toEqual(4512);
        expect(run(readFile('2021/day04/testdata.txt')).part2).toEqual(1924);
    });

});