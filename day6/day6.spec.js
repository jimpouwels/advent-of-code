import { readLines } from '../readlines.js';
import day6 from './day6.js';

describe('day6', () => {

    it('part1', () => {
        expect(day6('bvwbjplbgvbhsrlpgdmjqwftvncz', 4).part1).toEqual(5);
        expect(day6('nppdvjthqldpwncqszvftbrmjlhg', 4).part1).toEqual(6);
        expect(day6('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4).part1).toEqual(10);
        expect(day6('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4).part1).toEqual(11);
    });

    it('part2', () => {
        expect(day6('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14).part1).toEqual(19);
        expect(day6('bvwbjplbgvbhsrlpgdmjqwftvncz', 14).part1).toEqual(23);
        expect(day6('nppdvjthqldpwncqszvftbrmjlhg', 14).part1).toEqual(23);
        expect(day6('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14).part1).toEqual(29);
        expect(day6('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14).part1).toEqual(26);
    });

});