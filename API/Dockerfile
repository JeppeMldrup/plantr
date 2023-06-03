FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

copy . .

EXPOSE 3000

CMD ["node", "main.js"]
