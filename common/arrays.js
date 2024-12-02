export function cloneMatrix(arrayToClone, selector) {
    return arrayToClone.map(x => x.map(y => selector(y)));
}

export function upsert(arrayToUpsert, object, lambda) {
    let existing = arrayToUpsert.filter(i => lambda(i));
    if (existing.length == 0) {
        arrayToUpsert.push(object);
    } else {
        arrayToUpsert[arrayToUpsert.findIndex(i => lambda(i))] = object;
    }
}

export function pushIfNotContains(arrayToUpsert, value, predicate) {
    if (!arrayToUpsert.some(predicate)) {
        arrayToUpsert.push(value);
    }
}

export function removeAt(arrayToUpdate, index) {
    let copy = [...arrayToUpdate];
    copy.splice(index, 1);
    return copy;
}