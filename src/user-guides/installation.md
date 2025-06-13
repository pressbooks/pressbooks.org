---
title: Installation
slug: ''
metaDesc: Instructions for manually installing Pressbooks on your own server.
---
## Manual Installation

1. Download the latest releases of [Pressbooks](https://github.com/pressbooks/pressbooks/releases), [Aldine](https://github.com/pressbooks/pressbooks-aldine/releases) (the default root site theme for Pressbooks), [McLuhan](https://github.com/pressbooks/pressbooks-book/releases) (the default book theme for Pressbooks) and any other plugins or [book themes](https://github.com/search?q=topic:book-theme+org:pressbooks+archived:false&type=Repositories) you wish to install. Check the latest release of Pressbooks for the required versions of PHP and WordPress. Lower versions are not supported.

Follow the instructions provided by WordPress to [install WordPress](https://developer.wordpress.org/advanced-administration/before-install/howto-install/) and [create a WordPress multisite network](https://developer.wordpress.org/advanced-administration/multisite/create-network/)

1. Copy the Pressbooks plugin folder to: `/path/to/your/site/wp-content/plugins/*`.
2. Copy Pressbooks' autoloader file from `/path/to/your/site/wp-content/plugins/pressbooks/hm-autoloader.php` to `/path/to/your/site/wp-content/mu-plugins/hm-autoloader.php`. You may need to create the `wp-content/mu-plugins/` directory if it doesn't yet exist.
3. Copy the Pressbooks Book, Pressbooks Aldine and other theme folders to: `/path/to/your/site/wp-content/themes/*` (**NOTE**: theme folders must not have version numbers on the end. **GOOD**: `pressbooks-aldine`. **BAD**: `pressbooks-aldine-3.1.0`. Make sure that you rename the folders appropriately.)

## Activate Plugins & Themes

1. Log out, log in, navigate to: **My Sites** → **Network Admin** → **Dashboard**.
2. Navigate to **Plugins** → **Installed Plugins**.
3. Network Enable "Pressbooks" and any other plugins you want to you.
4. Navigate to **Themes** → **Installed Themes**.
5. Network Enable "Aldine", "McLuhan", and any other Pressbooks theme you want to use.
6. Navigate to **Your Network Title** → **Dashboard** → **Appearance** and activate "Aldine".

## Server Dependencies

Pressbooks requires some third-party libraries to be installed on your server to enable export capabilities.

- For PDF export, you have two supported options:

1. Download and install [PrinceXML][prince] on your server. Note: Prince is not free software; see their [license agreement](https://www.princexml.com/license/). If you intend to use Prince for commercial purposes, you should [purchase a license](https://www.princexml.com/purchase/).
2. Configure [DocRaptor](https://docraptor.com), a software as a service version of PrinceXML. To do this, obtain a DocRaptor API key and add it to your `wp-config.php`: `define( 'DOCRAPTOR_API_KEY', 'YOUR_API_KEY_HERE' );` 

- For the Cover Generator feature, install:
    - Ghostscript: `sudo apt-get install ghostscript`
    - ImageMagick: `sudo apt-get install imagemagick`
    - PdfToPpm and PdfInfo: `sudo apt-get install poppler-utils`
- To produce EPUB exports, install [EPUBCheck](https://github.com/w3c/epubcheck), an EPUB validation utility used in the export process.
- To produce XML exports, install xmllint: `sudo apt-get install libxml2-utils`
- To include LaTeX expressions in your export files, install install and host the [pb-mathjax service](https://github.com/pressbooks/pb-mathjax?tab=readme-ov-file#installation) (aditional community recommended [install instructions](https://pressbooks.community/t/improved-support-for-mathematical-scientific-notation/4156/4)) or install and network activate the third party WordPress plugin [WP QuickLaTeX](https://wordpress.org/plugins/wp-quicklatex/). 

Note: Some GNU/Linux distributions do not ship with the `php-xsl` and/or `php-exif` libraries enabled by default. If you attempt to export an EPUB file and see a white screen with minimal text or an error, you may need install one or both of these libraries: (e.g. `sudo apt install php-xsl` or `sudo apt install php-exif` )

Note: GNU/Linux distributions do not include Microsoft fonts, which can be useful when producing PDF exports. See https://itsfoss.com/install-microsoft-fonts-ubuntu/ or similar for instructions on installing.

Once the desired dependencies have been installed on your server, define the following `wp-config.php` variables (make sure to update the paths to correspond to your specific installation). The defaults are:

```
define( 'PB_PRINCE_COMMAND', '/usr/bin/prince' ); // Only required if you are using Prince on your server
define( 'PB_EPUBCHECK_COMMAND', '/usr/bin/java -jar /opt/epubcheck/epubcheck.jar' );
define( 'PB_XMLLINT_COMMAND', '/usr/bin/xmllint' );
define( 'PB_MATHJAX_URL', 'http://localhost:3000/' ); 
```

Example config files for a dev site hosted at `http://localhost/~example/` are provided below:

### wp-config.php file [snippet]:

```
    /**
    * - For developers: WordPress debugging mode.
    * - Change this to true to enable the display of notices during development.
    * - We recommend plugin and theme developers use WP_DEBUG in dev environments.
     */

    define('WP_DEBUG', true);
    define('WP_DEBUG_LOG', true);

    // Multi-site support
    define('WP_ALLOW\MULTISITE', true);
    define('MULTISITE', true);
    define('SUBDOMAIN_INSTALL', false);
    $base = '/~example/';
    define('DOMAIN_CURRENT_SITE', 'localhost');
    define('PATH_CURRENT_SITE', '/~example/');
    define('SITE_ID_CURRENT_SITE', 1);
    define('BLOG_ID_CURRENT_SITE', 1);

    // Pressbooks
    define( 'PB_PRINCE_COMMAND', '/usr/bin/prince' );
    define( 'PB_EPUBCHECK_COMMAND', '/usr/bin/java -jar /home/example/bin/epubcheck/epubcheck.jar' );
    define( 'PB_XMLLINT_COMMAND', '/usr/bin/xmllint' );
    define( 'PB_MATHJAX_URL', 'http://localhost:3000/' );

    // Optional definitions
    // define( 'AUTOSAVE_INTERVAL', 60 ); // Autosave every N seconds
    // define( 'WP_POST_REVISIONS', 50 ); // Limit post revisions: int or false
    // define( 'EMPTY_TRASH_DAYS', 1 ); // Purge trash interval. PB default is after 30 days.
    /* That's all, stop editing! Happy blogging. */
```

### Sample .htaccess file:

```
    RewriteEngine On
    RewriteBase /~example/
    RewriteRule ^index.php$ - [L]

    # add a trailing slash to /wp-admin
    RewriteRule ^([_0-9a-zA-Z-]+/)?wp-admin$ $1wp-admin/ [R=301,L]

    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]
    RewriteRule  ^[_0-9a-zA-Z-]+/(wp-(content|admin|includes).\*) $1 [L]
    RewriteRule  ^[_0-9a-zA-Z-]+/(.\*.php)$ $1 [L]
    RewriteRule . index.php [L]
```

## Configure Network Settings & Create Your First Book

1. Navigate to **Network Admin** → **Dashboard** → **Settings** → **Network Settings** and select the most appropriate Registration setting:

- User accounts may be registered. (User accounts can be registered, but these users will not be able to create their own books)
- Logged in users may register new sites. (Network administrators can add new users, who can then create their own books (i.e. sites)
- Both sites and user accounts can be registered. (Allows visitors to your network to create their own accounts and then create their own books without central moderation. If you choose this option, you will want to ensure you have good account and content moderation practices to avoid your network being flooded with spam.)

1. Navigate to **My Books** → **Create a New Book**
2. Fill in the form and click 'Create Book' to create your first book

Consult [our user guide](https://guide.pressbooks.com/) for more details on how to use Pressbooks to create and publish books.
