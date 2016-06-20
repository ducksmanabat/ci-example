FROM node:argon

RUN printf "hello"
COPY ./ .

RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
