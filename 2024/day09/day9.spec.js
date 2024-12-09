import { readFile } from '../../common/readlines.js';
import run from './day9.js';

describe('day9', () => {

    it('run', () => {
        let result = run(readFile('2024/day09/testdata.txt'));
        expect(result.part1).toEqual(1928);
        expect(result.part2).toEqual(2858);
    });

});