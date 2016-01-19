FROM code4hr/hercules-dockerfile-base

# Copy composer files into the app directory.
COPY composer.json composer.lock ./

# Install dependencies with Composer.
# --prefer-source fixes issues with download limits on Github.
# --no-interaction makes sure composer can run fully automated
RUN composer install --prefer-source --no-interaction

# copy in source files
COPY apache.conf /etc/apache2/sites-available/
RUN a2ensite apache
RUN a2enmod rewrite
COPY . /var/www/html

ENV API_URL http://hercules.code4hr.org:81

EXPOSE 80
CMD ["apache2-foreground"]

