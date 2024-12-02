import { readLines } from '../../common/readlines.js';
import run from './day2.js';

describe('day2', () => {

    it('run1', () => {
        let result = run(readLines('2024/day02/testdata.txt'));
        expect(result.part1).toEqual(516);
    });
});