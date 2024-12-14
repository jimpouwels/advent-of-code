import { readLines } from '../../common/readlines.js';
import run from './day12.js';

describe('day12', () => {

    it('run', () => {
        let result = run(readLines('2024/day12/testdata.txt'));
        expect(result.part1).toEqual(1381056);
        expect(result.part2).toEqual(834828);
    });

});