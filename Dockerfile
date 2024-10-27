FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=development
COPY . .
CMD ["yarn", "dev"]