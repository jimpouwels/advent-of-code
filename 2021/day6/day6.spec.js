import { readFile } from '../../common/readlines.js';
import run from './day6.js';

describe('day6', () => {

    it('part1', () => {
        expect(run(readFile('2021/day6/testdata.txt')).part1).toEqual(5934);
        // expect(run(readLines('2021/day6/testdata.txt')).part2).toEqual(12);
    });

});