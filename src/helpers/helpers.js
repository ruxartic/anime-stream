export function substringAfter(str, delimiter) {
    return str.substring(str.indexOf(delimiter) + delimiter.length);
}

export function substringBefore(str, delimiter) {
    return str.substring(0, str.indexOf(delimiter));
}

export function substringAfterLast(str, delimiter) {
    return str.substring(str.lastIndexOf(delimiter) + delimiter.length);
}
