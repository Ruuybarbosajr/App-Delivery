const { expect } = require('chai')
const sinon = require('sinon')
const service = require('../../api/services');
const loginData = require('../mocks/loginData');
const userData = require('../mocks/userData');
const controller = require('../../api/controllers')

describe('Testa camada controller', () => {
  describe('Testa função signIn', () => {
    
    describe('Em caso de sucesso', () => {
      const req = {
        body: loginData
      };
      const res = {};
      const next = sinon.stub().returns();
  
      before(() => {
        sinon.stub(service.login, 'signIn').resolves(userData);
  
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(userData)
      })

      after(() => sinon.restore())

      it('Deve retornar um status 200 e os dados do usuário', async () => {
        const suv = await controller.login.signIn(req, res, next)
        expect(res.status.calledWith(200)).to.be.true
        expect(suv).to.be.eql(userData)
      });
    });

    describe('Em caso de falha', () => {

      const req = { body: {} };
      const res = {};
      const next = sinon.stub().returns();
      const error = new Error('Error fake')

      before(() => {
        sinon.stub(service.login, 'signIn').throws(error);

        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns()
      })

      after(() => sinon.restore());

      it('A função next deve ser chamada com o parâmetro error', async () => {
          await controller.login.signIn(req, res, next);
          expect(next.calledWith(error)).to.be.true
      });
    });
  });
});