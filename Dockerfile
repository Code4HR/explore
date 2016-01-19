FROM httpd:latest

COPY . /usr/local/apache2/htdocs

ENV API_URL http://hercules.code4hr.org

EXPOSE 80
CMD ["httpd-foreground"]
