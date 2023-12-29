import { readLines } from '../../common/readlines.js';
import { runPart1, runPart2 } from './day16.js';

describe('day16', () => {

    it('runs', () => {
        expect(runPart1(readLines('2023/day16/testdata.txt'))).toEqual(7562);

        // Part 2 takes about 30 seconds to run, uncomment to run it;
        // expect(runPart2(readLines('2023/day16/testdata.txt'))).toEqual(7793);
    });

});