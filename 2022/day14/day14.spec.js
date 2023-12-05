import { readLines } from '../../common/readlines.js';
import run from './day14.js';

describe('day14', () => {

    it('runs', () => {
        const result = run(readLines('2022/day14/testdata.txt'));
        expect(result.part1).toEqual(828);
        expect(result.part2).toEqual(25500);
    });

});