---
title: PhpStorm Configuration
permalink: /dev-docs/phpstorm/
---

## Enable WordPress Integration

Go to Settings → PHP → Frameworks → WordPress, click enable and set installation path to `~/Code/pressbooks-dev/site/web/wp`:

![WordPress integration](/images/phpstorm-wp.png)

## NPM

Right click on package.json, select "Show npm Scripts":

![npm Tasks](/images/npm-tasks.png)

## Databases

In the Database tool window (View → Tool Windows → Database), click the plus symbol, select Data Source → MariaDB. Call the database `Pressbooks Test`, and set the following values:

In the General tab (Tip: Credentials are comming from the `/site/.env` file):

- Host: 127.0.0.1 (Port: 3306)
- Authentication: User & Password

Provide the user & password for a user who has database access to your local installation.
![](/images/database-general.png)

In the SSH/SSL tab:

- Proxy host: pressbooks.test (Port: 22)
- Proxy user: vagrant
- Auth type: Key pair (OpenSSH)
- Private key file: `~/Code/pressbooks-dev/trellis/.vagrant/machines/default/virtualbox/private_key`
- Make sure the `Parse config file ~/.ssh/config` option is **not** selected
  ![](/images/database-ssh.png)

## Configure Remote PHP Interpreter

Open Settings → PHP and find the CLI Interpreter option. Click the three dots [...], click the plus symbol, select "From Docker, Vagrant, VM, WSL, Remote" and set "Vagrant Instance File" to your Trellis directory.

![PHP Interpreter settings step 1](/images/php-interpreter-settings-1.png)
![PHP Interpreter settings step 2](/images/php-interpreter-settings-2.png)
![PHP Interpreter completed](/images/php-interpreter-done.png)

## XDebug

Update to the latest PHPStorm and get the [Xdebug Helper](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc?utm_source=chrome-app-launcher-info-dialog) Chrome plugin.

Go to Settings → PHP &gt; Servers, create a new server named pressbooks.test and map:

- `pressbooks-dev/site` to `/srv/www/pressbooks.test/current`
- `pressbooks-dev/trellis` to `/home/vagrant/trellis`

![Xdebug Setup](/images/Xdebug-1.png)

Enable Xdebug Helper in Chrome, set some break points in PhpStorm, enable the "Start Listening for PHP Debug Connections" telephone icon in PhpStorm, and reload the website in Chrome:

![Xdebug In Action](/images/Xdebug-2.png)

## Configure Remote PHPUnit

Settings → PHP → Test Frameworks, create a new configuration based on Remote Interpreter, set path to autoload and configuration to point to files on remote server:

![PHPUnit](/images/PHPUnit.png)

Click the three dots [...] next to path mappings and set `pressbooks-dev/site` to `/srv/www/pressbooks.test/current`:

![PHP Mappings](/images/PHP-Mappings.png)

Create and run new test configurations with "Test scope: Defined in the configuration file"

![PHPUnit Running](/images/PHPUnit-Running.png)

Troubleshooting: If you have restarted your VM you will see a `PHP Fatal error: require_once(): Failed opening required '/tmp/wordpress-tests-lib/includes/functions.php'` Fix by re-running `bin/install-wp-tests.sh`
