---
title: 'Roadmap 2017'
layout: 'layouts/page.njk'
permalink: /roadmap/roadmap-2017/
---

Pressbooks is an open source web-based content management system and export platform,
built specifically for books.

This document outlines a development roadmap for Pressbooks, in an effort to clarify its
direction, and foster more engagement from the community of Pressbooks users and
developers.

## Pressbooks Usecase: Education

While Pressbooks has been used in a broad range of applications, from self-published
novels, to corporate white papers, the area where Pressbooks has made the most impact is
in education, where Pressbooks has been used to produce textbooks, course packs,
monographs, syllabi, among other things.

In particular, the Open Textbook movement has embraced Pressbooks, and Pressbooks has been
used by such well-known Open Textbooks projects as: [BCcampus](https://open.bccampus.ca/),
[The University of Minnesota Open Textbook Library](https://open.umn.edu/opentextbooks/),
and [OpenSUNY](http://navigator.suny.edu/).

The focus of Pressbooks development over the next year will be on features supporting the
needs of Open Textbooks, and educational applications more broadly.

## Broad Areas of Development Focus

To this end we have identified several broad areas of development focus:

#### 1\. Improvements to Development and Deployment Processes

**Objective:** As Pressbooks is used more broadly in more robust applications, the
underlying development and management processes for Pressbooks systems should be
modernized and made robust.

Specific features include:

- Dependency management ([Composer](https://getcomposer.org))
- Build tools for asset handling (currently [Bower](https://bower.io) and
  [Gulp](http://gulpjs.com))
- Expanded unit testing ([PHPUnit](https://phpunit.de) and
  [QUnit](https://qunitjs.com)) \*
- Clarified
  [contribution guidelines](https://github.com/pressbooks/pressbooks/blob/dev/.github/CONTRIBUTING.md)
- Intuitive implementation of plugins to enhance core functionality
- Better management of Pressbooks development, staging and production environments (using
  [Vagrant](https://vagrantup.com) for local development and
  [Ansible](https://ansible.com) for provisioning)

#### 2\. Metadata

**Objective:** Increase discoverability of Pressbooks books, and to provide standardized
data so that libraries, aggregators, stores and others can easily incorporate Pressbooks
books in their catalogs.

Specific features include:

- Build a system for:
  - Extending current metadata inputs
  - Taking a coherent approach to multiple metadata output feeds which meet various
    standards
- Make metadata outputs available at book and network level
- enhance book-level metadata to capture more metadata, standards \*
- support for component level license information (e.g. media) \*
- generate metadata feeds in standard formats: ONIX, OPDS, MARC, others

#### 3\. APIs

**Objective:** Increase the ability of other networked systems to plug in to Pressbooks
book content, and the editing interface, for instance to add tools for better
collaboration.

Specific features/tasks include:

- Migrate the existing PB API to use the [WordPress REST API](https://v2.wp-api.org) as a
  foundation
- Expose metadata (above) through a clearly defined API
- Clearly identify (and build out, where real use cases exist) other hooks/functions where
  other services can plug into Pressbooks

#### 4\. Sharing and Cloning of Pressbooks Content

**Objective:** Increase the portability and adaptability of Pressbooks content.

Specific features/tasks include:

- Make it easy to clone any Pressbooks book, within a Pressbooks instance, or to another
  Pressbooks instance, bringing license info and attribution with it
- Make it easy to pull any Pressbooks chapter into another Pressbooks book (within an
  instance, or to another Pressbooks instance, bringing license info and attribution with
  it

#### 5\. Editing and Content Features

**Objective:** Add more features to support specific academic content needs.

Specific features/tasks include:

- Indexing features
- Glossary features
- Integration of reference tools (e.g. [Zotero](https://www.zotero.org))
- Improve LaTeX/mathematics tools
- MathML integration (under consideration)
- Mathjax integration (under consideration)

#### 6\. Theme Design

**Objective:** Make Pressbooks themes (web, EPUB, MOBI, PDF) better suited to textbooks.

Specific features/tasks include:

- Standardize theme structure to better leverage SCSS
- Build and release more textbook-like themes
- Revamp the standard web-based themes to better support academic features \*

#### 7\. Version Control/Edition management

**Objective:** As cloned and modified versions of Open Textbooks proliferate, we need a
sensible versioning system.

Specific features/tasks include:

- Research and assess various version control approaches
- Build a mechanism to track & trace different versions of a Pressbooks book, and diffs
  (see Git model)

#### 8\. Export Format Improvements

**Objectives:** More and better export formats.

Specific features/tasks include:

- Support for Common Cartridge export
- Improved ODT export
- Replace EPUB2.01 with EPUB3.1
- Explore Portable Web Publications format \*

#### 9\. Collaboration Tools

**Objectives:** Make collaboration on Open Textbooks easier.

Specific features/tasks might include:

- Investigate lightweight mechanisms to integrate more collaboration tools (e.g.
  [Slack](http://www.wpbeginner.com/plugins/how-to-integrate-slack-with-wordpress/))

#### 10\. Accessibility & Inclusivity

**Objectives:** Make Pressbooks more accessible and inclusive for authors and readers.

Specific features/tasks include:

- Conduct audit of the administration interface \*
- Conduct audit of the web book theme and root theme interfaces \*
- Integrate the IDRC Fluid Project’s display preferences tool \*
- Assess potential tools to review books for accessibility and inclusivity

_\* indicates a task that is still in progress_
