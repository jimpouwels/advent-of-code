import { readLines } from '../../common/readlines.js';
import run from './day8.js';

describe('day8', () => {

    it('runs', () => {
        let result = run(readLines('2023/day08/testdata.txt'), false);
        expect(result.part1).toEqual(18727);
    });

});