---
title: Unit Testing
slug: ''
metaDesc: How to install and run the Pressbooks unit testing framework when developing locally.
---
The Pressbooks unit testing framework was built with [WP-CLI](https://make.wordpress.org/cli/handbook/plugin-unit-tests/). The tests run automatically on commit via [GitHub Actions](https://github.com/pressbooks/pressbooks/blob/production/.github/workflows/tests.yml), with more in-depth reporting via [Codecov](https://app.codecov.io/gh/pressbooks/pressbooks).

Tests are in `/tests/*.*`

Tests cover the code in `/inc/*.*`

Please help us [improve code coverage](https://app.codecov.io/gh/pressbooks) in any of our public repositories!

## More info:

- [PHPUnit Assertions](https://docs.phpunit.de/en/9.6/assertions.html)
- [How to Write Testable Code](https://code.tutsplus.com/tutorials/how-to-write-testable-and-maintainable-code-in-php--net-31726)
- [Introduction to WordPress Unit Testing](https://carlalexander.ca/introduction-wordpress-unit-testing/)
