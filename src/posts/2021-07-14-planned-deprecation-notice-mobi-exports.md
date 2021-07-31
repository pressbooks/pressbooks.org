---
title: "Planned Deprecation Notice: MOBI exports"
date: "2021-07-14"
author: Steel Wagstaff
tags: 
  - Development
  - "Pressbooks News"
---

Last year, Amazon announced that they were [discontinuing their KindleGen command line tool](https://goodereader.com/blog/kindle/amazon-discontinues-kindlegen) that Pressbooks uses to generate MOBI files, and Amazon [recommended](https://www.amazon.com/gp/feature.html?ie=UTF8&docId=1000765211) that users use EPUB format for publishing new reflowable titles and updating previously published titles in the Kindle ecosystem.

Because the tool we use to generate MOBI files is no longer supported, and Amazon suggests delivering EPUBs into their ecosystem, we have decided to remove support for MOBI exports from the Pressbooks platform in a forthcoming release.

Going forward, our flowable ebook export efforts will focus exclusively on the EPUB format. Users who still wish to produce MOBI files for personal use will be encouraged to generate these files using Pressbooks EPUB exports and freely available desktop applications like [Kindle Previewer](https://www.amazon.com/gp/feature.html?ie=UTF8&docId=1000765261) or [Calibre](https://manual.calibre-ebook.com/conversion.html).

If you're interested in tracking the progress of this task, please see this GitHub issue: https://github.com/pressbooks/pressbooks/issues/2193
