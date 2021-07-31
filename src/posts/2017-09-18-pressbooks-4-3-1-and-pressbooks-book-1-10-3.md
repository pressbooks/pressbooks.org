---
title: 'Pressbooks 4.3.1 and Pressbooks Book 1.10.3'
date: '2017-09-18'
tags:
  - Changelog
---

We
tagged [Pressbooks 4.3.1](https://github.com/pressbooks/pressbooks/releases/tag/4.3.1) and [Pressbooks Book 1.10.3](https://github.com/pressbooks/pressbooks-book/releases/tag/1.10.3)
on GitHub today and deployed them across our hosted networks. Here's what's changed:

## Pressbooks 4.3.1

**NOTICE:** Pressbooks 4.3.1 requires WordPress 4.8.1. **NOTICE:** Users of the Pressbooks
Custom CSS theme must upgrade to Pressbooks Custom CSS 1.0 for compatibility with
Pressbooks 4.3.1.

- **[CORE ENHANCEMENT]** Added a debugging switch to Custom Styles (see
  [#946](https://github.com/pressbooks/pressbooks/pull/946)).
- **[FIX]** Resolved an issue where some fonts would not be loaded properly during the PDF
  export routine (see
  [#944](https://github.com/pressbooks/pressbooks/pull/944 'Fonts bugs') and
  [#945](https://github.com/pressbooks/pressbooks/issues/945)).
- **[FIX]** Updated routines that use XPath for compatibility with HTML5, resolving some
  issues with multi-level TOC and EpubCheck validation (see
  [#947](https://github.com/pressbooks/pressbooks/pull/947)).

## Pressbooks Book 1.10.3

- **[FIX]** Fix some issues with Biblical Hebrew, Devanagari, and Turkish fonts.
