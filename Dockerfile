# Fetching the latest node image on apline linux
FROM node:16-alpine3.18 AS builder

# Declaring env
#ENV NODE_ENV production

# Setting up the work directory
WORKDIR /app

# Installing dependencies
#ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm install 

# Copying all the files in our project
COPY . .

# Building our application
RUN npm run build

# Fetching the latest nginx image
FROM nginx:1.21.0-alpine 
ENV NODE_ENV production
WORKDIR /usr/share/nginx/html

#RUN rm -rf ./*
# Copying built assets from builder
COPY --from=builder /app/build .

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]