Explore: Hampton Roads
======================

#About

_Explore: Hampton Roads_ is a frontend web application sourced by the [hercules API](https://github.com/Code4HR/hercules).

The project was the Best In Show winner at the fall 2015 Hack to Help Hampton Roads hackathon, organized by Dominion Enterprises & Code for Hampton Roads. DE donated $15,000 to Code for America to help usher this project into a useful production system.

#The Vision

_Explore: Hampton Roads_ will allow users to view and interact with data specific to their community.  _Explore: Hampton Roads_ will be sourced with Crime, School, and Housing data allowing users to..

* Collect data from different sources into one, easily accessible location
* See how different data sources interact for deeper insights
* See a high level analysis and explanation of the data being viewed
* Interact with the data in an appealing, digestable format

#Current Status

Currently, the _Explore: Hampton Roads_ web application will be sourced with Hampton, VA data only to leverage the Hampton Crime API.  This will allow for the collection and presentation to be worked out with data that is readily available, with other cities to be added in a modular format.


#Team

- [@BretFisher](https://github.com/bretfisher) - PM and CfA Sponsor
- [@DerekDrummond](https://github.com/ezzy1337) - Professional code typer
- [@KrishnaRanga](https://github.com/krishnaramya) - Master of AJAX
- [@JosiahBaker](https://github.com/josibake) - Data Dude
- [@JasonBennett](https://github.com/blackhatbrigade) - Master of Automation
- [@AliciaSedarski](https://github.com/asedarski) - Makes it look pretty


#Apache Vhost

```
<VirtualHost *:80>
    ServerName www.explorehr.com
    DocumentRoot "/home/{user}/explore/public/"

    ErrorLog /home/{user}/explore/logs/explorehr.error_log
    CustomLog /home/{user}/explore/logs/explorehr.access_log combined
</VirtualHost>
<Directory "/home/{user}/explore/public/">
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
    Require all granted
</Directory>
```