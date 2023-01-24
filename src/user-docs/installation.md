---
title: Installation
permalink: /user-docs/installation/
---

## Manual Installation

1. Download the latest releases of [Pressbooks][pressbooks], [McLuhan][mcluhan], and [Aldine][aldine], as well as the latest releases of any other [book themes][book-themes] you wish to install. Check the [latest release of Pressbooks](https://github.com/pressbooks/pressbooks/blob/4e79e21333b3ca0df257057c06b92c94b73a6d9b/pressbooks.php#L9-L10) for the required versions of PHP and WordPress. Lower versions are not supported.
1. Follow the instructions provided by WordPress to [install WordPress][wp-install] and [create a WordPress multisite network][create-a-network]
1. Copy the Pressbooks plugin folder to: `/path/to/your/site/wp-content/plugins/*`.
1. Copy Pressbooks' autoloader file from `/path/to/your/site/wp-content/plugins/pressbooks/hm-autoloader.php` to `/path/to/your/site/wp-content/mu-plugins/hm-autoloader.php`. You may need to create the `wp-content/mu-plugins/` directory if it doesn't yet exist.
1. Copy the Pressbooks Book, Pressbooks Aldine and other theme folders to: `/path/to/your/site/wp-content/themes/*` (**NOTE**: theme folders must not have version numbers on the end. **GOOD**: `pressbooks-aldine`. **BAD**: `pressbooks-aldine-3.1.0`. Make sure that you rename the folders appropriately.)

## Activate Plugins & Themes

1. Log out, log in, navigate to: **My Sites** → **Network Admin** → **Dashboard**.
1. Navigate to **Plugins** → **Installed Plugins**.
1. Network Enable "Pressbooks".
1. Navigate to **Themes** → **Installed Themes**.
1. Network Enable "Aldine", "McLuhan", and any other Pressbooks theme you want to use.
1. Navigate to **Your Network Title** → **Dashboard** → **Appearance** and activate "Aldine".

## Server Dependencies

Pressbooks requires some third-party libraries to be installed on your server to enable export capabilities.

- For PDF export, you have two supported options:
  1. Download and install [PrinceXML][prince] on your server. Note: Prince is not free software; see their [license agreement](https://www.princexml.com/license/). If you intend to use Prince for commercial purposes, you should [purchase a license](https://www.princexml.com/purchase/).
  2. Configure [DocRaptor](https://docraptor.com), a software as a service version of PrinceXML. To do this, obtain and add a DocRaptor API key to `wp-config.php`: `define( 'DOCRAPTOR_API_KEY', 'YOUR_API_KEY_HERE' );` Note: the free and open source [mPDF for Pressbooks plugin](https://github.com/BCcampus/pressbooks-mpdf) uses the open source mPDF library to generate PDFs, but is [no longer being maintained](https://github.com/pressbooks/docs/issues/32#issuecomment-503255424). Use it at your own risk.
- For the Cover Generator feature, install:
  - Ghostscript: `sudo apt-get install ghostscript`
  - ImageMagick: `sudo apt-get install imagemagick`
  - PdfToPpm and PdfInfo: `sudo apt-get install poppler-utils`
- For EPUB validation install [EPUBCheck][epub-check]
- For XML validation install xmllint: `sudo apt-get install libxml2-utils`
- For ODT export install [Saxon-HE][saxon] 9.7.0-10
- For export of LaTeX expressions (i.e. mathematical formula), install and network activate the third party WordPress plugin {WP QuickLaTeX](https://wordpress.org/plugins/wp-quicklatex/) or install and host the production branch of [pb-mathjax][pb-mathjax].

Note: Certain GNU/Linux distributions do not ship with the `php-xsl` and/or `php-exif` libraries enabled by default. If you attempt to export an EPUB file and get either a white screen with minimal text, or an error, you may need install one or both of these libraries: (e.g. `sudo apt install php-xsl` or `sudo apt install php-exif` )

Note: GNU/Linux distributions do not include Microsoft fonts, which can be useful when producing PDF exports. See https://itsfoss.com/install-microsoft-fonts-ubuntu/ or similar for instructions on installing.

Once the desired dependencies have been installed on your server, define the following `wp-config.php` variables (make sure to update the paths to correspond to your specific installation). The defaults are:

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

## Configure Network Settings & Create Your First Book

1. Navigate to **Network Admin** → **Dashboard** → Settings** → **Network Settings\*\* and select the most appropriate Registration setting:
   - User accounts may be registered. (User accounts can be registered, but these users will not be able to create their own books)
   - Logged in users may register new sites. (Network administrators can add new users, who can then create their own books (i.e. sites)
   - Both sites and user accounts can be registered. (Allows visitors to your network to create their own accounts and then create their own books without central moderation. If you choose this option, you will likely need to have good account and content moderation practices to avoid your network being flooded with spam.)
1. Navigate to **My Books** → **Create a New Book**
1. Fill in the form and click 'Create Book' to create your first book

Consult [our user guide](https://guide.pressbooks.com/) for more details on how to use Pressbooks to create and publish books.

[pressbooks]: https://github.com/pressbooks/pressbooks
[mcluhan]: https://github.com/pressbooks/pressbooks-book
[aldine]: https://github.com/pressbooks/pressbooks-aldine/
[book-themes]: https://github.com/search?q=topic:book-theme%20org:pressbooks&type=Repositories
[php]: https://secure.php.net/supported-versions.php
[wp-install]: https://wordpress.org/documentation/article/how-to-install-wordpress/
[create-a-network]: https://wordpress.org/documentation/article/create-a-network/
[prince]: https://www.princexml.com/download/
[epub-check]: https://github.com/w3c/epubcheck
[xmllint]: https://askubuntu.com/questions/1382254/i-need-to-install-xmllint-but-dont-know-how-to
[saxon]: https://sourceforge.net/projects/saxon/files/Saxon-HE/
[pb-mathjax]: https://github.com/pressbooks/pb-mathjax
