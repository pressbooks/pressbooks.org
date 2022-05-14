---
title: Theme Development
permalink: /dev-docs/theme-development/
---

## Getting Started

Start by installing [WP-CLI][1] and our [pb-cli][2] utility. This will allow you to scaffold a new Pressbooks book theme in your development environment with the following command:

    wp scaffold book-theme <slug>

For further options, [read the docs][3].

The resulting theme will have the following structure and contents:

    ├── assets
    │   ├── styles
    │   │   ├── components
    │   │   │   ├── _accessibility.scss
    │   │   │   ├── _colors.scss
    │   │   │   ├── _elements.scss
    │   │   │   ├── _media.scss
    │   │   │   ├── _specials.scss
    │   │   │   ├── _structure.scss
    │   │   │   ├── _titles.scss
    │   │   │   ├── _toc.scss
    │   │   ├── epub
    │   │   │   ├── _fonts.scss
    │   │   │   ├── style.scss
    │   │   ├── prince
    │   │   │   ├── _fonts.scss
    │   │   │   ├── style.scss
    │   │   ├── web
    │   │   │   ├── _fonts.scss
    │   │   │   ├── style.scss
    ├── .editorconfig
    ├── .gitignore
    ├── .scss-lint.yml
    ├── functions.php
    ├── style.css

Note that `style.css` is not used except to provide Pressbooks with [theme file header][4] information. Your web theme stylesheet is compiled when your theme is activated or theme options that affect it are changed. For easier development, you can add the following line to `wp-config.php`:

`define('WP_ENV', 'development');`

This will turn on the development compiler introduced in Pressbooks 3.9.0, which triggers a recompile of your web theme stylesheet when you visit any page in your webbook if the source files have been modified since it was last compiled ([see here][5]).

## Overriding Defaults

If you activate the theme you have just created, you will be able to export your book in all formats thanks to our sensible defaults. But now comes the fun part. Each file in `assets/styles/components` is set up to allow you to override the default values of all theme variables. Components are as follows:

### \_accessiblity.scss

Contains rules for accessibility.

### \_colors.scss

Contains color definitions which can be assigned elsewhere.

### \_elements.scss

Contains rules for standard elements (headings, paragraphs, blockquotes et cetera).

### \_media.scss

Contains rules for images, embedded audio and embedded video.

### \_specials.scss

Contains rules for custom elements (columns, footnotes, pullquotes, dropcaps, et cetera).

### \_structure.scss

Contains rules for document and page and structure (only included in [PrinceXML][6] PDF — page dimensions, margins, recto-verso, running content et cetera).

### \_titles.scss

Contains rules for book, front matter, part, chapter and back matter titles.

### \_toc.scss

Contains rules for the book's table of contents.

Let's take a look at `assets/styles/components/_elements.scss`:

```scss
// Elements

// Override variables above this line, using the !default flag to allow further overrides.
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
```

As you can see, this file is importing a variables file and a number of individual component files (all of which can be found within the Pressbooks plugin in the [`assets/book/styles`][7] directory). Let's examine the rules found in [`components/elements/_blockquotes.scss`][8]:

```scss
.blockquote,
blockquote {
  margin-top: $blockquote-margin-top;
  margin-right: $blockquote-margin-right;
  margin-bottom: $blockquote-margin-bottom;
  margin-left: $blockquote-margin-left;
  font-family: $blockquote-font-family;
  font-size: $blockquote-font-size;
  font-style: $blockquote-font-style;
  font-weight: $blockquote-font-weight;
  line-height: $blockquote-line-height;
  text-align: $blockquote-align;
}
```

The values for these SCSS variables are found in [`variables/_elements.scss`][9] (all directories and root-level SCSS partials in `assets/book/styles/components` have a corresponding variables file):

```scss
$blockquote-font-family: $font-1 !default;
$blockquote-font-size: 0.9em !default;
$blockquote-font-style: normal !default;
$blockquote-font-weight: normal !default;
$blockquote-line-height: 1.2em !default;
$blockquote-margin-top: 1em !default;
$blockquote-margin-right: 1em !default;
$blockquote-margin-bottom: 1em !default;
$blockquote-margin-left: 1em !default;
$blockquote-align: justify !default;
```

You will notice that all these values are set with the SCSS [`!default` flag][10]. The `!default` flag tells the SCSS compiler to use this value **unless** another value has already been assigned to the variable. Going back to your new theme's [`assets/styles/components/_elements.scss`], file, you could change it as follows:

```scss
// Elements

$blockquote-font-style: italic !default;

// Override variables above this line, using the !default flag to allow further overrides.
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
```

When Pressbooks compiles your theme's SCSS, the rule for blockquotes will now include the `font-style` value from your theme instead of the global default, so the output will look like this:

```css
.blockquote,
blockquote {
  margin-top: 1em;
  margin-right: 1em;
  margin-bottom: 1em;
  margin-left: 1em;
  font-family: serif;
  font-size: 0.9em;
  font-style: italic;
  font-weight: normal;
  line-height: 1.2em;
  text-align: justify;
}
```

The reason you should use the `!default` flag on your variable definitions is so that your theme's values can be further overridden by user options. Most variables cannot currently be overridden in this way (because the necessary theme options don't exist yet), but we recommend always using the default flag so that future enhancements to user theme options can be developed with as much flexibility as possible.

## Adding Custom Rules

Now that you've overridden a variable, try adding your own custom rule. Perhaps your book needs a special type of blockquote that is centered on the page. You can add it by inserting the following rule below the `@import` rules in [`assets/styles/components/_elements.scss`]:

```css
blockquote.centered,
.blockquote.centered {
  margin-right: auto;
  margin-left: auto;
}
```

Now our full [`assets/styles/components/_elements.scss`] file looks like this:

```scss
// Elements

$blockquote-font-style: italic !default;
// Override variables above this line, using the !default flag to allow further overrides.
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

blockquote.centered,
.blockquote.centered {
  margin-right: auto;
  margin-left: auto;
}
```

When you export your book, Pressbooks will compile your new rule after the default rule for blockquotes, so `blockquote.centered` will inherit all the properties of the standard blockquote but will override the left and right margin properties.

## Different Formats, Different Rules

Sometimes you need to set a variable differently depending on which format you are using. Perhaps you want to left-align your blockquotes for EPUB and web, but you want to justify them for PDF. This is easy to accomplish using an SCSS if-statement with the `$type` variable. Add another variable override to the top of [`assets/styles/components/_elements.scss`] as follows:

```scss
@if $type == "epub" {
  $blockquote-align: left !default;
} @else if $type == "prince" {
  $blockquote-align: justify !default;
} @else if $type == "web" {
  $blockquote-align: left !default;
}
```

All the component files you are working on are imported into the different outputs' `style.scss` files. For example, your book theme's stylesheet for Prince PDF, [`assets/styles/prince/style.scss`], looks like this:

```scss
$type: "prince";

@import "fonts";
@import "../components/colors";
@import "../components/elements";
@import "../components/specials";
@import "../components/media";
@import "../components/titles";
@import "../components/structure";
@import "../components/toc";
```

The if-statement you just wrote will be evaluated based on each stylesheet's `$type` variable, so the `$blockquote-align` property variable will be set to `left` for EPUB and web and `justify` for Prince PDF.

You should never modify the `assets/styles/<format>/style.scss` file directly; all your variables and rules should go in the component files.

## Fonts

Font stack definitions can be set for EPUB, Prince, and Web in their respective directories in the `assets/styles/<format>` path.

```scss
@import "_font-stack-prince";

$serif-prince: serif !default;
$sans-serif-prince: sans-serif !default;

$font-1: "Tinos", Georgia, $serif-prince;
$font-2: "Lato", Helvetica, Arial, $sans-serif-prince;

@import "LatoFont", "TinosFont";
```

Themes usually have at least two font stacks. `$font-1` must be the body font, and `$font-2` must be the header font. The `@import` rule loads a SCSS `_font-stack-{TYPE}` file which is dynamically generated based on the [Language and Script Support][11] settings in the Global tab of Theme Options. The `_font-stack-{TYPE}` is built from partials found in our default book theme McLuhan. These files, in combination with the `$serif-epub, $sans-serif-epub, $serif-prince, $sans-serif-prince, $serif-web` and `$sans-serif-web` variables, allow us to dynamically add support for non-Latin character sets.

You can insert custom fonts for your theme into the font stacks shown below. Always end the stack with `$serif-epub` or `$sans-serif-epub`, as appropriate—this allows custom language support to be added dynamically.

```scss
$font-1: "Tinos", Georgia, $serif-prince;
$font-2: "Lato", Helvetica, Arial, $sans-serif-prince;
```

Add import rules for any fonts you want to reference. Available font partials are located in McLuhan at the path `assets/book/typography/styles` and follow the naming pattern: `_FontNameInCamelCaseFont.scss`. For example, to import `Alegreya Sans`, use this code:

`@import 'AlegreyaSansFont';`

You may also include a typeface from a directory like Google Fonts in your web book. Here is an example of how to import in your web fonts file:

`@import url("https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic|Crimson+Text:400,400italic,700,700italic");`

[1]: https://wp-cli.org/#installing
[2]: https://github.com/pressbooks/pb-cli/#installing
[3]: https://github.com/pressbooks/pb-cli/#using
[4]: https://codex.wordpress.org/File_Header#Theme_File_Header_Example
[5]: https://github.com/pressbooks/pressbooks/blob/v3.9.0/themes-book/pressbooks-book/functions.php#L97-L143
[6]: https://www.princexml.com/
[7]: https://github.com/pressbooks/pressbooks/tree/master/assets/book/styles
[8]: https://github.com/pressbooks/pressbooks/blob/master/assets/book/styles/components/elements/_blockquotes.scss
[9]: https://github.com/pressbooks/pressbooks/blob/master/assets/book/styles/variables/_elements.scss
[10]: https://robots.thoughtbot.com/sass-default
[11]: https://guide.pressbooks.com/chapter/support-multilingual-publications/
