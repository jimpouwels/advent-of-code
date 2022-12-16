import { readLines } from '../../common/readlines.js';
import run from './day16.js';

describe('day16', () => {

    it('run1-small', () => {
        const r = run(readLines('2022/day16/testdata.txt'), 10);
        expect(r.part1).toEqual(0);
    });

});