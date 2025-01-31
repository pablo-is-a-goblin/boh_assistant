FROM node:18-alpine

COPY code/package-lock.json ./
COPY code/package.json ./

RUN npm install

WORKDIR /app

CMD ["npm", "start"]