#dockerfile

FROM node:alpine as build
WORKDIR C:/Users/00/Downloads/APP/client
COPY package*.json ./
RUN npm install
RUN npm install -g react-scripts --slient
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]

