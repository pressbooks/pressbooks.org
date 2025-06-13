---
title: Theme Development
slug: ''
metaDesc: How to get started developing a new Pressbooks theme
---
## Getting Started

Start by installing [WP-CLI](https://wp-cli.org/#installing) and our [pb-cli](https://github.com/pressbooks/pb-cli/#installing) utility. This will allow you to scaffold a new Pressbooks book theme in your development environment with the following command:

    wp scaffold book-theme <slug>

For further options, [read the docs](https://github.com/pressbooks/pb-cli/#using).

The resulting theme will have the following structure and contents:

```
├── assets
    │   ├── styles
    │   │   ├── components
    │   │   │   ├── \_accessibility.scss
    │   │   │   ├── \_colors.scss
    │   │   │   ├── \_elements.scss
    │   │   │   ├── \_media.scss
    │   │   │   ├── \_specials.scss
    │   │   │   ├── \_structure.scss
    │   │   │   ├── \_titles.scss
    │   │   │   ├── \_toc.scss
    │   │   ├── epub
    │   │   │   ├── \_fonts.scss
    │   │   │   ├── style.scss
    │   │   ├── prince
    │   │   │   ├── \_fonts.scss
    │   │   │   ├── style.scss
    │   │   ├── web
    │   │   │   ├── \_fonts.scss
    │   │   │   ├── style.scss
    ├── .editorconfig
    ├── .gitignore
    ├── .scss-lint.yml
    ├── functions.php
    ├── style.css
```

Note that `style.css` is not used except to provide Pressbooks with [theme file header](https://codex.wordpress.org/File_Header#Theme_File_Header_Example) information. Your web theme stylesheet is compiled when your theme is activated or theme options that affect it are changed. For easier development, you can add the following line to `wp-config.php`:

`define('WP_ENV', 'development');`

This will turn on the development compiler, which triggers a recompile of your web theme stylesheet when you visit any page in your webbook if the source files have been modified since it was last compiled.

## Overriding Defaults

If you activate the theme you have just created, you will be able to export your book in all formats thanks to the sensible defaults provided by [Buckram](https://pressbooks.org/blog/2018/07/03/book-themes-part-2-what-s-buckram/) and [McLuhan](https://pressbooks.org/blog/2018/04/09/book-themes-part-1-frames-and-pictures/). Each file in `assets/styles/components` is set up to allow you to override the default values of all theme variables. Components are as follows:

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

Contains rules for document and page and structure (only included in PrinceXML PDF — page dimensions, margins, recto-verso, running content et cetera).

### \_titles.scss

Contains rules for book, front matter, part, chapter and back matter titles.

### \_toc.scss

Contains rules for the book's table of contents.

Let's take a look at `assets/styles/components/_elements.scss`in [Buckram](https://github.com/pressbooks/buckram/blob/dev/assets/styles/components/_elements.scss): 

```scss
////
/// @group elements
////

@import 'elements/blockquotes';
@import 'elements/body';
@import 'elements/headings';
@import 'elements/links';
@import 'elements/lists';
@import 'elements/miscellaneous';
@import 'elements/paragraphs';
@import 'elements/tables';
```

As you can see, this file imports several individual component files (all of which can be found elsewhere within Buckram). Let's examine the rules found in `components/elements/_blockquotes.scss`:

```scss
@if $type != 'web' {
  .blockquote,
  blockquote {
    margin: $blockquote-margin-top $blockquote-margin-right $blockquote-margin-bottom $blockquote-margin-left;
    font-family: $blockquote-font-family;
    font-size: $blockquote-font-size;
    font-style: $blockquote-font-style;
    font-weight: $blockquote-font-weight;
    padding: if-map-get($blockquote-padding-top, $type) if-map-get($blockquote-padding-right, $type) if-map-get($blockquote-padding-bottom, $type) if-map-get($blockquote-padding-left, $type);
    letter-spacing: if-map-get($blockquote-letter-spacing, $type);
    word-spacing: if-map-get($blockquote-word-spacing, $type);
    border-left: if-map-get($blockquote-border-left-width, $type) $blockquote-border-left-style $blockquote-border-left-color;
    @if $type == 'prince' {
      line-height: $blockquote-line-height;
    }

    text-align: $blockquote-align;
  }
}
```

The values for these particular SCSS variables are found in `variables/_elements.scss`:

```scss
/// Font stack for `<blockquote>` elements.
/// @type String
$blockquote-font-family: $font-1 !default;

/// Font size for `<blockquote>` elements.
/// @type String
$blockquote-font-size: 0.9em !default;

/// Font style for `<blockquote>` elements.
/// @type String
$blockquote-font-style: normal !default;

/// Font weight for `<blockquote>` elements.
/// @type String
$blockquote-font-weight: normal !default;

/// Line height for `<blockquote>` elements.
/// @type String
$blockquote-line-height: 1.2em !default;

/// Top margin for `<blockquote>` elements.
/// @type String
$blockquote-margin-top: 1em !default;

/// Right margin for `<blockquote>` elements.
/// @type String
$blockquote-margin-right: 1em !default;

/// Bottom margin for `<blockquote>` elements.
/// @type String
$blockquote-margin-bottom: 1em !default;

/// Left margin for `<blockquote>` elements.
/// @type String
$blockquote-margin-left: 1em !default;

/// Top padding for `<blockquote>` elements.
/// @type String | Map
/// @since version 1.0.0
$blockquote-padding-top: (epub: 0, prince: 0, web: 0) !default;

/// Right padding for `<blockquote>` elements.
/// @type String | Map
/// @since version 1.0.0
$blockquote-padding-right: (epub: 0, prince: 0, web: 0) !default;

/// Bottom padding for `<blockquote>` elements.
/// @type String | Map
/// @since version 1.0.0
$blockquote-padding-bottom: (epub: 0, prince: 0, web: 0) !default;

/// Left padding for `<blockquote>` elements.
/// @type String | Map
/// @since version 1.0.0
$blockquote-padding-left: (epub: 0, prince: 0, web: 0) !default;

/// Alignment for `<blockquote>` elements.
/// @type String
$blockquote-align: justify !default;

/// Letter spacing on `<blockquote>` elements.
/// @type String | Map
/// @since 1.0.0
$blockquote-letter-spacing: (
  epub: normal,
  prince: normal,
  web: normal
) !default;

/// Word spacing on `<blockquote>` elements.
/// @type String | Map
/// @since 1.0.0
$blockquote-word-spacing: (
  epub: normal,
  prince: normal,
  web: normal
) !default;

/// Left border width for `<blockquote>` elements.
/// @type String | Map
/// @since 1.0.0
$blockquote-border-left-width: (epub: 0, prince: 0, web: 0) !default;

/// Left border style for `<blockquote>` elements.
/// @type String
/// @since 1.0.0
$blockquote-border-left-style: none !default;

/// Left border color for `<blockquote>` elements.
/// @type String
/// @since 1.0.0
$blockquote-border-left-color: initial !default;
```

Notice that these values are set with the SCSS [`!default` flag](https://thoughtbot.com/blog/sass-default). The `!default` flag tells the SCSS compiler to use this value **unless** another value has already been assigned to the variable. Going back to your new theme's `assets/styles/components/_elements.scss`, file, you could change it as follows:

```scss
// Elements

$blockquote-font-style: italic !default;

// Override variables above this line, using the !default flag to allow further overrides.
@import 'variables/elements';

// Add custom SCSS below these imports and includes.
@import 'components/elements';
```

When Pressbooks compiles your theme's SCSS, the rule for blockquotes will now include the `font-style` value from your theme (`italic`) instead of the global default (`normal`). The resulting output will look like this:

```css
.blockquote,
blockquote {
    margin: 1em 1em 1em 2.5em;
    font-family: "Lora", "Noto Sans Adlam", "SBL Greek", "Noto Naskh Arabic", "Noto Sans CJK TC", "Noto Sans NKo", serif;
    font-size: 1em;
    font-style: italic;
    font-weight: normal;
    padding: 0 0 0 0;
    letter-spacing: normal;
    word-spacing: normal;
    border-left: 0 none initial;
    line-height: 1.5555555556em;
    text-align: justify;
}
```

The reason you should use the `!default` flag on your variable definitions is so that your theme's values can be further overridden by user options. While most variables cannot currently be overridden in this way (because the necessary theme options don't exist yet), we recommend always using the default flag so that future enhancements to user theme options can be developed with as much flexibility as possible.

## Adding Custom Rules

Now that you've overridden a variable, try adding your own custom rule. Perhaps your book needs a special type of blockquote that is centered on the page. You can add it by inserting the following rule below the `@import` rules in `assets/styles/components/_elements.scss`:

```css
blockquote.centered,
.blockquote.centered {
  margin-right: auto;
  margin-left: auto;
}
```

Now our full `assets/styles/components/_elements.scss` file looks like this:

```scss
// Elements

$blockquote-font-style: italic !default;

// Override variables above this line, using the !default flag to allow further overrides.
@import 'variables/elements';

// Add custom SCSS below these imports and includes.
@import 'components/elements';

blockquote.centered,
.blockquote.centered {
  margin-right: auto;
  margin-left: auto;
}
```

When you export your book, Pressbooks will compile your new rule after the default rule for blockquotes, so `blockquote.centered` will inherit all the properties of the standard blockquote but will override the left and right margin properties.

## Different Formats, Different Rules

Sometimes you need to set a variable differently depending on which format you are using. Perhaps you want to left-align your blockquotes for EPUB and web, but you want to justify them for PDF. This is easy to accomplish using an SCSS if-statement with the `$type` variable. Add another variable override to the top of `assets/styles/components/_elements.scss` as follows:

```scss
@if $type == "epub" {
  $blockquote-align: left !default;
} @else if $type == "prince" {
  $blockquote-align: justify !default;
} @else if $type == "web" {
  $blockquote-align: left !default;
}
```

All the component files you are working on are imported into the different outputs' `style.scss` files. For example, your book theme's stylesheet for Prince PDF, `assets/styles/prince/style.scss`, looks like this:

```scss
$type: 'prince';

@import 'fonts';
@import '../components/colors';
@import '../components/elements';
@import '../components/specials';
@import '../components/media';
@import '../components/pages';
@import '../components/section-titles';
@import '../components/structure';
@import '../components/toc';
```

The if-statement you just wrote will be evaluated based on each stylesheet's `$type` variable, so the `$blockquote-align` property variable will be set to `left` for EPUB and web and `justify` for Prince PDF.

You should never modify the `assets/styles/<format>/style.scss` file directly; all your variables and rules should go in the component files.

## Fonts

Font stack definitions can be set for EPUB, Prince, and Web in the  relevant `assets/styles/<format>/_fonts.scss` file. For example, here's the `assets/styles/prince/_fonts.scss`file for the McLuhan (pressbooks-book) theme:

```scss
@import 'font-stack-prince'; // Dynamically generated

$serif-prince: serif !default;
$sans-serif-prince: sans-serif !default;

// Load Shape Shifter fonts, if any. Must come after Global Typography snippet
@import 'shapeshifter-font-stack-prince';

$shapeshifter-font-1-is-serif: true !default;
$shapeshifter-font-2-is-serif: true !default;

// Insert custom fonts for your theme into the font stacks below. Always end the
// stack with $serif-prince or $sans-serif-prince, as appropriate—this allows
// custom language support to be added dynamically.

@if variable-exists(shapeshifter-font-1)  {
  $font-1: $shapeshifter-font-1, if($shapeshifter-font-1-is-serif, $serif-prince, $sans-serif-prince);
} @else {
  $font-1: 'Lora', $serif-prince;
  @import 'LoraFont';
}

@if variable-exists(shapeshifter-font-2) {
  $font-2: $shapeshifter-font-2, if($shapeshifter-font-2-is-serif, $serif-prince, $sans-serif-prince);
} @else {
  $font-2: 'Cormorant Garamond', $serif-prince;
  @import 'CormorantGaramondFont';
}

@if variable-exists(shapeshifter-font-2) {
  $font-3: $shapeshifter-font-2, if($shapeshifter-font-2-is-serif, $serif-prince, $sans-serif-prince);
} @else {
  $font-3: 'Cormorant Garamond', $serif-prince;
}
```

Themes usually have at least two font stacks. `$font-1` must be the body font, and `$font-2` must be the header font. The `@import` rule loads a SCSS `_font-stack-{TYPE}` file which is dynamically generated based on the [Language and Script Support](https://guide.pressbooks.com/chapter/support-multilingual-publications/) settings in the Global tab of Theme Options. The `_font-stack-{TYPE}` is built from partials found in our default book theme McLuhan. These files, in combination with the `$serif-epub, $sans-serif-epub, $serif-prince, $sans-serif-prince, $serif-web` and `$sans-serif-web` variables, allow us to dynamically add support for non-Latin character sets.

You can insert custom fonts for your theme into the font stacks shown below. Always end the stack with `$serif-epub` or `$sans-serif-epub`, as appropriate—this allows custom language support to be added dynamically.

```scss
$font-1: "Tinos", Georgia, $serif-prince;
$font-2: "Lato", Helvetica, Arial, $sans-serif-prince;
```

Add import rules for any fonts you want to reference. Available font partials are located in McLuhan at the path `assets/book/typography/styles` and follow the naming pattern: `_FontNameInCamelCaseFont.scss`. For example, to import `Alegreya Sans`, use this code:

`@import 'AlegreyaSansFont';`

You may also include a typeface from a directory like Google Fonts in your web book. Here is an example of how to import in your web fonts file:

`@import url("https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic|Crimson+Text:400,400italic,700,700italic");`
