# App-delivery

## 🚀 Começando

Plataforma de entregas de bebidas, com diferentes fluxos de acesso. Neste projeto foi desenvolvido o back-end, front-end e o banco de dados. Utilizando padrão REST na API e arquitetura MSC Utilizando Express para construção do servidor. A autenticação do usuário e geração de um token é realizada através do JWT. O banco de dados MySQL foi construído com o auxílio do ORM Sequelize.

Consulte **Instalação** para saber como implantar o projeto.

### 🔧 Instalação

> É necessário ter Docker na sua máquina local para executar os seguintes comandos.

- Rode os serviços `frontend`, `backend` e `db` com o comando `docker-compose up -d --build`.
- Lembre-se de parar o `MySQL` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers
- Esses serviços irão inicializar um container chamado `delivery_front`, `delivery_api` e outro chamado `delivery_db`.
- A partir daqui é ideal você acompanhar o log do container `delivery_api` para ter certeza que o banco foi populado e a API está pronta para uso.

- Ele vai subir sua API na porta `3001`
- Aplicação Frontend na porta `3000`

## 🛠️ Construído com

* [Express](https://expressjs.com/pt-br/)
* [Node](https://nodejs.org/pt-br/docs/)
* [MySQL](https://dev.mysql.com/doc/)
* [Sequelize](https://sequelize.org/docs/v6/getting-started/)
* [Chai](https://www.chaijs.com/)
* [Mocha](https://mochajs.org/)
* [Sinon](https://sinonjs.org/releases/latest/)
* [Joi](https://joi.dev/api/?v=17.6.0)
* [React](https://pt-br.reactjs.org/)
* [JWT](https://jwt.io/)
* [Material UI](https://mui.com/pt/)
* [Axios](https://axios-http.com/ptbr/docs/intro)
* [React Icons](https://react-icons.github.io/react-icons/)

## Contribuição de

* [George Lucas](https://www.linkedin.com/in/glalmeida-/)
* [Thais Luza](https://www.linkedin.com/in/thais-luza-95447a73/)
* [Gabriel Araujo](https://www.linkedin.com/in/gabriel-araujo11/)
* [Ruy](https://www.linkedin.com/in/ruybarbosajr/)

<div align="center">
  <img height="500" widht= "600" src="https://user-images.githubusercontent.com/91337493/188001421-7ca2ffcc-dd98-4a6a-a465-6544019daf39.png">
</div>
