import { readLines } from '../../common/readlines.js';
import run from './day9.js';

describe('day9', () => {

    it('runs', () => {
        let result = run(readLines('2023/day09/testdata.txt'));
        expect(result).toEqual(1702218515);
    });

});