const myFunction = require('./myFunction');
const app = require('../app');

describe('myFunction', () => {
  test('should return the correct output', () => {
    expect(myFunction(2)).toBe(4);
    expect(myFunction(3)).toBe(9);
    expect(myFunction(4)).toBe(16);
  });

  test('should handle invalid inputs', () => {
    expect(myFunction('a')).toBeNaN();
    expect(myFunction(-1)).toBeNaN();
  });
});