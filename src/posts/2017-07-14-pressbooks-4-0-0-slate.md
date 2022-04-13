---
title: 'Pressbooks 4.0.0 "Slate"'
date: "2017-07-14T12:00"
author: Ned Zimmerman
tags:
  - Changelog
---

We
released [Pressbooks 4.0.0](https://github.com/pressbooks/pressbooks/releases/tag/4.0.0) on
GitHub earlier this week and finished deploying it across our hosted networks on
Wednesday. Here’s what changed:

## Key Features

### Next-Generation REST API

Building on [Brad Payne's](http://bradpayne.ca/) original REST API for Pressbooks, we've
introduced an improved and expanded REST API based on the WordPress Core
[REST API](https://developer.wordpress.org/rest-api/) infrastructure. The Pressbooks REST
API v2 supports authenticated CRUD (Create, Read, Update, Destroy) access to all
Pressbooks content types (front and back matter, parts, and chapters) as well as read-only
access to book structure and metadata. For more information, see our
[REST API documentation](http://docs.pressbooks.org/api). We're excited to see what the
Pressbooks Open Source community will do with these new API capabilities! Share your
projects with us: [code@pressbooks.com](mailto:code@pressbooks.com).

### Enhanced LaTeX Rendering

Pressbooks' core LaTeX renderer now produces high resolution output suitable for print!
More improvements to come, and thanks for your patience as we've worked to improve this
important feature.

### Better Content Management

Want to mark all chapters for export on the Organize screen? You can do that now! Trashed
something that you want back? Just navigate to Text → Trash and you can restore it. Many
more improvements to come!

### Pressbooks CLI

The Pressbooks command line interface is now part of Pressbooks. Want to make your own
book theme? Run `wp scaffold book-theme` from the root of your Pressbooks install and take
advantage of our intuitive SCSS-based theme structure. More commands to come --
[submit your ideas](https://github.com/pressbooks/pb-cli/issues)!

## Detailed Changelog

**NOTICE:** Upon upgrading to Pressbooks 4.0, you will need to install the
[Pressbooks Book](https://github.com/pressbooks/pressbooks-book) and
[Pressbooks Publisher](https://github.com/pressbooks/pressbooks-publisher) themes along
with any of our other open source
[book themes](https://github.com/search?q=topic%3Abook-theme+org%3Apressbooks&type=Repositories)
that were bundled with earlier versions of Pressbooks. For more information, see the
[upgrading instructions](https://docs.pressbooks.org/upgrading).

**NOTICE:** Pressbooks 4.0 requires
[WordPress 4.8.0](https://wordpress.org/news/2017/06/evans/).

- **Feature:** REST API v2 (see
  [#472](https://github.com/pressbooks/pressbooks/issues/472),
  [#763](https://github.com/pressbooks/pressbooks/pull/763),
  [#770](https://github.com/pressbooks/pressbooks/issues/770),
  [#771](https://github.com/pressbooks/pressbooks/issues/771),
  [#774](https://github.com/pressbooks/pressbooks/issues/774),
  [#778](https://github.com/pressbooks/pressbooks/pull/778),
  [#780](https://github.com/pressbooks/pressbooks/issues/780),
  [#781](https://github.com/pressbooks/pressbooks/pull/781),
  [#783](https://github.com/pressbooks/pressbooks/pull/783),
  [#785](https://github.com/pressbooks/pressbooks/issues/785),
  [#788](https://github.com/pressbooks/pressbooks/issues/788),
  [#798](https://github.com/pressbooks/pressbooks/pull/798),
  [#803](https://github.com/pressbooks/pressbooks/pull/803),
  [#804](https://github.com/pressbooks/pressbooks/issues/804),
  [#806](https://github.com/pressbooks/pressbooks/issues/806),
  [#807](https://github.com/pressbooks/pressbooks/issues/807),
  [#810](https://github.com/pressbooks/pressbooks/pull/810),
  [#812](https://github.com/pressbooks/pressbooks/pull/812),
  [#815](https://github.com/pressbooks/pressbooks/pull/815),
  [#816](https://github.com/pressbooks/pressbooks/pull/816),
  [#823](https://github.com/pressbooks/pressbooks/pull/823),
  [#832](https://github.com/pressbooks/pressbooks/pull/832), and our
  [API Docs](http://docs.pressbooks.org/api)
- **Feature:** LaTeX outputs are now at a sufficient resolution for print applications
  (see [#819](https://github.com/pressbooks/pressbooks/pull/819)).
- **Feature:** You can now change statuses in bulk on the **Organize** page (see
  [#249](https://github.com/pressbooks/pressbooks/issues/249) and
  [#822](https://github.com/pressbooks/pressbooks/pull/822)).
- **Feature:** Deleted content can now be restored from **Text → Trash** (see
  [9283c26](https://github.com/pressbooks/pressbooks/tree/9283c26504007ba55259672c5cb9efc8ee07b3c0)).
- **Enhancement:** The Pressbooks CLI is now bundled in Pressbooks (see
  [#464](https://github.com/pressbooks/pressbooks/issues/464) and
  [#826](https://github.com/pressbooks/pressbooks/pull/826)).
- **Enhancement:** `new \Pressbooks\Metadata()` now returns book metadata as an
  implementation of
  [JsonSerializeable](https://secure.php.net/manual/en/class.jsonserializable.php) (see
  [#804](https://github.com/pressbooks/pressbooks/issues/804) and
  [#832](https://github.com/pressbooks/pressbooks/pull/832)).
- **Enhancement:** Expanded metadata is now hidden on the **Book Information** page unless
  needed (see [#804](https://github.com/pressbooks/pressbooks/issues/804) and
  [#832](https://github.com/pressbooks/pressbooks/pull/832)).
- **Enhancement:** We now use the
  [Human Made coding standards](https://engineering.hmn.md/how-we-work/style/php/) for
  PHP.
  [Check your code](http://docs.pressbooks.org/coding-standards/#validating-with-php-code-sniffer)
  before submitting a PR 👍.
- **Enhancement:** We now use [Laravel Mix](https://github.com/jeffreyway/laravel-mix) to
  handle all plugin assets (see [#769](https://github.com/pressbooks/pressbooks/pull/769)
  and [#795](https://github.com/pressbooks/pressbooks/pull/795)). Making a change in
  `/assets/src/`? With [Yarn](https://yarnpkg.com/) installed in your development
  environment, run `yarn && yarn run build` to build assets for distribution.
- **Enhancement:** SCSS files can now be checked against our coding standards using
  [stylelint](https://stylelint.io/) with the command `yarn run lint` (see
  [#743](https://github.com/pressbooks/pressbooks/issues/743) and
  [#817](https://github.com/pressbooks/pressbooks/pull/817)).
- **Enhancement:** JS files have been updated to ES6 and can now be checked against our
  coding standards using [eslint](http://eslint.org/) with the command `yarn run lint`
  (see [#829](https://github.com/pressbooks/pressbooks/pull/829)).
- **Enhancement:** Root and book themes are now distributed separately from the Pressbooks
  plugin—make sure you install the required themes when you
  [upgrade](http://docs.pressbooks.org/upgrading)! (See
  [#756](https://github.com/pressbooks/pressbooks/issues/756) and
  [#799](https://github.com/pressbooks/pressbooks/pull/799).)
- **Enhancement:** Part content has been migrated to the standard content editor instead
  of a custom field (see [#486](https://github.com/pressbooks/pressbooks/issues/486) and
  [#764](https://github.com/pressbooks/pressbooks/pull/764)).
- **Enhancement:** The Search and Replace module has been heavily optimized, reducing
  memory usage by ~85% (see [#759](https://github.com/pressbooks/pressbooks/issues/759)
  and [#793](https://github.com/pressbooks/pressbooks/pull/793)).
- **Enhancement:** Additional post types can be added to the list of permitted post types
  for editing using the
  [`pb_supported_post_types` filter](https://github.com/pressbooks/pressbooks/blob/4.0.0/inc/posttype/namespace.php#L16-L29)
  (props to [@SteelWagstaff](https://github.com/steelwagstaff), see
  [#758](https://github.com/pressbooks/pressbooks/pull/758)).
- **Enhancement:** We now use
  [vanilla/htmlawed](https://packagist.org/packages/vanilla/htmlawed) as our htmLawed
  provider (see [#767](https://github.com/pressbooks/pressbooks/pull/767)).
- **Enhancement:** Developers can now add new import types via the `pb_import_table_cell`
  and `pb_initialize_import` filter hooks (props [@bdolor](https://github.com/bdolor); see
  [#802](https://github.com/pressbooks/pressbooks/pull/802) and
  [#811](https://github.com/pressbooks/pressbooks/pull/811)).
- **Enhancement:** Releases are now packaged automatically via Travis (see
  [#730](https://github.com/pressbooks/pressbooks/issues/730) and
  [#821](https://github.com/pressbooks/pressbooks/pull/821)).
- **Fix:** DOCX and ODT files exported from Google Docs (which lack standard metadata) can
  now be imported without issue via the import module (see
  [#837](https://github.com/pressbooks/pressbooks/issues/837) and
  [#838](https://github.com/pressbooks/pressbooks/pull/838)).
- **Fix:** Images are now set to a `prince-image-resolution` of `auto, normal` rather than
  300dpi for more reliably high-quality print PDF output (see
  [#744](https://github.com/pressbooks/pressbooks/issues/744) and
  [#776](https://github.com/pressbooks/pressbooks/pull/776)).
- **Fix:** Text suggesting that we offer printing services has been removed from the
  Publish page (see [#784](https://github.com/pressbooks/pressbooks/pull/784)).
- **Fix:** Export downloads from the webbook include the proper file extensions (props to
  [@bdolor](https://github.com/bdolor); see
  [#808](https://github.com/pressbooks/pressbooks/pull/808)).
- **Fix:** Current privacy settings are now displayed properly when updating book privacy
  from the Organize page (see [#711](https://github.com/pressbooks/pressbooks/issues/711)
  and [#801](https://github.com/pressbooks/pressbooks/pull/801)).
- **Fix:** The editor style is now enqueued with a version for cache busting (see
  [#813](https://github.com/pressbooks/pressbooks/issues/813) and
  [#814](https://github.com/pressbooks/pressbooks/pull/814)).
- **Fix:** The Search and Replace module no longer searches items in the trash (see
  [6978734](https://github.com/pressbooks/pressbooks/commit/697873425439be829abaeb077fbc3f6a8391b17e)).
- **Fix:** Miscellaneous improvements to improve performance and reduce unnecessary error
  output.
