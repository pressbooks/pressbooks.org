---
title: "Font Selector Theme Option"
date: "2019-09-24T12:00"
author: Dac Chartrand
tags:
  - Development
---

When users think about picking the right theme for the book they've written with
Pressbooks, they sometimes face difficult choices. They may like the overall design and
aesthetic of a given theme, but want to use a typeface that they've seen in a different
theme, or which isn't currently part of any of supported themes. They may also have
different typeface preferences for webbooks and their ebook or PDF (print) exports.

A less enlightened developer might have just laughed out loud and said 'Too bad! We can't
have amateurs ruining our beautiful books with their questionable typography choices, now
can we?' Luckily for me, I work with people (like Taylor McGrath) who believe that the
best designers and developers listen to and respond to their users. And for some time now,
Taylor and others on our support team have heard from users who'd like to have more
control over typography and font choices when theming their books.

Enter what we're calling 'Shape Shifter': a nerdy code name for theme options that allows
book administrators to choose typefaces from a curated list of open fonts for Headers and
Body text. These font selector options are designed to function separately for webbooks,
PDF exports, and ebooks so that users could for example choose to use Alegreya (a serif
typeface) for the body text in PDF exports and Barlow (a sans serif typeface) for the body
text in the webook.

[In the current sprint](https://github.com/orgs/pressbooks/projects/43), we added the code
to do this in [Pressbooks](https://github.com/pressbooks/pressbooks/pull/1792) and
[McLuhan](https://github.com/pressbooks/pressbooks-book/pull/602). Next week, we're
rolling out the fully-baked feature for our EDU customers in a new premium theme called
Malala, where we'll test and get user feedback before deciding whether to add these theme
options to other of our themes. Open source users get ... this blog post!

Developers who want to take advantage of this feature need to convert their
[Global Typography](https://github.com/pressbooks/pressbooks/blob/dev/inc/class-globaltypography.php)
SCSS.

Here's how it could be done for
[Clarke](https://github.com/pressbooks/pressbooks-clarke/blob/8a87708bd9a8be712e3dcba39007eeac2f5cb8cb/assets/styles/web/_fonts.scss#L1), one of our existing open-source book themes.

Before:

```scss
@import "font-stack-web";
$serif-web: serif !default;
$sans-serif-web: sans-serif !default;

$font-1: "Times New Roman", Georgia, $serif-web;
$font-2: Helvetica, Arial, $sans-serif-web;
$font-3: $font-2;
```

After:

```scss
// Load dynamically generated Global Typography fonts
@import "font-stack-web";
$serif-web: serif !default;
$sans-serif-web: sans-serif !default;

// Load Shape Shifter fonts, if any.
@import "shapeshifter-font-stack-web";
$shapeshifter-font-1-is-serif: true !default;
$shapeshifter-font-2-is-serif: true !default;

// Insert custom fonts for your theme into the font stacks below. Always end the
// stack with $serif-web or $sans-serif-web, as appropriate—this allows custom
// language support to be added dynamically.

@if variable-exists(shapeshifter-font-1) {
  $font-1: $shapeshifter-font-1, if($shapeshifter-font-1-is-serif, $serif-web, $sans-serif-web);
} @else {
  $font-1: "Times New Roman", Georgia, $serif-web;
}
@if variable-exists(shapeshifter-font-2) {
  $font-2: $shapeshifter-font-2, if($shapeshifter-font-2-is-serif, $serif-web, $sans-serif-web);
} @else {
  $font-2: Helvetica, Arial, $sans-serif-web;
}
$font-3: $font-2;
```

Make changes like the above to:

- `assets/styles/epub/_fonts.scss`
- `assets/styles/epub/_fonts.scss`
- `assets/styles/prince/_fonts.scss`

Pay special attention to variable names _(replace
$sans-serif-web to $sans-serif-epub or
$sans-serif-prince, for example)_ If you have
`@import` statements move them from the bottom of the file into the `else` conditions.

To finish, add this code snippet in your theme's `functions.php` file:

```php
add_filter('pb_is_shape_shifter_compatible', '__return_true');
```

Once activated, the theme should have new Theme Options for each format:

![Shape Shifter Feature](/images/Shape-Shifter-Feature.png)

> "[90 percent of design is typography. And the other 90 percent is whitespace](https://www.zeldman.com/2015/12/24/the-year-in-design/)"
