# pull official base image
FROM node:20

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
COPY ./package.json ./

# install app dependencies
RUN npm instal 

# add app
COPY . .

EXPOSE 3000
# start app
CMD ["npm", "start"]