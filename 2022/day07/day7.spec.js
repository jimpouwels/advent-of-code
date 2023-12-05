import { readLines } from '../../common/readlines.js';
import run from './day7.js';

describe('day7', () => {

    it('runs', () => {
        let result = run(readLines('2022/day07/testdata.txt'), 8381165);
        expect(result.part1).toEqual(1206825);
        expect(result.part2).toEqual(9608311);
    });

});