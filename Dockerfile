FROM node:alpine

WORKDIR /var/www

COPY package*.json ./

RUN  yarn install

COPY . .

RUN  yarn build

EXPOSE 3333

CMD ["yarn", "start"]
