import { readLines } from '../../common/readlines.js';
import run from './day5.js';

describe('day5', () => {

    it('part1', () => {
        expect(run(readLines('2022/day5/testdata.txt')).part1).toEqual('HNSNMTLHQ');
    });

    it('part2', () => {
        expect(run(readLines('2022/day5/testdata.txt')).part2).toEqual('RNLFDJMCT');
    });

});