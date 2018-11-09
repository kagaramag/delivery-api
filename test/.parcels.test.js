const add = require('../v1/parcels_test');

describe('Add f(x)', () => {
    it("should return x + y =z ", () => {
        expect(add(10,5)).toEqual(15);        
    });
});