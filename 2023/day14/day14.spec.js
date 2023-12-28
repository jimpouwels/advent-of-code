import { readLines } from '../../common/readlines.js';
import run from './day14.js';

describe('day14', () => {

    it('runs', () => {
        // expect(run(readLines('2023/day14/testdata.txt'), 1)).toEqual(109654);
        expect(run(readLines('2023/day14/testdata.txt'), 2)).toEqual(1000000000);
    });

});