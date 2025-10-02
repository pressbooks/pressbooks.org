---
title: Installation
slug: ''
metaDesc: Instructions for manually installing Pressbooks on your own server.
---

## Server Dependencies

Pressbooks is free and open source software and can be hosted on your own server. We strongly recommend anyone installing Pressbooks on a production server to use a properly configured Bedrock. We maintain a [sample Bedrock with instructions](https://github.com/pressbooks/pressbooksoss-bedrock?tab=readme-ov-file#installing-pressbooks-on-a-production-server) that you are welcome to use when installing Pressbooks on your own server. 

In addition to the Pressbooks plugins and themes included in the sample Bedrock, Pressbooks requires some third-party libraries to be installed on your server to enable export capabilities.

- For the Cover Generator feature, install:
  - Ghostscript: `sudo apt-get install ghostscript`
  - ImageMagick: `sudo apt-get install imagemagick`
  - PdfToPpm and PdfInfo: `sudo apt-get install poppler-utils`
- For PDF export, you have two supported options:
  1. Download and install [PrinceXML](https://www.princexml.com/download/) on your server. Note: Prince is not free software; see their [license agreement](https://www.princexml.com/license/). If you intend to use Prince for commercial purposes, you should [purchase a license](https://www.princexml.com/purchase/).
  2. Configure [DocRaptor](https://docraptor.com), a software as a service version of PrinceXML. To do this, obtain and add a DocRaptor API key to the .env file in your Bedrock. 
  Note: the free and open source [mPDF for Pressbooks plugin](https://github.com/BCcampus/pressbooks-mpdf) uses the open source mPDF library to generate PDFs, but is [no longer being maintained](https://github.com/pressbooks/docs/issues/32#issuecomment-503255424). Use it at your own risk.
  
  Note: GNU/Linux distributions do not include Microsoft fonts, which can be useful when producing PDF exports. See https://itsfoss.com/install-microsoft-fonts-ubuntu/ or similar for instructions on installing.
- For EPUB validation install [EPUBCheck](https://github.com/w3c/epubcheck): `sudo apt-get install epubcheck`. Note: Certain GNU/Linux distributions do not ship with the `php-xsl` and/or `php-exif` libraries enabled by default. If you attempt to export an EPUB file and get either a white screen with minimal text, or an error, you may need install one or both of these libraries: (e.g. `sudo apt install php-xsl` or `sudo apt install php-exif` )
- For XML validation install xmllint: `sudo apt-get install libxml2-utils`
- To add images of mathematical formula in export files, install and host the production branch of [pb-mathjax][pb-mathjax] or use the third party [WP QuickLaTeX](https://wordpress.org/plugins/wp-quicklatex/) plugin.

### Sample .htaccess file:

    RewriteEngine On
    RewriteBase /~example/yourdomain/
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
   - Logged in users may register new sites. (Network administrators can add new users, who can then create their own books (i.e. sites))
   - Both sites and user accounts can be registered. (Allows visitors to your network to create their own accounts and then create their own books without central moderation. If you choose this option, you will likely need to have good account and content moderation practices to avoid your network being flooded with spam.)
1. Navigate to **My Books** → **Create a New Book**
1. Fill in the form and click 'Create Book' to create your first book

Consult [our user guide](https://guide.pressbooks.com/) for more details on how to use Pressbooks to create and publish books.