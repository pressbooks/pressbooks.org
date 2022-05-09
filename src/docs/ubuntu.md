---
title: Local Development on Ubuntu
permalink: /docs/local-development/ubuntu/
---

Following these instructions will give you a local development network of Pressbooks based on [roots/bedrock][1] and [roots/trellis][2], with the following features:

- Unit testing via [PHPUnit][3]
- Code standards evaluation via [PHP_CodeSniffer][4]
- Build tools for plugin assets via [npm][5] and [webpack][6].

## Supported Ubuntu versions

- 20.04

## 1. Dependencies

- Install Git: <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>
- Install PHP7.4: <https://computingforgeeks.com/how-to-install-php-on-ubuntu>
- Install Composer v2: <https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos>
- Install Node.js LTS with NPM: <https://nodejs.org/en/download/>
- Install Virtual Box: <https://www.virtualbox.org/>
- Install Vagrant >=2.2.6: <https://www.vagrantup.com/>
- Install Python 3
- Install Ansible 2.10.7: <https://stackoverflow.com/a/50550017> or https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-ansible-on-specific-operating-systems/>

Concise directions for installing VirtualBox, Vagrant, and Ansible are available [in the Trellis docs](https://roots.io/docs/getting-started/ubuntu-linux/#working-with-trellis).

## 2. Setup

Create a directory for your local development environment and `cd` there:

`mkdir ~/Code/pressbooks-dev && cd ~/Code/pressbooks-dev`

Clone [pressbooks/trellis][7] into `~/Code/pressbooks-dev/trellis`:

`git clone git@github.com:pressbooks/trellis.git`

Clone [pressbooks/bedrock][8] or your preferred bedrock into `~/Code/pressbooks-dev/site`:

`git clone git@github.com:pressbooks/bedrock.git site`

The generic Pressbooks bedrock already includes [pressbooks/pressbooks][9], [pressbooks/pressbooks-aldine][10] and [the required themes][11] as Composer dependencies. If you would like to add additional plugins or themes to your local development environment, add them to your Bedrock with `composer require` commands (for more information on this strategy, [see this post][12]). The commands needed to add the Pressbooks SAML SSO plugin, for example, are shown below:

```
cd ~/Code/pressbooks-dev/site
composer require pressbooks/pressbooks-saml-sso:dev-dev
```

## 3. Configuration

The file `~/Code/pressbooks-dev/trellis/group_vars/development/wordpress_sites.yml` reflects your desired local development site URL.

```
wordpress_sites:
  pressbooks.test:
    site_hosts:
      - canonical: pressbooks.test
        redirects:
          - www.pressbooks.test
    local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
    admin_email: ops@pressbooks.test
    multisite:
      enabled: true
      subdomains: false
    ssl:
      enabled: true
      provider: self-signed
    cache:
      enabled: false
    packagist_token: <PACKAGIST_TOKEN>
```

Replace `<PACKAGIST_TOKEN>` with your packagist token. It should work out-of-the-box. If you want to setup staging or production environments, you will need to update all instances of `example.com` and `pressbooks.test` in `~/Code/pressbooks-dev/trellis/group_vars/` to a consistent value. For more info, consult the [Trellis docs][13].

## 4. Launch

Open the terminal. Change to the `~/Code/pressbooks-dev/trellis/` directory and run `vagrant up`:

```
cd %HOMEPATH%\\Code\\pressbooks-dev\\trellis
vagrant up
```

Fully provisioning your development environment may take up to 30 minutes.

## 5. Development Tools

### Login:

The default Pressbooks username:password is `admin:admin`

### Logs:

Access and error logs are located on the VM in following directory:

`/srv/www/example.com/logs/`

### Unit Testing and Coding Standards

Unit testing in the VM:

```
vagrant ssh
cd /srv/www/example.com/current
bin/install-wp-tests.sh pressbooks_tests pressbooks_test '' 127.0.0.1 latest true
composer test
```

Coding standards in the VM:

```
vagrant ssh
cd /srv/www/example.com/current
composer standards
```

### Asset Building

We use [webpack][6] wrapped in [Laravel Mix][14] to build plugin assets (CSS and JavaScript) for Pressbooks.

1. At the command prompt from the Pressbooks plugin directory, e.g. `~/Code/pressbooks-dev/site/web/app/plugins/pressbooks`, run `npm install --no-save pressbooks-build-tools` to install build tools.
2. To lint your [Javascript](https://eslint.org) and [SCSS](https://stylelint.io) assets, run `npm run lint`.
3. Then, run `npm run build` or `npm run build:production` to build your plugin assets (`npm run build:production` will add a version hash to the asset manifest for browser cache busting).

### Updating Plugins & Themes

In the terminal:

```
cd ~/Code/pressbooks-dev/site
composer update pressbooks/pressbooks --with-dependencies
composer update pressbooks/pressbooks-aldine --with-dependencies
composer update pressbooks/pressbooks-book --with-dependencies
```

### Updating Trellis & Bedrock

To update Trellis, it's best to rename the `origin` remote to `upstream` and check out the `upstream` master branch as a new branch called upstream:

```
~/Code/pressbooks-dev/trellis
git remote rename origin upstream
git checkout -b upstream upstream/master
```

Then any time you wish to update Trellis, you can run the following commands:

```
git checkout upstream && git pull
git checkout master
git merge upstream
```

Then commit the merge.

For Bedrock, follow the same process:

```
~/Code/pressbooks-dev/site
git remote rename origin upstream
git checkout -b upstream upstream/master
```

Then any time you wish to update Bedrock, you can run the following commands:

```
git checkout upstream && git pull
git checkout master
git merge upstream
```

Then commit the merge. You may need to regenerate your composer.lock file before you can commit, as there will often be merge conflicts.

[1]: https://roots.io/bedrock
[2]: https://roots.io/trellis
[3]: https://phpunit.de
[4]: https://github.com/squizlabs/PHP_CodeSniffer
[5]: https://www.npmjs.com/
[6]: https://webpack.github.io
[7]: https://github.com/pressbooks/trellis/
[8]: https://github.com/pressbooks/bedrock/
[9]: https://github.com/pressbooks/pressbooks/
[10]: https://github.com/pressbooks/pressbooks-aldine/
[11]: https://github.com/pressbooks/pressbooks-book/
[12]: https://kizu514.com/blog/php-composer-for-developers/
[13]: https://roots.io/docs/trellis/master/wordpress-sites/
[14]: https://github.com/JeffreyWay/laravel-mix
