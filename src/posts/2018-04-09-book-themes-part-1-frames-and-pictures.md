---
title: 'Book Themes, Part 1: Frames and Pictures'
date: '2018-04-09T12:00'
tags:
  - Development
---

One of the most complex aspects of Pressbooks is the way our book themes work across
different formats. It even confuses us sometimes. In a series of posts this week, I hope
to clarify some of the concepts that underpin our book theming system, reflect on how it
has evolved over the years, and outline where we hope to take book themes in the future.

## A Framing Device

Conceptually, I find it helpful to think of our book themes as two things: a frame and a
picture.

[caption id="attachment_857" align="aligncenter"
width="233"]![A black and white photo of Marshall McLuhan leaning against a mantlepiece in a hand-drawn picture frame.](/images/mcluhan-233x300.png)
Marshall McLuhan, framed. (Wikimedia Commons)[/caption]

Take [McLuhan](https://github.com/pressbooks/pressbooks-book/), our default book theme.
It's really two elements in one. The first element is a (fairly conventional) WordPress
theme which provides the user interface for reading a Pressbooks book on the web. This is
the "frame" — the user interface (UI) for readers of a webbook. The other component is the
"picture" — styles which format the content of the book for display, either within the
webbook "frame" or in other formats such as PDF, EPUB, or MOBI.

McLuhan provides the UI for all Pressbooks webbooks, even those that use other styles for
their content. All other book themes are WordPress
[child themes](https://codex.wordpress.org/Child_Themes), which means that they inherit
the "frame" (the webbook UI) from McLuhan, the parent theme[1. That being said, child
themes _can_ override components of the parent themes, so one could make a child theme
that changed any aspect of the webbook UI by
[replacing or modifying template files](https://codex.wordpress.org/Child_Themes#Template_Files).].
So if you change your book's theme to
[Jacobs](https://github.com/pressbooks/pressbooks-jacobs/), you're putting a new "picture"
in the original frame:

[caption id="attachment_867" align="aligncenter"
width="233"]![A black and white photo of Jane Jacobs in a hand-drawn picture frame.](/images/jacobs-233x300.png)
Jane Jacobs, framed. (Wikimedia Commons)[/caption]

To demonstrate this more concretely, here's a webbook using McLuhan:

[caption id="attachment_871" align="aligncenter"
width="840"]![A screenshot of the first chapter of Herman Melville's ](/images/mcluhan-webbook-1024x524.png)
Moby Dick in McLuhan.[/caption]

And the same webbook using Jacobs:

[caption id="attachment_873" align="aligncenter"
width="840"]![A screenshot of ](/images/jacobs-webbook-1024x524.png) Moby Dick in
Jacobs.[/caption]

No difference except the typography of the book content.

## Luther's Legacy

Our old default book theme was [Luther](https://github.com/pressbooks/pressbooks-luther/).
When we built Luther, we made a tactical error and mixed the content styles for web into
the UI styles. By failing to separate these concerns, we made the transition from Luther
to McLuhan more awkward than it could have been; when we rebuilt the webbook UI in
McLuhan, we had to
[supply some (now missing) content styles](https://github.com/pressbooks/pressbooks-book/pull/163)
for old themes[1. Only old themes, though! More on that in part two.] that had been
relying on the Luther webbook stylesheet to properly display some of the webbook content.
We've learned from this mistake, and all of our work on webbook UI and web content styles
going forward will emphasize a proper separation of concerns.

## Next: What's Buckram?

The next part of this series will be a deep dive into
[Buckram](https://github.com/pressbooks/buckram/), the SCSS book component library that is
at the heart of our new batch of themes. Until next time!
