import { readLines } from '../../common/readlines.js';
import run from './day10.js';

describe('day10', () => {

    it('part1', () => {
        expect(run(readLines('2022/day10/testdata.txt')).part1).toEqual(16880);
    });

    it('part2', () => {
        expect(run(readLines('2022/day10/testdata.txt')).part2).toEqual(
            "###..#..#..##..####..##....##.###..###..\n" +
            "#..#.#.#..#..#....#.#..#....#.#..#.#..#.\n" +
            "#..#.##...#..#...#..#..#....#.###..#..#.\n" +
            "###..#.#..####..#...####....#.#..#.###..\n" +
            "#.#..#.#..#..#.#....#..#.#..#.#..#.#.#..\n" +
            "#..#.#..#.#..#.####.#..#..##..###..#..#.\n"
        );
    });

});