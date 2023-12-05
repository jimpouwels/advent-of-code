import { readLines } from '../../common/readlines.js';
import run from './day2.js';

describe('day2', () => {

    it('runs', () => {
        let result = run(readLines('2021/day02/testdata.txt'));
        expect(result.part1).toEqual(150);
        expect(result.part2).toEqual(900);
    });

});