FROM node

WORKDIR /app/frontend

COPY package.json package-lock.json /app/frontend/

RUN npm install

COPY . /app/frontend/

CMD ["npm", "run", "dev"]