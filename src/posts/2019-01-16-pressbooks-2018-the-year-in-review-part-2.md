---
title: 'Pressbooks 2018: The Year in Review, part 2'
date: '2019-01-16T12:00'
tags:
  - 'Pressbooks News'
---

In a
[previous post](https://pressbooks.education/news/2019/01/pressbooks-2018-the-year-in-review-part-1/),
I took a look at the year in review for the Pressbooks community (the people who make and
use our software). In this post, I’ll take a closer look as Pressbooks as a product,
covering some of the exciting changes and developments to our software made in 2018 by our
hard-working developers and generous contributors.

On January 1, 2018, Pressbooks software was the following:

1. Pressbooks (our core plugin): version 4.5.0
2. Pressbooks default book theme: pressbooks-book 1.12.0 [Luther]
3. Pressbooks root theme: Pressbooks Publisher 3.1.3
4. A handful of smaller plugins, including Pressbooks Stats 1.4.0 and DocRaptor for
   Pressbooks 2.1.0

Over the course of the year we made major updates to each piece of our core product and
introduced several new tools and plugins. The most significant new releases were our new
Learning Tools Interoperability (LTI) provider and single sign-on (SSO) plugins, designed
to help educational institutions connect their Pressbooks networks with their Learning
Management Systems and enterprise login systems, and Buckram, a set of style components
that makes book theming easier and more powerful.

In 2018, we also made it easier for anyone who wants to get a more granular look at
planned releases and ongoing development work by creating and maintaining GitHub project
boards for the [project in general](https://github.com/orgs/pressbooks/projects) and for
versioned releases of specific components like
[Pressbooks](https://github.com/pressbooks/pressbooks/projects),
[pressbooks-book](https://github.com/pressbooks/pressbooks-book/projects)
(McLuhan/Buckram), [Aldine](https://github.com/pressbooks/pressbooks-aldine/projects), and
[Pressbooks LTI Provider](https://github.com/pressbooks/pressbooks-lti-provider/projects/1).
These project boards are regularly updated by our dev team to include reference
information about planned and completed releases.

We’re enormously grateful to the various institutions who funded different parts of this
work and for their shared interest in contributing back to an open source product that
benefits the entire community of users. eCampusOntario, Ryerson University, Rutgers
University Libraries and Bay Path University each made significant contributions to our
2018 development work, and Brad Payne and Alex Paredes from BCcampus contributed code to
two big new features that were added to our core product this year. Thank you, all!

### Pressbooks

Our core product is Pressbooks, a WordPress plugin that transforms a WordPress multisite
into a powerful book publishing system that makes accessible webbooks and several types of
exports, including ebooks, print-ready PDFs, and various XML flavors.

In 2018 we brought out 25 minor releases and 7 major releases of core Pressbooks
(beginning with Pressbooks 5.0.0 in late February, running all the way up to Pressbooks
5.6.0, released in November). The last version of Pressbooks to be released in 2018 was
5.6.3, which came out on December 12. All told Pressbooks received
[a net addition of more than 16,000 lines of code from humans in 2018](https://github.com/pressbooks/pressbooks/graphs/contributors?from=2018-01-01&to=2018-12-31&type=c),
with ~10,000 coming from Dac (across 161 commits), ~5,000 from Ned (across 322 commits),
~1,600 from BCcampus’ Brad Payne (across 8 commits), and ~100 from Lukas Kaiser (across 3
commits).

So those are the raw numbers. But what do they mean? How did Pressbooks improve over the
last year? Well, in lots of ways. The obsessive among you are welcome to view a detailed
[changelog](https://docs.pressbooks.org/changelog/pressbooks/) for a more exhaustive
record of everything we shipped this past year, but the following list is a baker’s dozen
of our favorite improvements from the past year:

- Major overhaul to the ‘Organize’ page: We improved the page’s accessibility for keyboard
  navigation and screen reader users and its usability when displayed on mobile devices.
  We made it easier to manage the visibility of content across web and exports; all
  content now has two binary options: “Show in Web” and “Show in Exports.” We also added
  book navigation options to the edit screen.

- **Import & Export improvements:** We added support for importing individual chapters
  from Pressbooks webbooks and for importing all supported file types from local and
  web-based sources. We added
  [graceful fallbacks for interactive content](https://pressbooks.education/news/2018/03/enhanced-interactivity-video-audio-h5p-now-available-in-pressbooks/)
  that can’t be fully experienced in ebook and PDF exports. We enabled the inclusion of
  TablePress tables in eBook and PDF exports. We allowed users to produce
  [HTMLBook](http://oreillymedia.github.io/HTMLBook/) exports, made our XHTML and HTMLBook
  outputs cleaner and more readable, and added a link to the diagnostics page which lets
  users to preview and debug PDF export issues directly in their browser using the XHTML
  source preview without having to repeatedly generate PDF exports.
- **Cloning improvements:** We also built on the book cloning feature (funded by Ryerson
  University) and the chapter-cloning feature (funded by eCampus Ontario) with a whole
  raft of cloning improvements, like adding a book source URL to Book Info for cloned
  books; allowing users to specify a new title for cloned books at the time of cloning;
  adding a theme option to let readers compare a clone book to its source; and adding
  cloning support for media attachments, media metadata (including attribution
  statements), and glossary terms.
- **Glossary tool:** We added a native glossary tool that allows authors to provide
  rollover and clickable definitions for glossary terms and to auto-generate a glossary
  list as a back matter type in their books. We’re very grateful to Brad Payne and Alex
  Paredes of BCcampus for contributing the first version of this feature.
- **Shortcodes for authors:** Thanks to support from Bay Path University, we added
  [more than a dozen new shortcodes](https://guide.pressbooks.com/chapter/shortcodes/)
  that work in both the visual editor and in document imports. These shortcodes make it
  easier for authors to include well-structured HTML elements without having to learn
  HTML.
- **Interactive and other third party content:** We added
  [support for interactive content](https://guide.pressbooks.com/chapter/embedded-media-interactive-content/)
  (like H5P activities, PhET simulations, Open Embeddable Assessments, Knight Lab
  timelines, and eduMedia interactives). We made it so that iframes embedded from trusted
  sources were automatically converted to shortcodes rather than being stripped and
  deleted. We also disabled the display of related videos in YouTube OEmbeds once videos
  are finished playing.
- **Cover generator tool:** We made our
  [self-service cover generator tool](https://guide.pressbooks.com/chapter/how-to-design-your-book-cover/)
  part of our core plugin, making it available to open-source users. This tool makes it
  easier for authors to make attractive print-ready covers for their books.
- **LaTeX and Mathematical Notation:** We made it easier for users to use mathematical
  notation by improving support for
  [WP QuickLaTeX](https://wordpress.org/plugins/wp-quicklatex/), adding support for
  QuickLaTeX rendering within TablePress tables, and permitting the use of TablePress
  tables and SVG files in ebook formats.
- **Centralized contributor management:** We made it much easier for book admins to manage
  and display authors, editors, translators, reviewers, illustrators, and generic
  contributors to books. We also moved contributor management from the “Organize” menu to
  a more logical place under the “Book Info” menu in the dashboard.
- **Better Textboxes:** We improved the markup and display options for educational
  textboxes (learning objectives, key takeaways, exercises, examples) and added a new
  “sidebar” textbox that’s especially helpful for textbook content.
- **Licensing and Attribution Improvements:** We moved license types into a taxonomy and
  now differentiate between the CC0 license and public domain work. Pressbooks now allows
  users to add and display image attribution metadata, making it easier to properly credit
  CC and other openly licensed images when they’re reused in book (big thanks to Brad and
  Alex from BCcampus for their work on this feature).
- **GDPR Compliance:** We added support for
  [WordPress 4.9.6 privacy policy management](https://wordpress.org/news/2018/05/wordpress-4-9-6-privacy-and-maintenance-release/)
  to help Pressbooks networks comply with the new requirements of The General Data
  Protection Regulation (GDPR), a regulation on privacy and data protection now in effect
  throughout the European Union.
- **More script and language support:** We added support for the Devanagari script and
  several languages, including Bengali, Kannada, Malayalam, Odia, and Telugu, making our
  software more inclusive of the millions of people who use this script or these
  languages.

### Pressbooks Default Book Theme

At the start of 2018, the default book theme for all Pressbooks networks was Luther (also
known as pressbooks-book 1.12.0 for any version heads out there). When we released
Pressbooks 5.0.0 in late February 2018, it was accompanied by McLuhan, a new book theme.
Upon its release as pressbooks-book 2.0.0, McLuhan replaced Luther as the default theme
for all new books, and Luther subsequently became available as a separate, standalone
legacy theme. The development of McLuhan was supported by eCampus Ontario, and the theme
itself was designed with textbooks in mind, although it supports all kinds of content.

Since its initial appearance, McLuhan has seen more than a dozen additional releases and
is now on version 2.6.1 (interested readers can consult the detailed
[changelog](https://docs.pressbooks.org/changelog/pressbooks-book/)). All told the
pressbook-book repo saw
[the net addition of more than 80,000 lines of code by humans](https://github.com/pressbooks/pressbooks-book/graphs/contributors?from=2018-01-01&to=2018-12-31&type=c),
with ~78,000 coming from Ned (across 397 commits), ~3,000 from Daniel (across 59 commits),
and ~200 from Dac (across 19 commits). Of the many improvements we made to the default
book theme in 2018, here are some of the biggest highlights:

- - **Support for new features:** We added support in this theme for a number of new
    features now available in Pressbooks, including: an increased default webbook reading
    width and three new variable reading width options; collapsible sections; automatic
    resizing of webbook contents when the Hypothesis annotation pane is expended; optional
    lightbox for linked images; book and section Digital Object Identifiers (DOIs);
    glossary term lists; automatic graceful fallback for interactive content in ebook and
    PDF exports; and differentiated link styles for print and digital PDFs.
    - **Accessibility improvements:** Thanks to support from Ryerson University, we added
      a keyboard-accessible table of contents and customizable colours and logos
      (inherited from network settings). We also improved webbook accessibility by adding
      more context to webbook navigation, using better HTML5 markup for images, improving
      focus styles, and enhancing the markup for headings and our table of contents.
    - **New theme options:** Book admins now have several
      [new theme options](https://guide.pressbooks.com/chapter/new-theme-options/) for
      customizing the appearance and functionality of their webbooks as well as eBook and
      PDF exports. These additional theme options are currently only available in the 8
      themes we’ve converted to use Buckram (more on that later).
    - **Better navigation:** We made webbook navigation consistent on all screen sizes,
      allowed authors to customize part/chapter labels in the webbook display and in
      exports, and now display more descriptive labels and/or chapter short titles in
      previous/next nav links.
    - **Table of Contents improvements:** Books now indicate the current section in the
      dropdown ToC. We also added  "Show All"/"Hide All" buttons to the webbook ToC, and
      improved the appearance and overall functionality of ToC in all locations.
    - **New features for cloned books:** Cloned books include a reference and link back to
      their source and an optional comparison tool that lets you compare current versions
      of cloned and source texts.
    - **LMS-specific theming:** We also added settings which allow extraneous navigational
      elements to be suppressed when content is loaded via LTI within a Learning
      Management System (as these typically have their own internal navigation).

### Pressbooks Root Theme

In late February, we replaced Pressbooks Publisher with a new Pressbooks root theme,
called Aldine. Aldine’s creation was one of the major improvements supported by Ryerson
University. Since its initial appearance, Aldine has seen an additional eight releases and
is now on version 1.5.0 (interested readers can consult the
[changelog](https://docs.pressbooks.org/changelog/pressbooks-aldine/)).

Aldine was designed to make customizing the look and feel of Pressbooks networks easier.
It gives network managers tools to add institutional branding to a Pressbooks network by
letting them globally change default colors, logos and contact information for a network,
introduces a standalone catalog page which can be sorted, filtered, and searched by
subject or license, and makes it much easier to create and display additional pages to the
network root (like “About Us,” “Get Help,” “Terms of Service,” etc.).

Following its initial release, we’ve added specific buttons to the page editor to insert
shortcodes for page sections and calls to action; added more customizer options; made it
possible to edit the contact form email directly from the Customizer; and made privacy and
anti-spamming improvements.

### Other Plugins

We made a few [minor updates](https://docs.pressbooks.org/changelog/pressbooks-stats/) to
the small [Pressbooks Stats](https://github.com/pressbooks/pressbooks-stats) plugin, with
[some bigger work planned for early 2019](/blog/2019/01/04/q1-roadmap-preview/)
(‘improving usage statistics at the network level’ refers to ongoing efforts to give
network managers better tools for understanding how their networks are being used). The
current version of Pressbooks Stats is now 1.6.2.

At the beginning of 2018, we also maintained a plugin which implemented a DocRaptor export
module for Pressbooks as a drop-in replacement for PrinceXML. This standalone plugin
[was rolled into Pressbooks core](https://github.com/pressbooks/pressbooks/issues/1238)
with the release of Pressbooks 5.4.0 in July, and we are no longer maintaining the
standalone plugin separately.

## New Development

### LTI Provider plugin

In May, we released a stable version of
[Pressbooks LTI Provider](https://github.com/pressbooks/pressbooks-lti-provider), thanks
to support from Rutgers University Libraries. This plugin allows Pressbooks to act as an
LTI provider, registering any number of LTI consumers, and supports both deep linking and
the creation of Thin Common Cartridge exports with LTI links. LTI, which is short for
Learning Tools Interoperability, is a specification maintained by IMS Global which allows
third-party tools (like Pressbooks) to integrate with Learning Management Systems (like
Canvas, Moodle, and Blackboard) in a standardized way. Using LTI makes it easier and more
convenient for schools to securely plug learning tools and content into their LMS and make
those tools and content feel native/seamless for learners.

In late 2017, while still employed at UW-Madison,
[I wrote in more detail about why I was so excited about using LTI to connect Pressbooks with LMSes](https://medium.com/@steelwagstaff/connecting-pressbooks-to-canvas-4e0a33c65740).
Much of what I wrote then still rings true for me today. In my opinion, our LTI Provider
plugin is a hugely exciting feature for anyone interested in using Pressbooks content
inside of a Learning Management System (a common desire for teachers, both in K-12 and
higher ed settings). Our plugin is now on version 1.1.2, released in November
([changelog](https://docs.pressbooks.org/changelog/pressbooks-lti-provider/)). In Q1 2019,
we plan to pursue official IMS Global certification against both the LTI and Thin Common
Cartridge standards.

### SSO plugins

In 2018 we also developed and released two plugins that enable single sign-on for common
authentication systems used in higher education. These integrations allow log in to
Pressbooks networks using using their institutional NetID and password as login
credentials (authenticating through either CAS or SAML2).

- In May, we released the stable version of
  [our SSO plugin for CAS](https://github.com/pressbooks/pressbooks-cas-sso) (Central
  Authentication System). Our work on this plugin was funded by Rutgers University
  Libraries. This plugin is now on version 1.1.1.
- In late July, we also released the initial version of
  [our SSO plugin for SAML2 (Shibboleth)](https://github.com/pressbooks/pressbooks-shibboleth-sso).
  This plugin is now on version 0.0.5.

These SSO plugins are now available on Gold PressbooksEDU networks with a one-time
configuration fee.

### Buckram

In April, our lead developer Ned Zimmerman published a helpful introduction to
[Pressbooks themes](/blog/2018/04/09/book-themes-part-1-frames-and-pictures/) on our open
source blog, and in July he did the same for
[Buckram](/blog/2018/07/03/book-themes-part-2-whats-buckram/), “a set of styled components
for book theming, with corresponding markup, that can be customized with SASS variables,”
which we released in an initial stable version that same month.

While it’s largely invisible to most end users, the work we did in 2018 to develop and
release Buckram is important because it is provides the foundation for some really
exciting theming and customization possibilities for Pressbooks. Buckram is what enabled
all of the new theme options that we introduced in
[Clarke 2.0](https://github.com/pressbooks/pressbooks-clarke/releases/tag/2.0.0), for
example. In 2018, we converted a
[batch](https://guide.pressbooks.com/chapter/new-theme-options/) of Pressbooks themes to
use Buckram [Andreessen, Asimov, Jacobs, McLuhan, Andreesen, Dillard, Christie, and
Baker], and development work on Buckram continues apace (it’s now at version 1.2.1), with
many more theme conversions planned for 2019.

In the course of researching and writing this two part series, my already considerable
esteem for my new Pressbooks colleagues grew enormously. I hope that you’ll agree that
2018 saw really significant improvements in Pressbooks as a software product and a
community. If you want to know more about what we’ve got planned for the first few months
of 2019, we’d invite you to take a look at our
[published Q1 roadmap](https://pressbooks.education/news/2019/01/pressbooks-2019-q1-roadmap/)
and give us your [feedback](mailto:support@pressbooks.com).
