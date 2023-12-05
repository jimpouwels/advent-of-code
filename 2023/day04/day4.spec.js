import { readLines } from '../../common/readlines.js';
import run from './day4.js';

describe('day4', () => {

    it('runs', () => {
        expect(run(readLines('2023/day04/testdata.txt')).part1).toEqual(22897);
    });

});