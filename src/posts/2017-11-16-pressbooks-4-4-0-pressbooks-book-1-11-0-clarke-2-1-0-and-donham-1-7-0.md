---
title: 'Pressbooks 4.4.0, Pressbooks Book 1.11.0, Clarke 2.1.0, and Donham 1.7.0'
date: '2017-11-16'
tags:
  - Changelog
---

We
tagged [Pressbooks 4.4.0](https://github.com/pressbooks/pressbooks/releases/tag/4.4.0), [Pressbooks Book 1.11.0](https://github.com/pressbooks/pressbooks-book/releases/tag/1.11.0),
[Clarke 2.1.0](https://github.com/pressbooks/pressbooks-clarke/releases/tag/2.1.0) and
[Donham 1.7.0](https://github.com/pressbooks/pressbooks-donham/releases/tag/1.7.0) on
GitHub today and deployed them across our hosted networks. Here's what's changed:

### Pressbooks 4.4.0

**NOTICE:** Pressbooks >= 4.4 requires
[WordPress 4.9](https://wordpress.org/news/2017/11/tipton/).

- **[FEATURE]** You can now assign [Thema](https://ns.editeur.org/thema/en) subject
  categories to your book on the Book Information page (see
  [#978](https://github.com/pressbooks/pressbooks/pull/978)).
- **[FEATURE]** Part slugs are now editable (props to
  [@colomet](https://github.com/colomet) for the suggestion; see
  [3f5eca2](https://github.com/pressbooks/pressbooks/commit/3f5eca2dce75bf2d3fae474a3d8485a568b300b9)).
- **[CORE ENHANCEMENT]** Pressbooks now uses WordPress’ included
  [CodeMirror](https://make.wordpress.org/core/2017/10/22/code-editing-improvements-in-wordpress-4-9/)
  scripts and styles for our Custom Styles editor (see
  [#980](https://github.com/pressbooks/pressbooks/pull/980)).
- **[CORE ENHANCEMENT]** Added the `pb_global_components_path` filter which lets book
  themes override the global components path to point to their own bundled components
  libraries (see [#982](https://github.com/pressbooks/pressbooks/pull/982)).
- **[CORE ENHANCEMENT]** Added the `pb_pre_export` action to allow tweaks prior to an
  export routine (see
  [5302eea](https://github.com/pressbooks/pressbooks/commit/5302eeaac44f7bdd7f4158be7d44f63b9e0dfa3b)).
- **[CORE ENHANCEMENT]** Our `app()` function now matches Laravel 5.4’s function signature
  (see
  [cdcb9e8](https://github.com/pressbooks/pressbooks/commit/cdcb9e8c54690d3391a5476c1a61baca781ad09d)).
- **[FIX]** Importing a Word document with multiple images now works properly (props to
  [@rootl](https://github.com/rootl) for the bug report; see
  [#288](https://github.com/pressbooks/pressbooks/issues/288) and
  [#977](https://github.com/pressbooks/pressbooks/pull/977)).
- **[FIX]** Chapters will now correctly inherit their book’s license in the API (see
  [#979](https://github.com/pressbooks/pressbooks/pull/979)).
- **[FIX]** Chapters will no longer show raw content in the API if they are
  password-protected (see [#975](https://github.com/pressbooks/pressbooks/pull/975)).
- **[FIX]** Uploading an image to the user catalog no longer causes an error (props to
  [@emasters](https://github.com/emasters) for the bug report; see
  [#983](https://github.com/pressbooks/pressbooks/pull/983)).

### Pressbooks Book 1.11.0

- **[FEATURE]** Add parameter to `pressbooks_copyright_license()` to allow hiding custom
  copyright license (see [#50](https://github.com/pressbooks/pressbooks-book/pull/50)).
- **[CORE ENHANCEMENT]** Remove WordPress `generator` meta tag (see
  [6c621ad](https://github.com/pressbooks/pressbooks-book/commit/6c621adeff72ee56836bf3dd011f90d0f66a5ba7)).

### Clarke 2.1.0

- Preparations for Book 2.0 compatibility.

### Donham 1.7.0

- Preparations for Book 2.0 compatibility.
