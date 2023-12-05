import { readLines } from '../../common/readlines.js';
import run from './day8.js';

describe('day8', () => {

    it('runs', () => {
        let result = run(readLines('2021/day08/testdata.txt'));
        expect(result.part1).toEqual(397);
        expect(result.part2).toEqual(1027422);
    });

}); 