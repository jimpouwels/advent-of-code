import { readLines } from '../../common/readlines.js';
import run from './day8.js';

describe('day8', () => {

    it('run', () => {
        expect(run(readLines('2024/day08/testdata.txt'), ['+', '*'])).toEqual(305);
    });

});