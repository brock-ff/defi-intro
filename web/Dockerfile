### This dockerfile serves to provide a stable environment 
### for BUILDING our react app into a static HTML page.
### It should be hosted by a dedicated HTTP server like nginx.

FROM node:14.10.1-stretch
WORKDIR /web

# copy package manifest before source code for optimal yarn install caching
COPY package.json yarn.lock ./

# install node_modules
RUN yarn install

# copy over source code
COPY . .

# build site
RUN yarn run build
