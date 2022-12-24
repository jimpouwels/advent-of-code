import { readLines } from '../../common/readlines.js';
import run from './day8.js';

describe('day8', () => {

    it('part1', () => {
        expect(run(readLines('2021/day08/testdata.txt')).part1).toEqual(26);
    });

}); 