FROM node:18-alpine3.16
RUN apk add openssl openssl-dev libc6-compat
WORKDIR /app
COPY pages ./pages
COPY lib ./lib
COPY components ./components
COPY prisma ./prisma
COPY styles ./styles
COPY package.json tsconfig.json next.config.js ./
RUN npm install --verbose
RUN npm run generate
## TODO - build fails for prisma reasons...
RUN npm run build
CMD ["npm", "run", "start"]