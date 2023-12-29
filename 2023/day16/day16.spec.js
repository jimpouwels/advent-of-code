import { readLines } from '../../common/readlines.js';
import run from './day16.js';

describe('day16', () => {

    it('runs', () => {
        let result = run(readLines('2023/day16/testdata.txt'));
        expect(result.part1).toEqual(7562);
        expect(result.part2).toEqual(7793);
    });

});