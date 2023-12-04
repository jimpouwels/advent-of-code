import { readLines } from '../../common/readlines.js';
import run from './day2.js';

describe('day1', () => {

    it('runs', () => {
        expect(run(readLines('2023/day02/testdata.txt'), {red: 12, green: 13, blue: 14}).part1).toEqual(2727);
        expect(run(readLines('2023/day02/testdata.txt'), {}).part2).toEqual(56580);
    });

});