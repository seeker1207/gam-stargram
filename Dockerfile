FROM node:16-alpine
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]
EXPOSE 3000
