import { readLines } from '../../common/readlines.js';
import run from './day11.js';

describe('day11', () => {

    it('runs', () => {
        expect(run(readLines('2022/day11/testdata.txt'), true, 20)).toEqual(10605);
        expect(run(readLines('2022/day11/testdata.txt'), false, 10000)).toEqual(2713310158);
    });

});