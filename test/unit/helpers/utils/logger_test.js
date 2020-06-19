const commonUtil = require('../../../../bin/helpers/utils/logger');
const { expect } = require('chai');
describe(__filename, () => {
  describe('#log', () => {
    it('expect to be function', () => {
      expect(commonUtil.log).to.be.a('function');
    });
    it('expect to return an object', async () => {
      commonUtil.log('data','ok','ok');
    });
  });
});
