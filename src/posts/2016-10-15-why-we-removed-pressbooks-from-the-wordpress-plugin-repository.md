---
title: 'Why We Removed Pressbooks from the WordPress Plugin Repository'
date: '2016-10-15'
tags:
  - 'Pressbooks News'
  - 'plugin'
  - 'pressbooks-open-source'
---

Why We Removed Pressbooks from the WordPress Plugin Repository

A couple weeks ago, we removed Pressbooks from the WordPress Plugin Repository. We want to
offer an explanation for this decision to our users, and give some insight into our plans
for the distribution of Pressbooks moving forward.

Pressbooks has never been a typical WordPress plugin. It is a
[platform, not a plugin](https://wordpress.org/support/topic/platform-not-plugin/), and as
such it completely transforms the WordPress interface into a content management system for
book authoring and formatting. Furthermore, it requires
[WordPress Multisite](https://codex.wordpress.org/Create_A_Network) and it also requires a
number of third-party libraries to support its export routines
([epubcheck](https://github.com/idpf/epubcheck),
[KindleGen](https://www.amazon.com/gp/feature.html?docId%3D1000765211),
[PrinceXML](http://www.princexml.com) and [xmllint](http://xmlsoft.org/xmllint.html) to
name a few) which cannot be installed on shared hosting environments. As such, Pressbooks
is not a WordPress plugin that is particularly useful without:

1. A virtual private server (VPS) environment;
2. An advanced knowledge of WordPress configuration, especially multisite;
3. Some devops experience.

Over the years, we have encountered many WordPress users who installed Pressbooks from the
WordPress Plugin Repository on their existing blogs[1. Don't do this!] and were frustrated
by the experience. After much consideration, we have decided that the best way to support
all users of the Pressbooks plugin is to remove it from the WordPress Plugin Repository
and distribute it via [GitHub](https://github.com/pressbooks/pressbooks/releases/).

For those who don't want to run their own Pressbooks infrastructure, we offer the
following options:

- [Pressbooks.com](https://pressbooks.com/), for authors and small publishers creating a
  single book or a handful of books per year
- [Pressbooks EDU](https://pressbooks.com/for-academia/), our premium hosted service for
  educational institutions
- [Pressbooks Publisher](https://pressbooks.com/for-publishers/), our premium hosted
  service for publishers

For those who are interested in running their own networks, we are working to improve the
[installation documentation](https://pressbooks.org/installation/) and provide
[several](https://github.com/pressbooks/pressbooks/issues/502) [methods](https://github.com/pressbooks/pressbooks/issues/502) to
keep Pressbooks updated.
