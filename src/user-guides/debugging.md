---
title: Debugging
slug: ''
metaDesc: Debugging and troubleshooting recommendations for self-hosted network administrators
---
If you are running into issues on your self-hosted Pressbooks network, here are a few suggestions:

1. Make sure you are running the recommended versions of PHP and WordPress.
2. Make sure you have updated Pressbooks and any active plugins and themes to the latest production releases. 
3. Network disable all plugins other than Pressbooks.
4. Switch your book to the “McLuhan” book theme (the Pressbooks default).
5. Add this line to `wp-config.php`: `define( 'WP_ENV', 'development' );` to enable extra debugging features.
6. If you have done each of the previous steps and still can't find the source of your problem, feel free to post a description of your issue in the [DevOps section](https://pressbooks.community/c/devops/15) of the Pressbooks Forum. To increase the likelihood that others will be able to help you, include the contents of your network's diagnostics page (available at `https://YOURNETWORK.URL/wp-admin/options.php?page=pressbooks_diagnostics`) and any steps someone else should follow to reproduce the issue.

## Other helpful tools:

- [Xdebug](https://xdebug.org/) is an excellent tool to help with debugging PHP issues in your IDE.
- [BrowserStack](https://www.browserstack.com/open-source) can help you test the appearance of various changes you've made across multiple devices, operating systems, and browsers. The ability is provides to set up an 'OS + Browser' combination and quickly test changes on local or test environments without runing a virtual machine is particularly useful.
  ![Browserstack logo](https://www.browserstack.com/images/layout/browserstack-logo-600x315.png)
