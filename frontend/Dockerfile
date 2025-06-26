FROM node:24-alpine3.21
WORKDIR /app
COPY package*.json ./
RUN npm install react-router-dom && npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
