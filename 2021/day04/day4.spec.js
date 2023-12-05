import { readFile } from '../../common/readlines.js';
import run from './day4.js';

describe('day4', () => {

    it('runs', () => {
        let result = run(readFile('2021/day04/testdata.txt'));
        expect(result.part1).toEqual(4512);
        expect(result.part2).toEqual(1924);
    });

});