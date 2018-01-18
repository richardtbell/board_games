describe('boardGameApp', () => {
    it('should combine the other reducers', () => {
        let combineReducersCalled = false
        const mockRedux = require('redux')
        mockRedux.combineReducers = () => {
            combineReducersCalled = true
        }
        require('./index')
        expect(combineReducersCalled).toBe(true)
    })
})