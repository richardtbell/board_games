import { removeDuplicateObjectsFromArray } from './removeDuplicateObjectsFromArray'

describe('removeDuplicateObjectsFromArray', () => {
    it('should return [] when passed []', () => {
        expect(removeDuplicateObjectsFromArray([])).toEqual([])
    })

    it('should remove duplicate objects with name key', () => {
        expect(removeDuplicateObjectsFromArray([{ name: 'fake' }, { name: 'fake' }])).toEqual([{ name: 'fake' }])
    })

    it('should remove duplicate objects with any key', () => {
        expect(removeDuplicateObjectsFromArray([{ test: 'fake' }, { test: 'fake' }])).toEqual([{ test: 'fake' }])
    })

    it('should not remove duplicate objects with any key value different', () => {
        const arr = [{ test: 'fake', id: 1 }, { id: 2, test: 'fake' }]
        expect(removeDuplicateObjectsFromArray(arr)).toEqual(arr)
    })

    it('should not remove duplicate objects with any key different', () => {
        const arr = [{ test: 'fake', bob: 1 }, { id: 2, test: 'fake' }]
        expect(removeDuplicateObjectsFromArray(arr)).toEqual(arr)
    })
})