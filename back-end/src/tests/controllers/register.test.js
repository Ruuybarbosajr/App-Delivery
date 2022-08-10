const { expect } = require('chai');
const sinon = require('sinon');
const service = require('../../api/services');
const userData = require('../mocks/userData');
const newUserData = require('../mocks/newUserData')
const controller = require('../../api/controllers')

describe('Testa a camada controller', () => {
  describe('Testa a função create', () => {
    describe('Em caso de sucesso', () => {
      const req = {};
      const res = {};
      const next = sinon.stub();	

      before(() => {
        sinon.stub(service.register, 'create').resolves(userData)
        req.body = newUserData;
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(userData)
      })
      
      after(() => sinon.restore());

      it('Deve retornar um status 201 e os dados do usuário', async () => {
        await controller.register.create(req, res, next);
        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWith(userData)).to.be.true;
      })
    });

    describe('Em caso de falha', () => {
      const req = {
        body: newUserData
      }
      const res = {};
      const next = sinon.stub();
      const error = { status: 409, message: "user already exists" };

      before(() => {
        sinon.stub(service.register, 'create').throws(error)
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns({ message: "user already exists" })
      });

      after(() => sinon.restore());

      it('A função next deve ser chamada com o parâmetro error', async () => {
        await controller.register.create(req, res, next);
        expect(next.calledWith(error)).to.be.true;
      })
    })
  })
})