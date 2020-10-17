const sum = require('./sum')

test('summation test',()=>{
    expect(sum(1,2)).toBe(3)
})