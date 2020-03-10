FROM node:12.15-slim

WORKDIR /app
COPY package.json /app/package.json
RUN npm install --production
COPY . /app

CMD ["npm","start"]
EXPOSE 80
