import { readFile } from '../../common/readlines.js';
import run from './day15.js';

describe('day15', () => {

    it('run', () => {
        expect(run(readFile('2024/day15/testdata.txt'))).toEqual(1448589);
    });

});