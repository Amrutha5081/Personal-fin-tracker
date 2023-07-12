# Personal-fin-tracker

<p>This is a simple personal-finance tracker application that keeps a track of your finances and helps you manage it effectively. The income and expenses are calculated upon which the savings will be automatically generated.</p>

To run this, you need to connect to your local database, and create a simple table having fields as 'username' and 'password'

Commands:
<ul>
  <li>-Create database dbname;</li>
  <li>-use dbname;</li>
  <li>-Create table tablename(id int(30), username varchar(30), password varchar(30));</li>
  <li>-insert into tablename(id, username, password) values(12,'','');</li>
</ul>

The login is authenticated using PHP, in order to run, you can define your available port number, and run it using

<em>-php -S localhost:'portno'</em>

P.S - You need to make changes in the name of the db and password, along with server name, and change it according to your locally created db(MYSQL is usually preferred).
