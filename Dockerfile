FROM node:16.0.0-slim

WORKDIR /app
COPY package.json /app/package.json
RUN npm install --production
COPY . /app

CMD ["npm","start"]
EXPOSE 80
