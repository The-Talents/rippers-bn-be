

import { expect } from 'chai';

import { add, multiply } from '../src/sample.js';
describe('Simple Math Test', () => {
  it('should return 4 when 2 is added to 2', () => {
    expect(2 + 2).to.equal(4);
  });

  it('should return 9 when 3 is multiplied by 3', () => {
    expect(3 * 3).to.equal(9);
  });
});


describe('Math Operations', () => {

  describe('add', () => {
    it('should return the sum of two numbers', () => {
      expect(add(2, 2)).to.equal(4);
      expect(add(-2, 2)).to.equal(0);
    });
  });

  describe('multiply', () => {
    it('should return the product of two numbers', () => {
      expect(multiply(3, 3)).to.equal(9);
      expect(multiply(2, 0)).to.equal(0);
    });
  });

});