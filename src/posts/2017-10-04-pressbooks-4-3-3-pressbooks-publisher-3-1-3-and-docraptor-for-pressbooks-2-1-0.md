---
title: "Pressbooks 4.3.3, Pressbooks Publisher 3.1.3 and DocRaptor for Pressbooks 2.1.0"
date: "2017-10-04"
tags: 
  - "changelog"
---

We tagged [Pressbooks 4.3.3](https://github.com/pressbooks/pressbooks/releases/tag/4.3.3), [Pressbooks Publisher 3.1.3](https://github.com/pressbooks/pressbooks-publisher/releases/tag/3.1.3), and [DocRaptor for Pressbooks 2.1.0](https://github.com/pressbooks/pressbooks-docraptor/releases/tag/2.1.0) and deployed them across our hosted networks today. Here's what's changed:

## Pressbooks 4.3.3

**NOTICE:** Pressbooks 4.3.3 requires WordPress 4.8.2.

- **[CORE ENHANCEMENT]** The Pressbooks plugin is now self-updating — GitHub Updater is no longer required (see [#897](https://github.com/pressbooks/pressbooks/issues/897) and [#954](https://github.com/pressbooks/pressbooks/pull/954)).
- **[CORE ENHANCEMENT]** Error logs from export routines can be emailed to an array of email addresses supplied via the `pb_error_log_emails` filter (see [#956](https://github.com/pressbooks/pressbooks/pull/956)).
- **[CORE ENHANCEMENT]** Images in cloned or imported books can now be properly edited using the WordPress image editor (see [#920](https://github.com/pressbooks/pressbooks/issues/920) and [#949](https://github.com/pressbooks/pressbooks/pull/949)).
- **[FIX]** We’ve implemented a better solution for the PDF profile bug (see [#951](https://github.com/pressbooks/pressbooks/issues/951), [#952](https://github.com/pressbooks/pressbooks/pull/952)).
- **[FIX]** URLs like `/catalog/page/1` will no longer attempt to load user catalogs (see [#953](https://github.com/pressbooks/pressbooks/pull/953)).

## Pressbooks Publisher 3.1.3

- **[FIX]** Removed duplicate footer markup (thanks to [@jeremyfelt](https://github.com/jeremyfelt); see [#11](https://github.com/pressbooks/pressbooks-publisher/pull/11)).

## DocRaptor for Pressbooks 2.1.0

- **[CORE ENHANCEMENT]** The DocRaptor for Pressbooks plugin is now self-updating — GitHub Updater is no longer required (see [#19](https://github.com/pressbooks/pressbooks-docraptor/pull/19 "Add update checker"), [#20](https://github.com/pressbooks/pressbooks-docraptor/issues/20 "Clean up readme.txt for Plugin Update Checker"), and [#21](https://github.com/pressbooks/pressbooks-docraptor/pull/21 "Clean up readme.txt for Plugin Update Checker (fixes #20)")).
