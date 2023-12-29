import { readFile } from '../../common/readlines.js';
import run from './day15.js';

describe('day15', () => {

    it('runs', () => {
        let result = run(readFile('2023/day15/testdata.txt'));
        expect(result.part1).toEqual(518107);
        expect(result.part2).toEqual(303404);
    });

});