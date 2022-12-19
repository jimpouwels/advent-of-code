import { readFile } from '../../common/readlines.js';
import run from './day4.js';

describe('day4', () => {

    it('part1', () => {
        expect(run(readFile('2021/day4/testdata.txt')).part1).toEqual(4512);
        expect(run(readFile('2021/day4/testdata.txt')).part2).toEqual(1924);
    });

});