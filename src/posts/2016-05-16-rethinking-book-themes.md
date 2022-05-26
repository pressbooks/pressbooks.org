---
title: "Rethinking Book Themes"
date: "2016-05-16T12:00"
author: Ned Zimmerman
tags:
  - "Core"
---

Pressbooks has built book themes the same way for quite a while, with the only significant
change being the switch from CSS to SCSS in Pressbooks 3.0. Shown below is the structure
for one of our open-source themes, [Clarke](https://github.com/pressbooks/pressbooks-clarke) (with a
couple of omissions that aren’t relevant to this post).

```treeview
├── export
│   ├── epub
│   │   ├── images
│   │   │   ├── asterisk.png
│   │   │   ├── em-dash.png
│   │   ├── style.scss
│   ├── prince
│   │   ├── images
│   │   │   ├── em-dash.png
│   │   ├── script.js
│   │   ├── style.scss
├── _fonts-epub.scss
├── _fonts-prince.scss
├── _fonts-web.scss
├── _mixins.scss
├── functions.php
├── style.css
├── style.scss
├── theme-information.php
```

We’re in the midst of a significant re-think of how we build themes, and here’s what it
looks like so far.

```treeview
├── assets
│   ├── images
│   │   ├── em-dash.png
│   │   ├── epub
│   │   │   ├── asterisk.png
│   ├── scripts
│   │   ├── prince
│   │   │   ├── script.js
│   ├── styles
│   │   ├── epub
│   │   │   ├── _fonts.scss
│   │   │   ├── style.scss
│   │   ├── prince
│   │   │   ├── _fonts.scss
│   │   │   ├── style.scss
│   │   ├── web
│   │   │   ├── _fonts.scss
│   │   │   ├── style.scss
│   │   ├── components
│   │   │   ├── _accessibility.scss
│   │   │   ├── _alignment.scss
│   │   │   ├── _colors.scss
│   │   │   ├── _elements.scss
│   │   │   ├── _elements-special.scss
│   │   │   ├── _media.scss
│   │   │   ├── _structure.scss
│   │   │   ├── _titles.scss
│   │   │   ├── _toc.scss
├── functions.php
├── style.css
├── theme-information.php
```

All three core outputs now keep their assets in the `assets` folder, with shared assets
going in the directory roots of `assets/fonts` (when
needed), `assets/images`, `assets/scripts` and `assets/styles`. We used to keep the
uncompiled web stylesheet in the theme root along with a compiled version, but this caused
some [confusion](https://github.com/pressbooks/pressbooks/issues/396).
The `style.css` file in the theme root was never loaded in the web view; since Pressbooks
3.0, we’ve always used a freshly compiled version which is generated when the user changes
themes or changes their theme options. But WordPress requires that theme information be
stored in
the [file header](https://codex.wordpress.org/File_Header#Theme_File_Header_Example) of `style.css`.
Our practice moving forward will be to use the `style.css` file in the root for theme
information only, and keep a `style.scss` file for the web book in `assets/styles/web/`.

Each of the files in `assets/styles/components` imports a global components file or
file(s) and a variables file for the relevant item(s) from the Pressbooks
plugin’s `assets/book/styles/` directory (which is loaded by our SCSS compiler). For
example, `assets/styles/components/_elements.scss` might contain the following:

```scss
// Elements

$orphans: 3 !default;

// Change variables above this line, using the !default flag to allow overrides.
@import "variables/elements";

// Add custom SCSS below these imports and includes.
@import "components/elements/links";
@import "components/elements/blockquotes";
@import "components/elements/body";
@import "components/elements/headings";
@import "components/elements/lists";
@import "components/elements/miscellaneous";
@import "components/elements/paragraphs";
@import "components/elements/tables";
@include tables();
```

In this hypothetical theme, all of the default element styles have been imported but the
theme developer has changed the orphan property from `1` to `3`. (Using the
SCSS `!default` flag allows a variable like this to be overridden by the book user once we
overhaul our [theme options](https://github.com/pressbooks/pressbooks/issues/106).)

All of these component files are imported into the EPUB, PDF and web `style.scss` files,
like so:

```scss
$type: "prince";

@import "fonts";
@import "../components/alignment";
@import "../components/colors";
@import "../components/elements";
@import "../components/specials";
@import "../components/media";
@import "../components/titles";
@import "../components/structure";
@import "../components/toc";
```

So now we have a book theme with a more coherent structure, comprehensive default
variables and an easy method to override them, and lots of possibilities.

We have lots to do to move forward with the implementation of this new theme structure
(including backwards compatibility). You can follow along on
the [theme-structure](https://github.com/pressbooks/pressbooks/tree/theme-structure/) branch
to observe or participate in the implementation process. If you want to get involved in
the discussion of these changes, feel free to join in on the
relevant [GitHub issue](https://github.com/pressbooks/pressbooks/issues/383)!
