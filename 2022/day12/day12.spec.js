import { readLines } from '../../common/readlines.js';
import run from './day12.js';

describe('day12', () => {

    it('run', () => {
        const result = run(readLines('2022/day12/testdata.txt'));
        expect(result.part1).toEqual(481);
        expect(result.part2).toEqual(480);
    });

});