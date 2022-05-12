---
title: Installation
permalink: user-docs/installation/
---

## Downloads

Download the latest releases of [Pressbooks][pressbooks], [McLuhan][mcluhan], and [Aldine][aldine], as well as the latest releases of any other [book themes][book-themes] you wish to install.

## Installation (Manual)

::: danger IMPORTANT!

- Do not install Pressbooks on an existing WordPress blog -- create a new WordPress install instead.
- Pressbooks works with [PHP 7.4][php] and _(usually)_ the most recent version of WordPress right now. Lower versions are not supported.
  :::

### Part 1: WordPress

1. Install WordPress using the [Famous 5-Minute Install][wp-install].

2. [Create a Network][create-a-network] of WordPress sites, i.e.:

3. Edit the `wp-config.php` file and add the following:

```
define('WP_ALLOW_MULTISITE', true);
```

4. Login to the WordPress admin area. Navigate to **Tools** → **Network Setup**, click **Install**.

5. Complete the steps printed on the screen (i.e. edit your `wp-config.php` and `.htaccess` files with the information provided).

### Part 2: Pressbooks

1. Copy the Pressbooks plugin folder to: `/path/to/your/site/wp-content/plugins/*`.

2. Copy Pressbooks' autoloader file from `/path/to/your/site/wp-content/plugins/pressbooks/hm-autoloader.php` to `/path/to/your/site/wp-content/mu-plugins/hm-autoloader.php`. You may need to create the `wp-content/mu-plugins/` directory if it doesn't yet exist.

3. Copy the Pressbooks Book, Pressbooks Aldine and other theme folders to: `/path/to/your/site/wp-content/themes/*` (**NOTE**: theme folders must not have version numbers on the end. **GOOD**: `pressbooks-aldine`. **BAD**: `pressbooks-aldine-3.1.0`. Make sure that you rename the folders appropriately.)

4. Log out, log in, navigate to: **My Sites** → **Network Admin** → **Dashboard**.

5. Navigate to **Plugins** → **Installed Plugins**.

6. Network Enable "Pressbooks".

7. Navigate to **Themes** → **Installed Themes**.

8. Network Enable "Aldine", "McLuhan", and any other Pressbooks theme you want to use.

9. Navigate to **Settings** → **Network Settings**.

10. Pick the most appropriate Registration setting:

    - User accounts may be registered. (We recommend that you avoid this setting, as users will not be able to create new books!)
    - Logged in users may register new sites. (If you are a publisher using Pressbooks as a production tool, this is the recommended setting: it allows network administrators to add new users, who can then create books/sites. However, registration is not available to the public.)
    - Both sites and user accounts can be registered. (Be careful about selecting this option, as it allows both public account registration and book creation. You will likely need to have good account and content moderation practices to avoid your network being flooded with spam.)

11. Navigate to **Your Network Title** → **Dashboard** → **Appearance** and activate "Aldine".

12. Navigate to **My Catalog** → **Your Site** → **Dashboard**

13. Navigate to **My Catalog** → **Add A New Book** (this will be your first book).

14. Navigate to **My Catalog** → **Your First Book** → **Dashboard**.

15. Navigate to **Book Info**. Make sure to fill out Title, Author and Publication Date.

16. Navigate to **Text** → **Organize**. Make sure some content is selected for export.

### Part 3: Pressbooks Dependencies

Pressbooks requires some third-party libraries to be installed on your server to enable export capabilities.

- For PDF export, you have two supported options:
  1. Install [PrinceXML][prince] 12 on your server (note: this is not free software, although you can use it free of charge for non-commercial purposes. See their license for details).
  2. Configure [DocRaptor](https://docraptor.com), a software as a service version of PrinceXML. To do this, obtain and add a DocRaptor API key to `wp-config.php`: `define( 'DOCRAPTOR_API_KEY', 'YOUR_API_KEY_HERE' );`
     Note: the mPDF for Pressbooks plugin uses the open source mPDF library, but is [no longer being maintained](https://github.com/pressbooks/docs/issues/32#issuecomment-503255424) by its creators. Use it at your own risk.
- For EPUB validation install [EpubCheck][epub-check]
- For XML validation install xmllint: `sudo apt-get install libxml2-utils`
- For ODT export install [Saxon-HE][saxon] 9.7.0-10
- For the Cover Generator feature, install:
  - Ghostscript: `sudo apt-get install ghostscript`
  - ImageMagick: `sudo apt-get install imagemagick`
  - PdfToPpm and PdfInfo: `sudo apt-get install poppler-utils`
- For MathJax export install (and host!) master branch of [pb-mathjax][pb-mathjax]
- Certain Linux installations do not ship with the `php-xsl` library enabled by default. If you attempt to export an ePub and get either a white screen with minimal text, or a "Fatal error: Class 'XSLTProcessor' not found" error, you may need install this library (e.g. `sudo apt-get install php-xsl`).
- Certain Linux installations do not ship with the `php-exif` library enabled by default. If you attempt to export an ePub and get either a white screen with minimal text, or an error, you may need to install this library (e.g. `sudo apt-get install php-exif` )
- Linux installations do not ship with Microsoft fonts, which can be useful when producing PDF exports. See https://itsfoss.com/install-microsoft-fonts-ubuntu/ or similar for instructions on installing.

Unlisted versions are not supported. Upgrade/downgrade accordingly.

Once installed, define the following `wp-config.php` variables (make sure to update the paths to correspond to your specific installation). The defaults are:

    define( 'PB_PRINCE_COMMAND', '/usr/bin/prince' ); // Only required if you are using Prince on your server
    define( 'PB_EPUBCHECK_COMMAND', '/usr/bin/java -jar /opt/epubcheck/epubcheck.jar' );
    define( 'PB_XMLLINT_COMMAND', '/usr/bin/xmllint' );
    define( 'PB_SAXON_COMMAND', '/usr/bin/java -jar /opt/saxon-he/saxon-he.jar' );
    define( 'PB_MATHJAX_URL', 'http://localhost:3000/' );

Example config files for a dev site hosted at `http://localhost/~example/textopress/`

### wp-config.php file [snippet]:

    /**
     * For developers: WordPress debugging mode.
     *
     * Change this to true to enable the display of notices during development.
     * It is strongly recommended that plugin and theme developers use WP_DEBUG
     * in their development environments.
     */
    define('WP_DEBUG', true);
    define('WP_DEBUG_LOG', true);

    /**
     * Multi-site support, Part 1
     */
    define('WP_ALLOW_MULTISITE', true);

    /**
     * Multi-site support, Part 2
     */
    define('MULTISITE', true);
    define('SUBDOMAIN_INSTALL', false);
    $base = '/~example/textopress/';
    define('DOMAIN_CURRENT_SITE', 'localhost');
    define('PATH_CURRENT_SITE', '/~example/textopress/');
    define('SITE_ID_CURRENT_SITE', 1);
    define('BLOG_ID_CURRENT_SITE', 1);

    /**
     * Pressbooks
     */
    define( 'PB_PRINCE_COMMAND', '/usr/bin/prince' );
    define( 'PB_EPUBCHECK_COMMAND', '/usr/bin/java -jar /home/example/bin/epubcheck/epubcheck.jar' );
    define( 'PB_XMLLINT_COMMAND', '/usr/bin/xmllint' );
    define( 'PB_SAXON_COMMAND', '/usr/bin/java -jar home/example/bin/saxon-he/saxon-he.jar' );
    define( 'PB_MATHJAX_URL', 'http://localhost:3000/' );

    /**
     * Optional definitions
     */
    // define( 'AUTOSAVE_INTERVAL', 60 ); // Autosave every N seconds
    // define( 'WP_POST_REVISIONS', 5 ); // Limit post revisions: int or false
    // define( 'EMPTY_TRASH_DAYS', 1 ); // Purge trash interval. PB default is after 30 days.

    /* That's all, stop editing! Happy blogging. */

### .htaccess file:

    RewriteEngine On
    RewriteBase /~example/textopress/
    RewriteRule ^index.php$ - [L]

    # add a trailing slash to /wp-admin
    RewriteRule ^([_0-9a-zA-Z-]+/)?wp-admin$ $1wp-admin/ [R=301,L]

    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]
    RewriteRule  ^[_0-9a-zA-Z-]+/(wp-(content|admin|includes).*) $1 [L]
    RewriteRule  ^[_0-9a-zA-Z-]+/(.*.php)$ $1 [L]
    RewriteRule . index.php [L]

::: tip
Need a wp-cli deploy? Start here: https://github.com/pressbooks/snippets/blob/master/deploying/wp-cli-example.md
:::

[pressbooks]: https://github.com/pressbooks/pressbooks
[mcluhan]: https://github.com/pressbooks/pressbooks-book
[aldine]: https://github.com/pressbooks/pressbooks-aldine/
[book-themes]: https://github.com/search?q=topic:book-theme%20org:pressbooks&type=Repositories
[php]: https://secure.php.net/supported-versions.php
[wp-install]: http://codex.wordpress.org/Installing_WordPress
[create-a-network]: http://codex.wordpress.org/Create_A_Network
[prince]: https://www.princexml.com/
[epub-check]: https://github.com/w3c/epubcheck
[xmllint]: https://askubuntu.com/questions/1382254/i-need-to-install-xmllint-but-dont-know-how-to
[saxon]: https://sourceforge.net/projects/saxon/files/Saxon-HE/
[pb-mathjax]: https://github.com/pressbooks/pb-mathjax
