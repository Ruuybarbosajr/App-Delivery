FROM node:16-alpine

WORKDIR /app/backend/

COPY . /app/backend/

RUN npm install

EXPOSE 3001

ENTRYPOINT [ "npm", "run", "db:reset" ]

CMD [ "npm", "run", "dev" ]