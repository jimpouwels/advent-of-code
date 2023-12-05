import { readLines } from '../../common/readlines.js';
import run from './day5.js';

describe('day5', () => {

    it('runs', () => {
        let result = run(readLines('2022/day05/testdata.txt'));
        expect(result.part1).toEqual('HNSNMTLHQ');
        expect(result.part2).toEqual('RNLFDJMCT');
    });

});