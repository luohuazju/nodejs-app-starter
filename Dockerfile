FROM node:16.0.0-slim as build

WORKDIR /app
COPY . /app
RUN npm install --production

FROM node:16.0.0-alpine
COPY --from=build /app /
EXPOSE 80
CMD ["npm","start"]
