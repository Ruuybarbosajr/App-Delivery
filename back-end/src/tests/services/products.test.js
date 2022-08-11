const { expect } = require('chai');
const sinon = require('sinon');
const { Product } = require('../../database/models');
const allProdutcs = require('../mocks/AllProducts');
const service = require('../../api/services')

describe('Testa a camada service', () => {
  describe('Testa função getAll', () => {
    
    before(() => {
      sinon.stub(Product, 'findAll').resolves(allProdutcs);
    });

    after(() => sinon.restore())

    describe('Em caso de sucesso', () => {
       it('Deve retornar um array com todos os produtos', async () => {
        const suv = await service.products.getAll();
        expect(suv).to.be.eql(allProdutcs);
       });
    });
  });
});