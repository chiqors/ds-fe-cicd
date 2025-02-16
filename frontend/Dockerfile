# Stage 1: Build the application
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the production version of the app
RUN npm run build

# Stage 2: Serve the application
FROM nginx:stable-alpine AS production

# Copy the built files from the builder stage to the NGINX web root
COPY --from=builder /app/build /usr/share/nginx/html

# Copy a custom NGINX configuration if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]