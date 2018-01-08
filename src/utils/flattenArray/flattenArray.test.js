import { flattenArray } from './flattenArray'

describe('flattenArray', () => {
    it('should return an empty array when nothing is passed', () => {
        expect(flattenArray()).toEqual([])
    })

    it('should return an empty array when an empty array is passed', () => {
        expect(flattenArray([])).toEqual([])
    })

    it('should return a flat array when one item in a flat array', () => {
        expect(flattenArray([{}])).toEqual([{}])
    })

    it('should return a flat array when two dimensional array', () => {
        expect(flattenArray([[{}]])).toEqual([{}])
    })

    it('should return a two dimensional array when three dimensional array', () => {
        expect(flattenArray([[[{}]]])).toEqual([[{}]])
    })
})
