FROM node:23.3.0

WORKDIR /api

COPY . .

RUN npm ci --omit=dev
RUN npx prisma migrate deploy

CMD [ "npm", "run", "server:prod:up" ]

# EXPOSE 4001