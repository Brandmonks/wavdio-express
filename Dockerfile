# Build stage
FROM node:16.20.2
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

# Serve stage
FROM node:16.20.2
ENV MONGO_HOST=db
ENV MONGO_USER=root
ENV MONGO_PASSWORD=example
WORKDIR /app
COPY --from=0 /app .
RUN rm config.json
CMD echo "{\"db-host\": \"db\", \"db-name\": \"wavdio\", \"db-user\": \"$MONGO_USER\", \"db-password\": \"$MONGO_PASSWORD\"}" > config.json && node ./bin/server.js --db-host=$MONGO_HOST
EXPOSE 3000
