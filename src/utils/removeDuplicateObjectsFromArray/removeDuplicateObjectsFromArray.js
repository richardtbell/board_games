export const removeDuplicateObjectsFromArray = (array) => {
    return array.filter((game, index, self) => {
        const ind = self.findIndex(g => {
            const keys = Object.keys(g)
            return keys.every(k => g[k] === game[k])
        })
        return index === ind
    })
}