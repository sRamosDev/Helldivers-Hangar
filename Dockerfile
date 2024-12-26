FROM node:20-alpine
LABEL authors="sebar"

WORKDIR /usr/src/app

COPY .env ./

COPY package*.json ./

RUN npm ci --only=production

RUN npm install --save @types/multer

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]