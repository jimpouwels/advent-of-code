import { readLines } from '../../common/readlines.js';
import run from './day2.js';

describe('day2', () => {

    it('part1', () => {
        expect(run(readLines('2021/day02/testdata.txt')).part1).toEqual(150);
    });

    it('part2', () => {
        expect(run(readLines('2021/day02/testdata.txt')).part2).toEqual(900);
    });

});