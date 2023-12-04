import { readLines } from '../../common/readlines.js';
import run from './day2.js';

describe('day1', () => {

    it('part1', () => {
        expect(run(readLines('2023/day2/testdata.txt'), {red: 12, green: 13, blue: 14}).part1).toEqual(2727);
    });

});