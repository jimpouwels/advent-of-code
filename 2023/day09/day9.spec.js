import { readLines } from '../../common/readlines.js';
import run from './day9.js';

describe('day9', () => {

    it('runs', () => {
        let result = run(readLines('2023/day09/testdata.txt'));
        expect(result.part1).toEqual(1702218515);
        expect(result.part2).toEqual(925);
    });

});