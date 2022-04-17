---
title: Debugging
permalink: /docs/debugging/
---

A few things you can try:

1.  Add this line to `wp-config.php`: `define( 'WP_ENV', 'development' );` (this will enable some debugging features and outputs that are not enabled in production environments).
2.  Network disable all plugins other than Pressbooks, then see if the problem persists.
3.  Switch your book to the “McLuhan” book theme (the Pressbooks default), then see if the problem persists.

### Other helpful tools:

If you're looking for a tool to help you with debugging PHP issues, many members of our team use [Xdebug](https://xdebug.org/).

If you're trying to test the appearance of various changes you've made across multiple devices, operating systems, or browsers, consider [BrowserStack](https://www.browserstack.com/open-source). One of our favorite features is the ability to setup an 'OS + Browser' and then test your local environment with just one config (and without having to set up and run a virtual machine!).  
![Browserstack logo](https://www.browserstack.com/images/layout/browserstack-logo-600x315.png)
