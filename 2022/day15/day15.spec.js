import { readLines } from '../../common/readlines.js';
import run from './day15.js';

describe('day15', () => {

    it('run1', () => {
        const r = run(readLines('2022/day15/testdata.txt'), 10);
        expect(r.part1).toEqual(26);
        // expect(r.part2).toEqual(56000011);
    });

});