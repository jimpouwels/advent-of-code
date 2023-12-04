import { readLines } from '../../common/readlines.js';
import run from './day14.js';

describe('day14', () => {

    it('runs', () => {
        const r = run(readLines('2022/day14/testdata.txt'));
        expect(r.part1).toEqual(828);
        expect(r.part2).toEqual(25500);
    });

});