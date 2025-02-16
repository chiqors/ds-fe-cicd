# Use NGINX to serve the built files
FROM nginx:stable-alpine AS production

# Copy the built files to the NGINX web root
COPY build /usr/share/nginx/html

# Copy a custom NGINX configuration if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]