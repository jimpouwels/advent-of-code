import { readFile } from '../../common/readlines.js';
import run from './day7.js';

describe('day7', () => {

    it('runs', () => {
        let result = run(readFile('2021/day07/testdata.txt'));
        expect(result.part1).toEqual(37);
        expect(result.part2).toEqual(168);
    });

});