import { readLines } from '../../common/readlines.js';
import run from './day2.js';

describe('day2', () => {

    it('runs', () => {
        let result = run(readLines('2023/day02/testdata.txt'), {red: 12, green: 13, blue: 14});
        expect(result.part1).toEqual(2727);
        expect(result.part2).toEqual(56580);
    });

});