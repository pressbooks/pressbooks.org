---
title: "Pressbooks 4.2 and Pressbooks Book 1.10.1"
date: "2017-09-06"
tags: 
  - Changelog
---

We tagged [Pressbooks 4.2.0](https://github.com/pressbooks/pressbooks/releases/tag/4.2.0) and [Pressbooks Book 1.10.1](https://github.com/pressbooks/pressbooks-book/releases/tag/1.10.1) on GitHub today and we're deploying them across our hosted networks tomorrow. Here's what's changed:

## Pressbooks 4.2

**NOTICE:** Pressbooks 4.2 requires WordPress 4.8.1.

- **Feature:** Full-sized images will be used where possible in Print PDF exports to ensure that exported PDFs meet image resolution requirements (see [#894](https://github.com/pressbooks/pressbooks/issues/894), [#898](https://github.com/pressbooks/pressbooks/pull/898) and [#900](https://github.com/pressbooks/pressbooks/pull/900)).
- **Feature:** WXR import and clone operations will now attempt to fetch original images from the source book in addition to the scaled/cropped version in the book content (see [#895](https://github.com/pressbooks/pressbooks/issues/895) and [#902](https://github.com/pressbooks/pressbooks/pull/902)).
- **Feature:** Content on the organize page now has a View link as will as Edit and Trash (see [#840](https://github.com/pressbooks/pressbooks/issues/840)and [#893](https://github.com/pressbooks/pressbooks/pull/893)).
- **Enhancement:** The [Masterminds HTML5 parser](https://github.com/Masterminds/html5-php) is now used instead of `\DOMDocument` where possible for improved error handling and compatibility with HTML5 elements (see [#889](https://github.com/pressbooks/pressbooks/issues/889) and [#896](https://github.com/pressbooks/pressbooks/pull/896)).
- **Enhancement:** Unnecessary HTTP calls have been removed from export routines (see [#899](https://github.com/pressbooks/pressbooks/pull/899)).
- **Enhancement:** Installation instructions are now linked from the readme file instead of being included (see [#891](https://github.com/pressbooks/pressbooks/issues/891) and [#892](https://github.com/pressbooks/pressbooks/pull/892 "Link to contributors and installation on docs site (fix #891)")).
- **Fix:** Resolved some inconsistencies with custom copyright notice and copyright year display (see [#922](https://github.com/pressbooks/pressbooks/pull/922)).
- **Fix:** Clone operations now have a 5-minute time limit which should reduce the occurrence of timeouts (props to [@bdolor](https://github.com/bdolor) for the bug report; see [#903](https://github.com/pressbooks/pressbooks/issues/903) and [#904](https://github.com/pressbooks/pressbooks/pull/904)).
- **Fix:** Visiting `/catalog` on the root site no longer causes an error (see [#905](https://github.com/pressbooks/pressbooks/pull/905)).
- **Fix:** Pressbooks LaTeX settings no longer appear on the root site's dashboard (see [#910](https://github.com/pressbooks/pressbooks/issues/910 "PB Latex settings should only appear in books, not root site") and [#911](https://github.com/pressbooks/pressbooks/pull/911)).
- **Fix:** The Organize page now supports all post statuses (see [#915](https://github.com/pressbooks/pressbooks/pull/915)).
- **Fix:** Fixed an issue where the Pressbooks News dashboard widget would be cached in the wrong language (see [#918](https://github.com/pressbooks/pressbooks/issues/918 "Pressbooks News Widget Is Cached In User's Langauge For Whole Site") and [#921](https://github.com/pressbooks/pressbooks/pull/921)).
- **Fix:** Removed some unused code from the PB LaTeX symbiont (props to [@jeremyfelt](https://github.com/jeremyfelt); see [#923](https://github.com/pressbooks/pressbooks/pull/923)).

## Pressbooks Book 1.10.1

- **Fix:** Consistent display of custom copyright notice (see [#38](https://github.com/pressbooks/pressbooks-book/pull/38 "Custom notice should override auto all rights reserved")).
