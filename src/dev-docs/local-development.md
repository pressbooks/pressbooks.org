---
title: Local Development
permalink: /dev-docs/local-development/
---

**Table of contents**

- [Ubuntu](#ubuntu)
- [macOS](#mac-os)
- [Windows](#windows)
- [Development Tools](#development-tools)

This document describes how to set up a local development environment for Pressbooks on various operating systems. Following these instructions will give you a local development network of Pressbooks based on [roots/bedrock][1] and [roots/trellis][2], with the following features:

- Unit testing via [PHPUnit][3]
- Code standards evaluation via [PHP_CodeSniffer][4]
- Build tools for plugin assets via [npm][5] and [webpack][6].

## Ubuntu

**Supported Ubuntu versions: 20.04**

### Dependencies

- Install Git: <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>
- Install PHP7.4: <https://computingforgeeks.com/how-to-install-php-on-ubuntu/>
- Install Composer v2: <https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos>
- Install Node.js LTS with NPM: <https://nodejs.org/en/download/>
- Install Virtual Box: <https://www.virtualbox.org/>
- Install Vagrant >2.2.6: <https://www.vagrantup.com/>
- Install Ansible 2.10.7: <https://stackoverflow.com/a/50550017> or <https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-ansible-on-specific-operating-systems/>

Concise directions for installing VirtualBox, Vagrant, and Ansible are available [in the Trellis docs](https://roots.io/docs/getting-started/ubuntu-linux/#working-with-trellis).

### Setup

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

### Configuration

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

### Launch

Open the terminal. Change to the `~/Code/pressbooks-dev/trellis/` directory and run `vagrant up`:

```
cd %HOMEPATH%\\Code\\pressbooks-dev\\trellis
vagrant up
```

Fully provisioning your development environment will take several minutes.

## macOS Intel and Apple Silicon  

### Dependencies

Install [Homebrew][15]:

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

Install [Homebrew Cask][16]:

`brew tap homebrew/cask`

Install the version of Ansible in [requirements.txt]. A specific version can be installed by running:

`pip install ansible==2.10.7`

or to better track the requirements version from the pressbooks/trellis project, download requirements.txt from https://github.com/pressbooks/trellis/blob/master/requirements.txt and then run the following command:
`pip install -r requirements.txt`

### Intel/x86_64 hardware only

On Apple systems running Intel CPUs Virtualbox is a free and open source virtualization platform:

Install [Virtualbox][16]:

`brew install --cask virtualbox`

### Apple Silicon (M1/M2)

For machines running on Apple silicon, virtualbox is not an option, as it it x86 only. Parallels is an option that is known to work (but is not free or open source). Purchase a subscription license for *Parallels Desktop Pro Edition*, and install it as per their instructions. This also requires the [Vagrant Parallels Provider][24]. After Parallels is installed run:

`vagrant plugin install vagrant-parallels`

Edit vagrant.default.yml and comment out the Intel lines, uncomment the M1 lines (so that the Ubuntu image uses the correct archictecture). For M1 these line should be:

`vagrant_box: 'jeffnoxon/ubuntu-20.04-arm64'`
`vagrant_box_version: '>= 1.0.0'`

### Intel and Apple Silicon (continued)

Install [Vagrant][17]:

There is currently a problem with vagrant 2.2.19 on MacOS, which is what is also packaged with Brew. Until this is resolved, fetch it directly from Hashicorp here:

[https://releases.hashicorp.com/vagrant/2.2.18/vagrant_2.2.18_x86_64.dmg][23]

`brew install --cask vagrant`

Install [vagrant-bindfs][18]:

`vagrant plugin install vagrant-bindfs`

Install [vagrant-hostmanager][19]:

`vagrant plugin install vagrant-hostmanager`

Install [Composer][20]:

`brew install composer`

**NOTE**: This will pull in the most current version of PHP that Brew has available, which might not be desirable if you want to run composer on the MacOS side. To install an earlier version of PHP, such as PHP 7.4 exectute the following:

`brew install php@7.4` 

You will also need to change your $PATH in your .bashrc or .zshrc files, depending on what shell you're running.

Install [Node][21] with NPM:

`brew install node`

### MacOS Permissions and nfsd

On recent versionf of MacOS (Catalina and later), the NFS file sharing between the VM and the host OS is broken unless it is granted special permissions. To resove this do the following:

`1. Open system preferences (under the Apple menu)`
`2. Click on 'Security & Privacy'`
`3. Click on 'Privacy' tab`
`4. Find 'Full Disk Access' in the left column`
`5. Unlock the preference panel so that you can make changes (this will require your MacOS password)`
`6. Click '+' to add a program`
`7. Press CMD+Shift+G to browse to a folder`
`8. Go to folder '/sbin'`
`9. Add the nfsd application`
`10. Reboot your Mac`


### Setup

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

### Configuration

The file `~/Code/pressbooks-dev/trellis/group_vars/development/wordpress_sites.yml` reflects your desired local development site URL. It looks like:

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

### Launch

Change to the `~/Code/pressbooks-dev/trellis/` directory and run `vagrant up`:

`cd ~/Code/pressbooks-dev/trellis/ && vagrant up`

You will be required to enter your macOS password at a certain point in the process. Fully provisioning your development environment will take several minutes.

## Windows

### Dependencies

- Install [Git for Windows][22]
- Install PHP7.4
- Install Composer 2
- Install Node.js LTS with NPM: <https://nodejs.org/en/download/>
- Install Virtual Box: <https://www.virtualbox.org/>
- Install Vagrant: <https://www.vagrantup.com/>

At the Command Prompt, install the following Vagrant plugins:

```
vagrant plugin install vagrant-bindfs
vagrant plugin install vagrant-hostmanager
vagrant plugin install vagrant-winnfsd
```

Windows users run Ansible on the VM (since it's running Ubuntu) and not locally. You do not need to install Ansible manually.

### Setup

Start Git Bash _(it comes with Git For Windows)_. Create a directory for your local development environment and `cd` there:

`mkdir ~/Code/pressbooks-dev && cd ~/Code/pressbooks-dev`

Clone [pressbooks/trellis][7] into `~/Code/pressbooks-dev/trellis`:

`git clone git@github.com:pressbooks/trellis.git`

Clone [pressbooks/bedrock][8] or your preferred bedrock into `~/Code/pressbooks-dev/site`:

`git clone git@github.com:pressbooks/bedrock.git site`

The generic Pressbooks bedrock already includes [pressbooks/pressbooks][9], [pressbooks/pressbooks-aldine][10] and [the required themes][11] as Composer dependencies. If you would like to add additional plugins or themes to your local development environment, add them to your Bedrock with `composer require` commands (for more information on this strategy, [see this post][12]). The commands needed to add the Pressbooks SAML SSO plugin, for example, are shown below:

```
cd ~/Code/pressbooks-dev/site
composer.phar require pressbooks/pressbooks-saml-sso:dev-dev
```

### Configuration

The file `~/Code/pressbooks-dev/trellis/group_vars/development/wordpress_sites.yml` reflects your desired local development site URL. It looks like:

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
     packagist_token: <PACKAGIST_TOKEN>
```

Replace `<PACKAGIST_TOKEN>` with your packagist token. It should work out-of-the-box. If you want to setup staging or production environments, you will need to update all instances of `example.com` and `pressbooks.test` in `~/Code/pressbooks-dev/trellis/group_vars/` to a consistent value. For more info, consult the [Trellis docs][13].

### Launch

Trellis for Windows requires Administrator privileges when doing the initial provisioning. If UAC is enabled, make sure the initial `vagrant up` is run from a command prompt with elevated privileges (Run as Administrator).

Start the default Windows Command Prompt (right click, run as Administrator)

Change to the `~/Code/pressbooks-dev/trellis/` directory and run `vagrant up`:

```
cd %HOMEPATH%\\Code\\pressbooks-dev\\trellis
vagrant up
```

Fully provisioning your development environment may take several minutes.

When finished, do a `vagrant halt`, then [kill the NFS server][17] with `taskkill /f /im winnfsd.exe`, then exit the Administrator Command Prompt, then redo `vagrant up` in a regular user privileged Command Prompt.

## Development Tools

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

1. At the command prompt from the Pressbooks plugin directory, e.g. `~/Code/pressbooks-dev/site/web/app/plugins/pressbooks`, run `npm i` or `npm install --no-save pressbooks-build-tools` to install build tools.
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

You may need to regenerate your composer.lock file to resolve merge conflicts before committing changes.

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
[15]: https://brew.sh
[16]: https://www.virtualbox.org/
[17]: https://www.vagrantup.com/
[18]: https://github.com/gael-ian/vagrant-bindfs
[19]: https://github.com/devopsgroup-io/vagrant-hostmanager
[20]: https://getcomposer.org
[21]: https://nodejs.org
[22]: https://gitforwindows.org/
[23]: https://releases.hashicorp.com/vagrant/2.2.18/vagrant_2.2.18_x86_64.dmg
[24]: https://parallels.github.io/vagrant-parallels/docs/
