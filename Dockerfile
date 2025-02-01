FROM node:20-alpine AS build
LABEL authors="sRamosDev"

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update && apk add --no-cache curl

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS prod

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist

RUN apk update && apk add --no-cache curl

RUN npm ci --only=production

EXPOSE 3000

CMD [ "node", "dist/main.js" ]