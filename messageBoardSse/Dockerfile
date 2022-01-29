FROM node

COPY ./main.js /app/
COPY ./package.json /app/
WORKDIR /app

RUN npm i

FROM node

COPY --from=0 /app /app
WORKDIR /app
CMD ["node", "main.js"]
