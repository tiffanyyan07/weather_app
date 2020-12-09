#Dockerfile

#define what image we want to build from. included Node.js and NPM
FROM node:latest
#create a directory to hold the applicaiton code inside the image,this will be the working directory for app
WORKDIR C:\Users\00\Downloads\APP\server
#copy the package.json and package-lock.json file, "*"==wildcard
COPY package*.json ./
#install the dependencies
RUN npm install
#copy the source code
COPY . .
#map by the coker daemon
EXPOSE 3010
CMD ["npm","start"]