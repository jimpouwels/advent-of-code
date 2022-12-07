export default function day6(input, distinctCharCount) {
    let cursor;
    for (cursor = distinctCharCount - 1; cursor < input.length; cursor++) {
        let charsTillNow = input.slice(cursor - distinctCharCount + 1, cursor + 1);
        if ([...new Set(charsTillNow)].length == distinctCharCount) {
            break;
        }
    }
    return cursor + 1;
}