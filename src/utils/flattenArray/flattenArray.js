export const flattenArray = (array) => {
    return [].concat.apply([], array)
}