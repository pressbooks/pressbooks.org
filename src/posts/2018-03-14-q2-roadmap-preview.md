---
title: "Q2 Roadmap Preview"
date: "2018-03-14T12:00"
tags:
  - Development
---

We're drawing near the end of Q1 at Pressbooks! And we've crossed off a lot of the items
on our 2018 Roadmap:

- ✔ Ensure support for [H5P](https://h5p.org/wordpress) interactive elements with
  graceful fallbacks across all formats
- ✔ Ensure support for video and audio with
  graceful fallbacks across all formats
- ✔ Add support for multiple contributors (authors,
  editors, translators, etc.)
- ✔ Add custom metadata support to the Pressbooks REST API
  and clone tool
- ✔ Finish our new landing page theme
- ✔ Finish our new webbook theme
- ✔ Improve section heading outputs in EPUB and PDF
- ✔ Develop two new themes oriented
  towards textbook and OER use cases
- ✔ Add support for chapter-level cloning
- ✔ Overhaul the Organize page, prioritizing accessibility, fully responsive design, and
  inline and batch editing support of front matter/chapter/back matter properties

Now's the time for us to share some of our plans for Q2. We've drawn from our overall
roadmap for this year and we'll be trying to address many of the top priorities and
feature requests we've been hearing about from our clients and Open Source users.

### Editing and Content

- We’ll be working to test and fully support the
  [WP QuickLaTeX](https://wordpress.org/plugins/wp-quicklatex/) plugin, which will improve
  the quality of LaTeX formulas in PDF exports.
- We'll be engaging in research and
  development with an eye on further mathematics support improvements across all formats.
- We'll be working to test and fully support the
  [TablePress](https://wordpress.org/plugins/tablepress/) plugin, which will allow more
  advanced table display.
- We'll be engaging in research and development with the goal of
  improving to media management and image uploading, including user-facing guidance to
  ensure high-quality image output across all formats.
- We'll be refining our approach for
  supporting the forthcoming WordPress [Gutenberg](https://wordpress.org/gutenberg/) editor.

### Core Technology

- We'll be engaging in research and development on various popular enterprise
  integrations for Pressbooks, including LTI and various single sign-on (SSO) methods, with
  the goal of ensuring that Pressbooks better supports these integrations.

### Themes and Theme Design

- Based on user feedback, we'll continue to refine the
  [McLuhan](https://github.com/pressbooks/pressbooks-book) (webbook) and
  [Aldine](https://github.com/pressbooks/pressbooks-aldine) (landing page) themes that we
  released at the end of February.
- We'll continue to refine Buckram, our book theme
  component library, and we'll continue to convert legacy themes to use Buckram and fully
  support the theme options that are currently available in
  [Clarke](https://github.com/pressbooks/pressbooks-clarke),
  [Jacobs](https://github.com/pressbooks/pressbooks-jacobs), and
  [McLuhan](https://github.com/pressbooks/pressbooks-book). This work will include updates
  to the open source Austen and [Donham](https://github.com/pressbooks/pressbooks-donham)
  themes.
- We'll be continuing research and development towards implementing new markup for
  books, based on [HTMLBook](https://oreillymedia.github.io/HTMLBook).

### Import, Export, and Cloning

- We'll be testing the BCcampus
  [OpenStax Importer for Pressbooks](https://github.com/BCcampus/pressbooks-openstax-import)
  to see if can be added to our recommended plugins list.
- We'll be reviewing various implementations of Common
  Cartridge import and export to ensure first-class support for this format.
- We'll be exploring ways of tracking the adoption of Open Textbooks.

### User Interface

- We'll be engaging in research and development on methods of configuring default theme
  options and other settings for books at the network level.
- We'll be engaging in research
  and development on methods for providing book-level analytics on networks where books are
  in subdirectories as opposed to subdomains, and exploring other types of book- and
  network-level analytics.

### Accessibility & Inclusivity

- We'll be working with the [Inclusive Design Research Centre](https://idrc.ocadu.ca/)
  (IDRC) to integrate their
  [User Interface Options](https://docs.fluidproject.org/infusion/development/tutorial-userInterfaceOptions/UserInterfaceOptions.html)
  tool into [McLuhan](https://github.com/pressbooks/pressbooks-book) and
  [Aldine](https://github.com/pressbooks/pressbooks-aldine).
- We'll be implementing other
  accessibility and inclusivity improvements on the front-end and back-end based on feedback
  from the IDRC.

If you're planning on working on any of these items or would like to collaborate, please
let us know in the forums or tweet @pressbooksdev!
