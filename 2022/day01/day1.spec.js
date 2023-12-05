import { readFile } from '../../common/readlines.js';
import run from './day1.js';

describe('day1', () => {

    it('runs', () => {
        let result = run(readFile('2022/day01/testdata.txt'));
        expect(result.part1).toEqual(30);
        expect(result.part2).toEqual(81);
    });

});