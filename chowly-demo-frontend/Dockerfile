FROM node:alpine3.18

WORKDIR /opt/app

COPY package.json package-lock.json /opt/app/

RUN mkdir -p node_modules

ENV PATH /opt/node_modules/.bin:$PATH

ENV NODE_PATH /opt:/opt/app:$NODE_PATH

COPY ./ /opt/app/

EXPOSE 3000 

RUN npm install

RUN npm run build

VOLUME ["/opt/app"]

CMD ["npm run start"]