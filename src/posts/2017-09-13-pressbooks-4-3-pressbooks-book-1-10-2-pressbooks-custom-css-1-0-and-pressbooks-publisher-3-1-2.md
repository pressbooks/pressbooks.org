---
title: "Pressbooks 4.3, Pressbooks Book 1.10.2, Pressbooks Custom CSS 1.0, and Pressbooks Publisher 3.1.2"
date: "2017-09-13"
tags: 
  - "changelog"
---

We tagged [Pressbooks 4.3.0](https://github.com/pressbooks/pressbooks/releases/tag/4.3.0), [Pressbooks Book 1.10.2](https://github.com/pressbooks/pressbooks-book/releases/tag/1.10.2), [Pressbooks Custom CSS 1.0.0](https://github.com/pressbooks/pressbooks-custom-css/releases/tag/1.0.0), and [Pressbooks Publisher 3.1.2](https://github.com/pressbooks/pressbooks-publisher/releases/tag/3.1.2) on GitHub yesterday, and we're deploying them across our hosted networks today. Here's what's changed:

## Pressbooks 4.3

**NOTICE:** Pressbooks 4.3.0 requires WordPress 4.8.1. **NOTICE:** Users of the Pressbooks Custom CSS theme must upgrade to Pressbooks Custom CSS 1.0 for compatibility with Pressbooks 4.3.

- **[FEATURE]** Custom Styles: Navigate to _Appearance_ → _Custom Styles_ on your book's dashboard to add custom CSS or SCSS to any book theme (see [#658](https://github.com/pressbooks/pressbooks/issues/658), [#912](https://github.com/pressbooks/pressbooks/pull/912), [#925](https://github.com/pressbooks/pressbooks/pull/925), [#937](https://github.com/pressbooks/pressbooks/issues/937), [#938](https://github.com/pressbooks/pressbooks/pull/938), [#940](https://github.com/pressbooks/pressbooks/issues/940), [#941](https://github.com/pressbooks/pressbooks/pull/941), and [#942](https://github.com/pressbooks/pressbooks/pull/942)).
- **[ENHANCEMENT]** Expanded the `license` property of the `/metadata` endpoint to include a human-readable license name and custom license text (if present) (see [#934](https://github.com/pressbooks/pressbooks/issues/934) and [#936](https://github.com/pressbooks/pressbooks/pull/936)).
- **[ENHANCEMENT]** Added the book's short description to the `/metadata` endpoint as a [`disambiguatingDescription`](http://schema.org/disambiguatingDescription) (see [#930](https://github.com/pressbooks/pressbooks/issues/930) and [#932](https://github.com/pressbooks/pressbooks/pull/932)).
- **[ENHANCEMENT]** Clarified errors when trying to clone a book from Pressbooks < 4.1 (see [#914](https://github.com/pressbooks/pressbooks/issues/914)and [#931](https://github.com/pressbooks/pressbooks/pull/931)).
- **[ENHANCEMENT]** Renamed several action and filter hooks and deprecated the old versions (see [#926](https://github.com/pressbooks/pressbooks/pull/926)).
- **[FIX]** Fixed an issue which would prevent super administrators without any books on a network from accessing the cloning page (see [#913](https://github.com/pressbooks/pressbooks/issues/913) and [#933](https://github.com/pressbooks/pressbooks/pull/933)).
- **[FIX]** Fixed a regression which blocked the use of custom LaTeX renderers (props to [@monkecheese](https://github.com/monkecheese); see [#928](https://github.com/pressbooks/pressbooks/pull/928)).

## Pressbooks Book 1.10.2

- **[ENHANCEMENT]** Updated to version 2.1 of [pressbooks/mix](https://github.com/pressbooks/mix).
- **[FIX]** The cover page now displays the subtitle from Book Information as the book's subtitle, rather than the tagline.

## Pressbooks Custom CSS 1.0.0

**NOTICE:** Pressbooks Custom CSS 1.0.0 requires Pressbooks 4.3.0.

- **[ENHANCEMENT]** Custom CSS functionality is now included in this theme (see [#2](https://github.com/pressbooks/pressbooks-custom-css/pull/2)).

## Pressbooks Publisher 3.1.2

- **[FIX]** Prevented Pressbooks Publisher's wrapper from being added to the user catalog page.
