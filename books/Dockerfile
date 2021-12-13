FROM node:14-alpine as base
WORKDIR ./
COPY package*.json /
EXPOSE 3001
COPY . /
RUN npm install --production
CMD ["node", "index.js"]