# Use the official Node.js 16 image as a parent image
FROM node:latest

# Set the working directory inside the container to /app
WORKDIR /dapp-store-ui

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./



RUN rm -f package-lock.json 

RUN rm -f  -R  .nuxt
RUN rm -f  -R  .output
# rm -f  -R  node_modules
RUN rm -rf node_modules/.cache node_modules/.vite;
# rm -f  -R  node_modules/.cache

# Install dependencies
RUN npm i

RUN npm i nuxt@3.12.4
RUN npm i -D vuetify vite-plugin-vuetify 
RUN npm i @mdi/font
 


# Install project dependencies
# RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "dev"]
