---
title: 'Pressbooks 4.5.0, Pressbooks Book 1.12.0, and Clarke 2.1.1'
date: '2017-12-07T12:00'
author: Ned Zimmerman
tags:
  - Changelog
---

We
tagged [Pressbooks 4.5.0](https://github.com/pressbooks/pressbooks/releases/tag/4.5.0), [Pressbooks Book 1.12.0](https://github.com/pressbooks/pressbooks-book/releases/tag/1.12.0),
and [Clarke 2.1.1](https://github.com/pressbooks/pressbooks-clarke/releases/tag/2.1.1) on
GitHub yesterday and deployed them across our hosted networks. Here's what's changed:

### Pressbooks 4.5.0

**NOTICE:** Pressbooks >= 4.5 requires
[PHP 7.0](https://secure.php.net/supported-versions.php) or greater. **NOTICE:**
Pressbooks >= 4.5 requires
[WordPress 4.9.1](https://wordpress.org/news/2017/11/wordpress-4-9-1-security-and-maintenance-release/).

- **[FEATURE]** Switching to a new theme will now update some PDF theme options to match
  the theme's values (see [#456](https://github.com/pressbooks/pressbooks/issues/456),
  [#984](https://github.com/pressbooks/pressbooks/pull/984)).
- **[FEATURE]** Add initial support to PDF and Ebook theme options for themes which skip
  lines between paragraphs by default (see
  [#985](https://github.com/pressbooks/pressbooks/pull/985)).
- **[CORE ENHANCEMENT]** Use standard build tools package
  [pressbooks-build-tools](https://www.npmjs.com/package/pressbooks-build-tools) for asset
  handling, upgrade Stylelint (see
  [#1000](https://github.com/pressbooks/pressbooks/pull/1000)).
- **[CORE ENHANCEMENT]** Require PHP 7.0 or greater (see
  [#935](https://github.com/pressbooks/pressbooks/issues/935),
  [#987](https://github.com/pressbooks/pressbooks/pull/987)).
- **[CORE ENHANCEMENT]** Add exclude and include support to
  `Pressbooks\Utility\rcopy()`(see
  [#990](https://github.com/pressbooks/pressbooks/pull/990)).
- **[CORE ENHANCEMENT]** Improve Theme Lock feature in preparation for Pressbooks 5.0 (see
  [#995](https://github.com/pressbooks/pressbooks/pull/995)).
- **[CORE ENHANCEMENT]** Add Prettier for SCSS and JS formatting (see
  [#991](https://github.com/pressbooks/pressbooks/pull/991)).
- **[CORE ENHANCEMENT]** Optimize subsection parsing (see
  [#992](https://github.com/pressbooks/pressbooks/pull/992)).
- **[CORE ENHANCEMENT]** Optimize `__UNSET__` style (see
  [#999](https://github.com/pressbooks/pressbooks/pull/999)).
- **[CORE ENHANCEMENT]** Optimize unit testing (see
  [#997](https://github.com/pressbooks/pressbooks/pull/997)).
- **[FIX]** Replace 'Sites' with 'Books' throughout Pressbooks interface (see
  [#993](https://github.com/pressbooks/pressbooks/pull/993)).
- **[FIX]** Replace 'Exotic formats' with 'Other formats' on the Export page (see
  [#996](https://github.com/pressbooks/pressbooks/pull/996)).
- **[FIX]** Fix bug related to [#42574](https://core.trac.wordpress.org/ticket/42574)
  which prevented widget editing on the root blog
  ([#998](https://github.com/pressbooks/pressbooks/pull/998)).
- **[FIX]** Fix type mismatch in `\Pressbooks\Licensing` class (see
  [23ee4ff](https://github.com/pressbooks/pressbooks/commit/23ee4ffee60b585d1390690af627c455bf969883))
- **[FIX]** Fix typo in EPUB exporter — the acronym is OEBPS (Open eBook Publication
  Structure) (props [@bdolor](https://github.com/bdolor); see
  [#988](https://github.com/pressbooks/pressbooks/pull/988)).

### Pressbooks Book 1.12.0

- **[CORE ENHANCEMENT]** Updated Ekatra fonts (for the Gujarati language) to the latest
  version.
- **[FIX]** Fixed an issue where invisible parts would appear in the webbook TOC (props to
  Michael Shiflet for the bug report).

### Clarke 2.1.1

- Fixed incorrect fonts in description.
