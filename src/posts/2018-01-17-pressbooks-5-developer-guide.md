---
title: "Pressbooks 5: Developer Guide"
date: "2018-01-17"
---

Pressbooks 5 will introduce some significant changes to the ways we store and retrieve data within the book, a new export module, modifications to two existing export modules, and some changes to the filesystem for user generated content. This post outlines these key changes and the migration paths that we’ve built in to facilitate the upgrade to Pressbooks 5.

## Data Changes

### Content Visibility

In Pressbooks 4.x and earlier, the visibility of content across different media is controlled by a combination of custom post metadata and core post status. For front matter, back matter and chapters, the `pb_export` post meta value determines whether or not they appear in exports, while their post status (`draft`, `pending`, `private`, or `publish`) determines their visibility in the webbook.

In an effort to better conform to WordPress best practices and streamline the user experience, we’re using the [post status](https://developer.wordpress.org/reference/functions/get_post_status/) as the source of truth for whether front matter, chapters, and back matter appear in web, exports, or both. We’ve added a new `web-only` post status, and content visibility will now be determined as follows:

| Post Status | Web + REST API | Exports |
| --- | --- | --- |
| `draft` | hidden | hidden |
| `web-only` | visible | hidden |
| `private` | hidden | visible |
| `publish` | visible | visible |

In terms of the user interface, we're changing this:

![A mockup of the Export Settings & Publish panels in Pressbooks 4.x.](https://pressbooks.org/app/uploads/2018/01/export-publish.svg)

To this:

[caption id="attachment_707" width="280"]![A mockup of the Status & Visibility panel for a new chapter in Pressbooks 5.](https://pressbooks.org/app/uploads/2018/01/status-visibility-new.svg)The panel for a new chapter.[/caption]

[caption id="attachment_705" width="280"]![A mockup of the "Status & Visibility" panel for an existing chapter in Pressbooks 5.](https://pressbooks.org/app/uploads/2018/01/status-visibility.svg)The panel for a new chapter.[/caption]

Note that we're changing the primary action button from "Publish" for new content and "Update" for existing content to "Create" and "Save", respectively.

Your front matter, back matter and chapters will be automatically updated when you visit your book after updating to Pressbooks 5.

### Contributor Management

Pressbooks 4.x lets you add a single author and multiple contributing authors, editors, and translators in your Book Information and lets you add a single author for each front matter, back matter, or chapter. Pressbooks 5 imports all your existing authors (and Pressbooks users who are assigned to your book) and creates entries in a new `contributor` taxonomy. Then, it repopulates new relevant metadata fields with a list of contributors that match your book’s existing contributors. For example, if you have an author named Alice X and two editors named Bob Y and Eve Z, your Book Information will contain the following in Pressbooks 4.x:

| Field | Value |
| --- | --- |
| `pb_author` | `'Alice X'` |
| `pb_editor` | `['Bob Y', 'Eve Z']` |

In Pressbooks 5, your Book Information will contain the following:

| Field | Value |
| --- | --- |
| `pb_authors` | `'alice-x'` |
| `pb_editors` | `['bob-y', 'eve-z']` |

The values saved in Book Information are the [slugs](https://codex.wordpress.org/Function_Reference/get_term#Return_Values) of entries in the `contributor` taxonomy. Also, for backwards-compatibility, the new field names are pluralized so that any third-party code that looks for the old fields will still be able to retrieve them for the time being.

You’ll be able to edit the display names of these contributors in one place — the new Contributors page, which is a standard WordPress taxonomy management page — and you’ll be able to quickly and easily select from your list of contributors to add assign authors throughout your book (if you have a book that consists of chapters with different authors, and you also want to include credits for all the authors in your Book Information, this will make maintaining that information much easier). In future releases of Pressbooks, we will be able to add metadata to contributors, including profile pictures, author websites, and more, for display on your webbook cover page or individual front matter, back matter, and chapters.

We're also adding a [new class](https://github.com/pressbooks/pressbooks/blob/dev/inc/class-contributors.php), `\Pressbooks\Contributors`, and [some other related functions](https://github.com/pressbooks/pressbooks/blob/dev/inc/utility/namespace.php#L1263-L1284) to retrieve arrays or formatted lists of contributors.

The migration of your book’s contributor data will happen automatically when you visit your book after updating to Pressbooks 5.

### **Licenses**

In the same way that we’re moving contributor data to a `contributor` taxonomy, we’re moving the available licenses into a new `license` taxonomy. That way, if you need to add a custom license for your book, it will immediately be available in all chapters, front matter, and back matter as well as your Book Information. This migration will happen automatically when you visit your book after updating.

## Export Changes

### HTMLBook Preview

In Pressbooks 5, [we’ve introduced](https://github.com/pressbooks/pressbooks/pull/1032) a new [HTMLBook](http://oreillymedia.github.io/HTMLBook/) export module as a proof of concept. We’re excited about the potential of adopting and advancing this proposed standard for the semantic representation of books on the web, and we will be actively developing our export module in the months to come. We're also working with the creators of HTMLBook to expand and improve the standard (to begin with, we're proposing the addition of new front matter and back matter types and of new block elements, including educational textboxes).

At this time, our HTMLBook exporter is not production-ready, but we will be using it as a testbed to refine our best practices for coding export modules in Pressbooks.

### XHTML and EPUB Markup Changes

We're making a change to the way we mark up our XHTML and EPUB exports, but only for themes that use our SCSS component library, [Buckram](https://github.com/pressbooks/buckram). In Pressbooks 4.x, chapter subtitle and author elements are not wrapped in the same container as the chapter number and title:

[code lang="html"]

<div class="chapter standard" id="chapter-1">

<div class="chapter-title-wrap">

<h3 class="chapter-number">1</h3>

<h2 class="chapter-title">Loomings</h2>

</div>

<div class="ugc chapter-ugc">

<h2 class="chapter-author">Herman Melville</h2>

<h2 class="chapter-subtitle">The First Chapter</h2>

<p>Call me Ishmael.</p>

</div>

</div>

[/code]

This makes it very difficult to reliably style the first page of front matter, back matter, and chapters.

In Pressbooks 5, books that use Buckram-based themes will now have the following markup:

[code lang="html"]

<div class="chapter standard" id="chapter-1">

<div class="chapter-title-wrap">

<h3 class="chapter-number">1</h3>

<h2 class="chapter-title">Loomings</h2>

<h2 class="chapter-author">Herman Melville</h2>

<h2 class="chapter-subtitle">The First Chapter</h2>

</div>

<div class="ugc chapter-ugc">

<p>Call me Ishmael.</p>

</div>

</div>

[/code]

This change will only impact themes using Buckram, which include our open source [Clarke](https://github.com/pressbooks/pressbooks-clarke) theme and the premium Asimov theme (the latter only available to [Pressbooks EDU](https://pressbooks.education) or [Pressbooks.com](https://pressbooks.com) users). We are thoroughly testing these Buckram-based themes to ensure that this change does not affect existing books. If you have built a theme using Buckram, we suggest you test your theme as well once [this issue](https://github.com/pressbooks/buckram/issues/36) has been closed.

## Filesystem Changes

In Pressbooks 4.x, all export files, (S)CSS and other user-generated files are stored in subfolders of your book’s uploads directory. We’re moving them all into a pressbooks folder to prevent conflicts between our files and any other files that plugins may generate. This will happen without the need for any intervention on your part.
