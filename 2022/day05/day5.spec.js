import { readLines } from '../../common/readlines.js';
import run from './day5.js';

describe('day5', () => {

    it('runs', () => {
        expect(run(readLines('2022/day05/testdata.txt')).part1).toEqual('HNSNMTLHQ');
        expect(run(readLines('2022/day05/testdata.txt')).part2).toEqual('RNLFDJMCT');
    });

});