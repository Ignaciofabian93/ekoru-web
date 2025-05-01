FROM node:22

WORKDIR /app

COPY /app .

COPY package.json .

COPY tsconfig.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

CMD [ "npm", "start" ]