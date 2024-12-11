import { readLines } from '../../common/readlines.js';
import run from './day10.js';

describe('day10', () => {

    it('run', () => {
        let result = run(readLines('2024/day10/testdata.txt'));
        expect(result.part1).toEqual(512);
        expect(result.part2).toEqual(1045);
    });

});