---
title: Unit Testing
slug: ''
metaDesc: How to install and run the Pressbooks unit testing framework when developing locally.
---
The Pressbooks unit testing framework was built with [WP-CLI](https://make.wordpress.org/cli/handbook/plugin-unit-tests/). The tests run automatically on commit via [GitHub Actions](https://github.com/pressbooks/pressbooks/blob/production/.github/workflows/tests.yml), with more in-depth reporting via [Codecov](https://app.codecov.io/gh/pressbooks/pressbooks).

To run the tests locally, make sure PHPUnit is installed, then do:

    cd /path/to/wordpress/wp-content/plugins/pressbooks
    bash bin/install-wp-tests.sh wordpress\_test DBUSER DBPASS localhost latest
    phpunit

- Replace `/path/to` with your path.
- `wordpress_test` is the name of a new test database (**all data will be deleted!**)
- `DBUSER` is your MySQL user name
- `DBPASS` is your MySQL user password
- `localhost` is your MySQL host
- `latest` is the WordPress version; could also be `6.7`, `6.8.1` etc.

The bash script installs a copy of WordPress and the WordPress unit testing tools in`/tmp`. It then creates a new tests database to be used while running tests. The bash script can be run multiple times without errors, but it will _not_ overwrite previously existing files.

Tests are in `/tests/*.*`

Tests cover the code in `/inc/*.*`

Please help us [improve code coverage](https://app.codecov.io/gh/pressbooks) in any of our public repositories!

## More info:

- [PHPUnit Assertions](https://docs.phpunit.de/en/9.6/assertions.html)
- [How to Write Testable Code](https://code.tutsplus.com/tutorials/how-to-write-testable-and-maintainable-code-in-php--net-31726)
- [Introduction to WordPress Unit Testing](https://carlalexander.ca/introduction-wordpress-unit-testing/)
