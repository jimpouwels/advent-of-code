import { readLines } from '../../common/readlines.js';
import run from './day2.js';

describe('day2', () => {

    it('runs', () => {
        const result = run(readLines('2022/day02/testdata.txt'));
        expect(result.part1).toEqual(15572);
        expect(result.part2).toEqual(16098);
    });

});