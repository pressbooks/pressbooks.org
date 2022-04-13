---
title: 'Roadmap 2018'
permalink: '/roadmap/roadmap-2018/'
layout: 'layouts/page.njk'
---

### Editing and Content

- ✔ Ensure support for [H5P](https://h5p.org/wordpress) interactive elements with graceful
  fallbacks across all formats
- ✔ Ensure support for video and audio with graceful fallbacks across all formats
- ✔ Extend licensing module to support licensing and attribution of media/attachments
- Expand math (LaTeX/MathML) support, optimizing output for all formats
- Develop an index management tool
- ✔ Develop a glossary management tool
- Add automatic numbering to images and figures
- Add user-facing guidance to the image uploader to ensure high-quality output across all
  formats
- ✔ Add support for multiple contributors (authors, editors, translators, etc.)
- ✔Add granular controls to allow user to hide specific content from the TOC
- Add support for new custom elements in the editor (e.g. columns)
- Add support for book-level endnotes
- Develop a strategy for handling broken links to external content across all formats
- Develop a strategy for versioning/version control of books

### Core Technology

- ✔ Develop criteria and process for whitelisting and
  [recommending plugins](https://github.com/pressbooks/pressbooks-recommended-plugins-server)
  that enhance Pressbooks
- Update HTML and EPUB export routines to
  use [Blade templates](https://laravel.com/docs/5.5/blade) for flexibility and
  maintainability
- Adopt [HTMLBook](https://oreillymedia.github.io/HTMLBook/) as our new base scheme for
  HTML and EPUB exports
- ✔ Add custom metadata support to the Pressbooks REST API and clone tool
- Explore approaches to ensuring compatibility with the new WordPress editor,
  [Gutenberg](https://github.com/WordPress/Gutenberg)
- Add support for authenticated operations over the Pressbooks REST API using
  [JSON Web Tokens](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)
- Expand testing tools, including PHP and Javascript unit testing and front-end testing
  with [Behat](https://pantheon.io/docs/guides/wordpress-automated-testing/)

### Themes and Theme Design

- ✔ Finish our new landing page theme
- ✔ Finish our new webbook theme
- ✔ Improve section heading outputs in EPUB and PDF
- ✔ Improve textbox and table styling across all formats
- ✔ Finalize new theme structure and begin migrating themes
- ✔ Develop two new themes oriented towards textbook and OER use cases

### Import, Export, and Cloning

- Switch default EPUB export format to EPUB3
- Refactor and improve Word and ODT import and export
- ✔ Add support for chapter-level cloning
- Add support for chapter-level exports
- Improve support for PDF print profile
- Add support for authenticated cloning from private Pressbooks instances
- Add support for metadata outputs (MARC, ONIX, etc.)
- Add support for cloning a collection of books
- ✔ Add support for Common Cartridge import and export

### User Interface

- ✔ Overhaul the Organize page, prioritizing accessibility, fully responsive design, and
  inline and batch editing support of front matter/chapter/back matter properties
- Review WordPress’ default user roles and capabilities from a book publishing
  perspective, with possible modifications/new roles to be determined
- Investigate methods for providing book-level analytics on networks where books are in
  subdirectories as opposed to subdomains
- Enhance the cloning, import, and export interfaces to provide realtime feedback
  throughout clone, import, and export operations

### Accessibility and Inclusivity

- Integrate the Fluid Project’s
  [Preferences Framework](https://fluidproject.org/projects.html) into our root and book
  themes for improved front-end accessibility
- Add user interface prompts for authors to help guide them towards creating accessible
  content
- ✔ Implement improvements across the Pressbooks UI based on an accessibility audit
- ✔ Work towards accessibility certification ([AODA](http://www.aoda.ca/) and others)
