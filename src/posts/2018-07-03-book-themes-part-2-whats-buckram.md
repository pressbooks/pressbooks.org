---
title: "Book Themes, Part 2: What’s Buckram?"
date: "2018-07-03T12:00"
tags:
  - Development
---

In the early days of Pressbooks, each book theme was pretty much built from scratch, using
trial and error (and adapting work that went into our first book theme,
[Luther](https://github.com/pressbooks/pressbooks-luther)). We used vanilla CSS for all
book themes until
[Pressbooks 3.0](https://github.com/pressbooks/pressbooks/releases/tag/v3.0) was released
in December 2015, which supported themes built using the SCSS variant of
[SASS](https://sass-lang.com/).

Our initial goal with adding SASS support to Pressbooks was limited in scope. We needed to
support non-Latin character sets (Ancient Greek, Biblical Hebrew, Chinese, Japanese,
Korean, and many more) but we wanted to keep book export sizes small by only bundling
these additional fonts when they were needed. So we added a new theme option (Global
Typography, now known as
[Language & Script Support](https://guide.pressbooks.com/chapter/languages/)) which
allowed users to select additional non-Latin languages for their book which would be
dynamically imported into their stylesheet during export.

After the release of Pressbooks 3.0, we realized the potential of SASS and SASS variables
for allowing users to customize various aspects of their book’s theme which until then we
had been forced to hard-code on a theme by theme basis (or insert by searching and
replacing placeholder strings in vanilla CSS).
[Clarke](https://github.com/pressbooks/pressbooks-clarke) was the first theme we converted
to our new theme structure, now known as Buckram. When we released the rebuilt Clarke
theme alongside
[Pressbooks 3.6.0](https://github.com/pressbooks/pressbooks/releases/tag/v3.6.0) in June
2016, users gained access to a host of new PDF theme options, allowing margins, running
content, and more to be customized via a settings page.

We wanted to bring this flexibility to our other themes, and since the release of Clarke
2.0 we’ve been slowly working towards that goal with
[Buckram](https://github.com/pressbooks/buckram). It’s been in the works for a couple of
years now, but only over the past six months have we been able to dedicate significant
time and developer resources to bringing it into a stable 1.0 release (coming early
July!).

So, what _is_ Buckram? Last September at our team retreat in Montréal, I demoed it to our
friends at the [Rebus Foundation](https://rebus.foundation), and
[Boris](https://rebus.foundation/team/) nicknamed it “Bookstrap”. That’s kind of what it
is; like [Bootstrap](https://getbootstrap.com), Buckram is a set of styled components for
book theming, with corresponding markup, that can be customized with SASS variables. It’s
raw material for our book themes, so we named it after
[buckram](https://en.wikipedia.org/wiki/Buckram), a material of physical bookbinding.

Here’s how Buckram works, in brief. A book theme imports Buckram’s component files and
default variables via SASS [imports](http://sass-lang.com/guide#topic-5), and then
overrides specific variables with custom values.

Let’s say you’d like to customize the way your theme displays blockquotes. They’re found
within the
[`blockquotes` partial](https://github.com/pressbooks/buckram/blob/dev/assets/styles/components/elements/_blockquotes.scss)
and the corresponding
[variables file](https://github.com/pressbooks/buckram/blob/dev/assets/styles/variables/_elements.scss#L584-L675).
If you’ve started by scaffolding a book theme with our
[command line tool](https://cli.pressbooks.org), you’ll find the following file in
`/assets/styles/components/_elements.scss`:

```scss
// Elements

// Override variables above this line, using the !default flag to allow further overrides.
@import "variables/elements";

// Add custom SCSS below these imports and includes.
@import "components/elements";
```

Let’s say you want to add a left border and padding to your blockquotes. You can just do
this, with reference to the source variables file (or the
[docs](https://buckram.pressbooks.org)):

```scss
// Elements

$blockquote-padding-left: 1em !default;
$blockquote-border-left-width: 2px !default;
$blockquote-border-left-style: solid !default;
$blockquote-border-left-color: #333 !default;

// Override variables above this line, using the !default flag to allow further overrides.
@import "variables/elements";
```

Now the values you’ve supplied will override the defaults from `variables/elements`, giving your blockquotes a `padding-left` value of `1em` and a `border-left` value of `solid 2px #333`. We take advantage of the SASS `!default flag`, which lets a variable that comes _before_ another variable override it. In this example:

```scss
$color: red;
$color: blue !default;
```

The `$color` variable will be set to `red`, as it precedes a variable flagged with `!default`.

Using `!default` flags for the custom values in a theme, as demonstrated above, means that we can add theme options to allow further overrides that users control. So a theme may have a default font for body text, but in the future we’ll be able to let users customize body text by selecting an alternative typeface from a dropdown, overriding all rules where that font is referenced by changing a single variable. Moving our themes to Buckram will make the theme customization experience for Pressbooks users flexible in ways that we’ve always dreamed it would be.

So far, we’ve got three open source themes built with Buckram (Clarke, Jacobs and McLuhan). The newest member of our dev team, [Daniel Fernandes](https://github.com/dannylonglegs), has been hard at work converting our backlog of premium themes to Buckram, and we’ll be releasing them over the coming months. We also will be expanding our documentation for Buckram, and improving the Pressbooks CLI tools for building new Buckram themes so that all Open Source users can benefit from the work that’s gone into our theme structure. We’re excited for what Buckram will let us do, and we welcome your feedback, bug reports and code contributions.
