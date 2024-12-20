import { readLines } from '../../common/readlines.js';
import run from './day14.js';

describe('day14', () => {

    it('run', () => {
        expect(run(readLines('2024/day14/testdata.txt'))).toEqual(229632480);
    });

});