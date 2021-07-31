---
title: "Pressbooks 4.1 and Pressbooks Book 1.10"
date: "2017-08-21"
tags: 
  - Changelog
---

We tagged [Pressbooks 4.1.0](https://github.com/pressbooks/pressbooks/releases/tag/4.1.0) and [Pressbooks Book 1.10.0](https://github.com/pressbooks/pressbooks-book/releases/tag/1.10.0) on GitHub on Friday and we're deploying them across our hosted networks today. Here's what's changed:

### Pressbooks 4.1

**NOTICE:** Pressbooks 4.1 requires [WordPress 4.8.1](https://wordpress.org/news/2017/08/wordpress-4-8-1-maintenance-release/).

- **Feature:** Cloning! Clone any public, properly-licensed book from any Pressbooks 4.1 network including your own (super admins can clone any book from their own network, regardless of license) (see [#841](https://github.com/pressbooks/pressbooks/issues/841), [#857](https://github.com/pressbooks/pressbooks/pull/857 "Cloning v1 (fixes #841)"), [#881](https://github.com/pressbooks/pressbooks/pull/881), [#885](https://github.com/pressbooks/pressbooks/pull/885)).
- **Feature:** Granular display controls for content licenses at the book and section level (see [#805](https://github.com/pressbooks/pressbooks/issues/805), [#867](https://github.com/pressbooks/pressbooks/pull/867), [#873](https://github.com/pressbooks/pressbooks/pull/873), [#883](https://github.com/pressbooks/pressbooks/pull/883), [#884](https://github.com/pressbooks/pressbooks/pull/884)).
- **Feature:** Word count for the entire book and for content marked for export is now displayed on the Organize page (see [#842](https://github.com/pressbooks/pressbooks/issues/842 "Word count"), [#878](https://github.com/pressbooks/pressbooks/pull/878), [#880](https://github.com/pressbooks/pressbooks/pull/880)).
- **Feature:** Users can now delete their own books from the book menu (see [#845](https://github.com/pressbooks/pressbooks/issues/845), [#864](https://github.com/pressbooks/pressbooks/pull/864)).
- **Feature:** Custom taxonomies are now available in the Pressbooks REST API v2 (see [#851](https://github.com/pressbooks/pressbooks/issues/851), [#853](https://github.com/pressbooks/pressbooks/pull/853)).
- **Feature:** The Schema.org [isBasedOn](http://bib.schema.org/isBasedOn) property is now saved in metadata and displayed in the Pressbooks REST API v2 (see [#850](https://github.com/pressbooks/pressbooks/issues/850 "Add isBasedOn property to metadata"), [#852](https://github.com/pressbooks/pressbooks/pull/852)).
- **Feature:** Search & Replace with RegEx is now available for super admins without additional configuration (see [#870](https://github.com/pressbooks/pressbooks/issues/870), [#871](https://github.com/pressbooks/pressbooks/pull/871), [#879](https://github.com/pressbooks/pressbooks/pull/879)).
- **Feature:** Punjabi Gurmukhi support (props to [@alexpflores](https://github.com/alexpflores)) (see [#877](https://github.com/pressbooks/pressbooks/pull/877)).
- **Enhancement:** Book editors can now modify theme options and custom CSS (see [#862](https://github.com/pressbooks/pressbooks/issues/862), [#863](https://github.com/pressbooks/pressbooks/pull/863)).
- **Enhancement:** The Pressbooks News feed is now cached across all sites to reduce unnecessary network access (see [#882](https://github.com/pressbooks/pressbooks/pull/882)).
- **Fix:** The TOC endpoint in the Pressbooks REST API v2 now uses `chapters` and `parts` for consistency with the endpoints for these post types.
- **Fix:** The EPUB importer now properly detects and handles optional whitespaces (see [#554](https://github.com/pressbooks/pressbooks/issues/554), [#874](https://github.com/pressbooks/pressbooks/pull/874)).
- **Fix:** Users without super admin privileges can no longer access the trash when they shouldn't be able to do so (see [#865](https://github.com/pressbooks/pressbooks/pull/865)).
- **Fix:** Image URLs with `#fixme` on the end will now be properly copied into EPUBs during export (see [#887](https://github.com/pressbooks/pressbooks/pull/887)).

### Pressbooks Book 1.10

- **Feature:** Add support for Pressbooks 4.1.0's content licensing feature (see [#25](https://github.com/pressbooks/pressbooks-book/pull/25), [#26](https://github.com/pressbooks/pressbooks-book/pull/26), [#31](https://github.com/pressbooks/pressbooks-book/pull/31), [#32](https://github.com/pressbooks/pressbooks-book/pull/32), [#37](https://github.com/pressbooks/pressbooks-book/issues/37), [pressbooks/pressbooks#805](https://github.com/pressbooks/pressbooks/issues/805 "Content licensing")).
- **Feature:** Add support for Punjabi Gurmukhi script (props to [@alexpflores](https://github.com/alexpflores)) (see [#27](https://github.com/pressbooks/pressbooks-book/pull/27)).
- **Fix:** Fix an issue where enabling social media would break the mobile webbook layout (see [#28](https://github.com/pressbooks/pressbooks-book/issues/28), [#30](https://github.com/pressbooks/pressbooks-book/pull/30)).
- **Fix:** Fix an issue where numberless chapters in a book would cause the MOBI export to fail with certain book themes (see [#33](https://github.com/pressbooks/pressbooks-book/pull/33)).
- **Fix:** Add webbook theme support for WordPress' built-in `<!--nextpage-->` tag, which splits a single post into multiple web pages (see [#35](https://github.com/pressbooks/pressbooks-book/pull/35)).
