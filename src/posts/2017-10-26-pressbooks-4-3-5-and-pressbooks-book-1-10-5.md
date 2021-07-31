---
title: "Pressbooks 4.3.5 and Pressbooks Book 1.10.5"
date: "2017-10-26"
tags: 
  - "changelog"
---

We tagged [Pressbooks 4.3.5](https://github.com/pressbooks/pressbooks/releases/tag/4.3.5) and [Pressbooks Book 1.10.5](https://github.com/pressbooks/pressbooks-book/releases/tag/1.10.5) on GitHub today and are now deploying them across our hosted networks. Here's what's changed:

### Pressbooks 4.3.5

**NOTICE:** Pressbooks >= 4.3.3 requires WordPress 4.8.2. **NOTICE:** Users of the Pressbooks Custom CSS theme must upgrade to Pressbooks Custom CSS 1.0 for compatibility with Pressbooks >= 4.3.0.

- **[CORE ENHANCEMENT]** Use Laravel Container instead of Pimple as our service container; add Laravel Blade support for future templated outputs (see [#831](https://github.com/pressbooks/pressbooks/issues/831), [#962](https://github.com/pressbooks/pressbooks/pull/962), and [#970](https://github.com/pressbooks/pressbooks/pull/970)).
- **[FIX]** Content imported from EPUB is now ordered by spine order instead of manifest order (props to [@hakkim-pits](https://github.com/hakkim-pits); see [#442](https://github.com/pressbooks/pressbooks/issues/442) and [#968](https://github.com/pressbooks/pressbooks/pull/968)).
- **[FIX]** Custom styles are no longer sanitized in ways that improperly encode characters (see [#972](https://github.com/pressbooks/pressbooks/pull/972)).
- **[FIX]** Sanitize body font size PDF theme option as a float instead of an integer to allow more size options (see [#969](https://github.com/pressbooks/pressbooks/pull/969)).
- **[FIX]** `home_url` is now used instead of `site_url` when linking to front-end content (see [#971](https://github.com/pressbooks/pressbooks/pull/971); reference: [roots/bedrock#316](https://github.com/roots/bedrock/pull/316)).
- **[FIX]** Shortcodes will now be cloned as is to preserve more footnote and LaTeX data (see [#973](https://github.com/pressbooks/pressbooks/pull/973)).
- **[FIX]** Special characters in a book title will no longer lead to filename issues under certain circumstances (see [#974](https://github.com/pressbooks/pressbooks/pull/974)).

### Pressbooks Book 1.10.15

- **[FIX]** Added cache busting to ensure that custom styles are loaded after save (see [#46](https://github.com/pressbooks/pressbooks-book/pull/46)).
