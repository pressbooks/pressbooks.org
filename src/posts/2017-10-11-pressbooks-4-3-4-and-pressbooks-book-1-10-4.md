---
title: 'Pressbooks 4.3.4 and Pressbooks Book 1.10.4'
date: '2017-10-11T12:00'
author: Ned Zimmerman
tags:
  - Changelog
---

We
tagged [Pressbooks 4.3.4](https://github.com/pressbooks/pressbooks/releases/tag/4.3.4) and [Pressbooks Book 1.10.4](https://github.com/pressbooks/pressbooks-book/releases/tag/1.10.4)
on GitHub today and are now deploying them across our hosted networks. Here's what's
changed:

## Pressbooks 4.3.4

**NOTICE:** Pressbooks >= 4.3.3 requires WordPress 4.8.2. **NOTICE:** Users of the
Pressbooks Custom CSS theme must upgrade to Pressbooks Custom CSS 1.0 for compatibility
with Pressbooks >= 4.3.0.

- **[CORE ENHANCEMENT]** The user catalog title can now be changed via the
  `pb_catalog_title`filter (props to [@monkecheese](https://github.com/monkecheese); see
  [#961](https://github.com/pressbooks/pressbooks/pull/961)).
- **[CORE ENHANCEMENT]** SCSS variables from theme options will now be passed to the SCSS
  compiler as key/value pairs rather than by building SCSS in PHP (see
  [#782](https://github.com/pressbooks/pressbooks/issues/782) and
  [#963](https://github.com/pressbooks/pressbooks/pull/963)).
- **[FIX]** Fixed an issue where the PDF margins theme option was not being applied
  properly.
- **[FIX]** Fixed a conflict between the updated Pressbooks LaTeX module and third-party
  renderers (props to [@monkecheese](https://github.com/monkecheese); see
  [#958](https://github.com/pressbooks/pressbooks/issues/958) and
  [#959](https://github.com/pressbooks/pressbooks/pull/959)).
- **[FIX]** The publication date should now save properly, regardless of book language
  (thanks to [@thomasdumm](https://github.com/thomasdumm) for the bug report; see
  [#965](https://github.com/pressbooks/pressbooks/issues/965) and
  [#966](https://github.com/pressbooks/pressbooks/pull/966)).

## Pressbooks Book 1.10.4

- **[FIX]** Fixed an issue where part numbering would not reset properly in Prince if the
  part was the book’s first content (see
  [#45](https://github.com/pressbooks/pressbooks-book/pull/45)).
