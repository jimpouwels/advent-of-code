import { readLines } from '../../common/readlines.js';
import run from './day14.js';

describe('day14', () => {

    it('runs', () => {
        let result = run(readLines('2023/day14/testdata.txt'), 1000000000);
        expect(result.part1).toEqual(109654);
        expect(result.part2).toEqual(94876);
    });

});