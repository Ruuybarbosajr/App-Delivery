const { expect } = require('chai')
const sinon = require('sinon')
const { User } = require('../../database/models')
const loginData = require('../mocks/loginData')
const service = require('../../api/services')

describe('Testa camada service', () => {
  describe('Testa função signIn', () => {

    describe('Com os dados válidos', () => {

      before(() => {
        sinon.stub(User, 'findOne').resolves({
            id: 3,
            name: 'Cliente Zé Birita',
            email: 'zebirita@email.com',
            password: '1c37466c159755ce1fa181bd247cb925',
            role: 'customer'
          });
      })
      
      after(() => sinon.restore())

      it('Deve retonar um objeto com os dados e o token do usuário', async () => {
        const suv = await service.login.signIn(loginData);

        expect(suv).to.have.key('name', 'email', 'role', 'token');
      });
    });

    describe('Com o email inválido', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(null);
      })
      
      after(() => sinon.restore())

      it('Deve retonar um error com status 404 e message "Not found"', async () => {
        try {
          await service.login.signIn({ ...loginData, email: 'email@invalido.com'});
        } catch (error) {
          expect(error.message).to.be.equal('Not found');
          expect(error.status).to.be.equal(404);
        }
      })
    });

    describe('Com a senha inválida', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves({
          id: 3,
          name: 'Cliente Zé Birita',
          email: 'zebirita@email.com',
          password: '1c37466c159755ce1fa181bd247cb925',
          role: 'customer'
        });
      })
      
      after(() => sinon.restore())

      it('Deve retonar um error com status 400 e message "Invalid field"', async () => {
        try {
          await service.login.signIn({ ...loginData, password: 'senhaInvalida'});
        } catch (error) {
          expect(error.message).to.be.equal('Invalid field');
          expect(error.status).to.be.equal(400);
        }
      })
    });
  });
});