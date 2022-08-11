const { expect } = require('chai');
const sinon = require('sinon');
const service = require('../../api/services');
const allProducts = require('../mocks/AllProducts');
const controller = require('../../api/controllers')

describe('Testa camada controller', () => {
  describe('Testa função getAll', () => {

    describe('Em caso de sucesso', () => {
      const req = {};
      const res = {};
      const next = sinon.stub();

      before(() => {
        sinon.stub(service.products, 'getAll').resolves(allProducts);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(allProducts);
      });

      after(() => sinon.restore());

      it('Deve retornar um status 200 e um array com todos os produtos', async () => {
        await controller.products.getAll(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(allProducts)).to.be.true;
      });
    });

    describe('Em caso de falha', () => {
      const req = {};
      const res = {};
      const next = sinon.stub();
      const error = new Error('error fake');

      before(() => {
        sinon.stub(service.products, 'getAll').throws(error);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(allProducts);
      });

      after(() => sinon.restore());
      it('A função next deve ser chamada com o parâmetro error', async () => {
        await controller.products.getAll(req, res, next);
        expect(next.calledWith(error)).to.be.true;
      });
    });
  });
});