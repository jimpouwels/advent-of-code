import { readLines } from '../../common/readlines.js';
import run from './day2.js';

describe('day2', () => {

    it('runs', () => {
        expect(run(readLines('2021/day02/testdata.txt')).part1).toEqual(150);
        expect(run(readLines('2021/day02/testdata.txt')).part2).toEqual(900);
    });

});