# Personal-fin-tracker

This is a simple personal-finance tracker application that keeps a track of your finances and helps you manage it effectively. The income and expenses are calculated upon which the savings will be automatically generated.

To run this, you need to connect to your local database, and create a simple table having fields as 'username' and 'password'

Commands:
-Create database dbname;
-use dbname;
-Create table tablename(id int(30), username varchar(30), password varchar(30));
-insert into tablename(id, username, password) values(12,'','');


The login is authenticated using PHP, in order to run, you can define your available port number, and run it using

-php -S localhost:'portno'
