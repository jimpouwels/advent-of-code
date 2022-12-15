import { readLines } from '../../common/readlines.js';
import run from './day14.js';

describe('day14', () => {

    it('run1', () => {
        const r = run(readLines('2022/day14/testdata.txt'));
        expect(r.part1).toEqual(828);
    });

});