import { readLines } from '../../common/readlines.js';
import run from './day16.js';

describe('day16', () => {

    it('run', () => {
        expect(run(readLines('2024/day16/testdata.txt'))).toEqual(1448589);
    });

});