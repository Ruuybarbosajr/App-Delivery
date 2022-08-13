const { expect } = require('chai');
const sinon = require('sinon');
const { User } = require('../../database/models');
const service = require('../../api/services');
const userCreated = require('../mocks/userCreated');
const newUserData = require('../mocks/newUserData')

describe('Testa a camada service', () => {
  describe('Testa função create', () => {
    describe('Com os dados válidos', () => {

      before(() => {
        sinon.stub(User, 'create').resolves(userCreated);
        sinon.stub(User, 'findOne').resolves(null);
      });

      after(() => sinon.restore());
      
      it('Deve retonar um objeto com os dados e o token do usuário', async () => {
        const { email, name, password } = newUserData;
        const suv = await service.register.create(email, name, password);
        expect(suv).to.have.key('name', 'email', 'role', 'token', 'id');
      });
    });


    describe('Caso exista o usuário inserido', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(userCreated);
  	  });

      after(() => sinon.restore());

      it('Deve retonar um error com status 409 e message "user already exist"', async () => {
        try {
          const { email, name, password } = newUserData;
          await service.register.create(email, name, password);
        } catch (error) {
          expect(error.message).to.be.equal('user already exist');
          expect(error.status).to.be.equal(409);
        }
      })
    })
  });
})