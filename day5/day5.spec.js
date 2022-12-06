import { readLines } from '../readlines.js';
import day5 from './day5.js';

describe('day5', () => {

    it('part1', () => {
        const result = day5(readLines('day5/testdata.txt'));
        expect(result.part1).toEqual('HNSNMTLHQ');
    });

    it('part2', () => {
        const result = day5(readLines('day5/testdata.txt'));
        expect(result.part2).toEqual('RNLFDJMCT');
    });

});