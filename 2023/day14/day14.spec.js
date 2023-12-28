import { readLines } from '../../common/readlines.js';
import run from './day14.js';

describe('day14', () => {

    it('runs', () => {
        expect(run(readLines('2023/day14/testdata.txt'), 0)).toEqual(109654);
    });

});