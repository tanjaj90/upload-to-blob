FROM node:12.18-alpine
ENV AZURE_CLIENT_ID=secret
ENV AZURE_TENANT_ID=secret
ENV AZURE_CLIENT_SECRET=secret 
ENV NAME=secret 
ENV NUM=10 

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .

CMD ["npm", "start"]