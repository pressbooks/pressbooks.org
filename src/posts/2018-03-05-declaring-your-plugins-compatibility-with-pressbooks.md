---
title: "Declaring your plugin's compatibility with Pressbooks"
date: '2018-03-05T12:00'
---

Last summer, [WooCommerce](https://woocommerce.com) introduced a
[new feature](https://woocommerce.wordpress.com/2017/08/28/new-version-check-in-woocommerce-3-2/)
in version 3.2 of their core plugin: compatibility alerts for installed add-on plugins
when new versions of WooCommerce became available. By adding a line to the plugin headers
of a WooCommerce add-on, developers could let users know the most recent version of
WooCommerce with which they'd tested their plugin.

We really liked this idea, so [Dac](https://github.com/connerbw) built a similar
[feature](https://github.com/pressbooks/pressbooks/pull/1115) into Pressbooks 5. Now, when
future updates to Pressbooks show up on the plugins page of a Pressbooks, users will see
whether or not their Pressbooks-specific add-ons have been tested with the latest version:

![Plugin compatibility notice](https://pressbooks.org/app/uploads/2018/03/Screen-Shot-2018-03-05-at-10.00.37-AM.png)

If you develop plugins that extend Pressbooks functionality (we check for `pressbooks` in
the plugin slug, name, and description), you can add `Pressbooks tested up to: 5.0.0` (or
whatever version string is relevant) to your plugin headers, and Pressbooks will reflect
your plugin's compatibility in the update notice. We hope this feature will give network
administrators a better understanding at a glance of whether they can safely update to the
latest version of Pressbooks. Of course, we still encourage thorough testing in a
development or staging environment before installing a major update.
