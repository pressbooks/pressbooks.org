---
title: Debugging
permalink: /user-docs/debugging/
---

A few things you can try:

1. Network disable all plugins other than Pressbooks to see if the problem persists.
2. Switch your book to the “McLuhan” book theme (the Pressbooks default) to see if the problem persists.
3. Add this line to `wp-config.php`: `define( 'WP_ENV', 'development' );` to enable some extra debugging features.

## Other helpful tools:

- [Xdebug](https://xdebug.org/) is an excellent tool to help with debugging PHP issues in your IDE.
- [BrowserStack](https://www.browserstack.com/open-source) can help you test the appearance of various changes you've made across multiple devices, operating systems, and browsers. We especially appreciate its ability to set up an 'OS + Browser' combination and quickly test changes on local or test environments without having to set up and run a virtual machine.
  ![Browserstack logo](https://www.browserstack.com/images/layout/browserstack-logo-600x315.png)
