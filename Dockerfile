# Fetching the minified node image on apline linux
FROM node:slim

# Declaring env
 
ENV JWT_EXPIRATION_MINUTES 15
ENV JWT_SECRET sample_secret
ENV PORT 6060
ENV SOCKETPORT 3000
ENV NODE_ENV Production

# Setting up the work directory
WORKDIR /tele-med

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install
# RUN npx sequelize-cli db:migrate --name ./migrations/20240110181854_test

# Starting our application
CMD [ "node", "index.js" ]

# Exposing server port
EXPOSE 6060
EXPOSE 3000