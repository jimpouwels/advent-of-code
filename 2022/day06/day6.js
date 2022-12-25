export default function run(input, distinctCharCount) {
    let cursor;
    for (cursor = 0; cursor < input.length; cursor++) {
        let charsTillNow = input.slice(cursor, cursor + distinctCharCount);
        if ([...new Set(charsTillNow)].length == distinctCharCount) {
            return cursor + distinctCharCount;
        }
    }
}