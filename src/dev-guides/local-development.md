---
title: Local Development
slug: ''
metaDesc: ''
---

To set up a local instance of Pressbooks, use the setup steps in our [local-dev-environment](https://github.com/pressbooks/local-dev-environment?tab=readme-ov-file#setup-steps) repo. This approach uses Lando/Docker to to provision a local instance of Pressbooks for testing and development by open source contributors. This method will provide you with

- Unit testing via [PHPUnit](https://phpunit.de)
- Code standards evaluation via [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer)
- Build tools for plugin assets via [npm](https://www.npmjs.com/)

Note: This repo should not be deployed to production environments.

This repo already includes [pressbooks/pressbooks](https://github.com/pressbooks/pressbooks/), [pressbooks/pressbooks-aldine](https://github.com/pressbooks/pressbooks-aldine/), [pressbooks/pressbook-book](https://github.com/pressbooks/pressbooks-book/) and a few other open source Pressbooks themes and plugins as Composer dependencies. If you would like to add additional plugins or themes to your local development environment, add them with the relevant [`composer require`](https://getcomposer.org/doc/03-cli.md#require-r) commands. For example, if you wanted to add the H5P plugin, you could use:

```
composer require wpackagist-plugin/h5p
```

## Development Tools

### Login:

The default Pressbooks username:password provided in the sample database is `admin:admin`

### Logs:

Access and error logs are located on the VM in following directory:

`/srv/www/example.com/logs/`

### Unit Testing and Coding Standards

Unit testing in the VM:

```
lando composer test
```

Read more about [Unit Testing in Pressbooks](/dev-guides/coding-standards/)

Coding standards in the VM:

```
lando composer standards
```

### Asset Building

We use [webpack](https://webpack.github.io) wrapped in [Laravel Mix](https://github.com/JeffreyWay/laravel-mix) to build plugin assets (CSS and JavaScript) for Pressbooks.

1. At the command prompt from the Pressbooks plugin directory, e.g. `~/web/app/plugins/pressbooks`, run `npm i` or `npm install --no-save pressbooks-build-tools` to install build tools.
2. To lint your [Javascript](https://eslint.org) and [SCSS](https://stylelint.io) assets, run `npm run lint`.
3. Then, run `npm run build` or `npm run build:production` to build your plugin assets (`npm run build:production` will add a version hash to the asset manifest for browser cache busting).

### Updating Plugins & Themes

In the terminal:

```
composer update pressbooks/pressbooks --with-dependencies
composer update pressbooks/pressbooks-aldine --with-dependencies
composer update pressbooks/pressbooks-book --with-dependencies
```