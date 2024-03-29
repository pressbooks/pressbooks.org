---
title: "Pressbooks and Gutenberg"
date: "2018-11-06T12:00"
tags:
  - "Core"
  - Development
---

We’ve been closely following the development of [Gutenberg][1], WordPress’ new block-based
editor, since its earliest technical prototypes. With the impending release of Gutenberg
in [WordPress 5.0][2] (currently scheduled for November 19), we want to provide an update
to the Pressbooks community on our plans for Gutenberg integration.

In brief: we have deactivated Gutenberg for Pressbooks users, so upgrading to WordPress
5.0 will not change your editing experience. We’ve done this in Pressbooks itself, so
additional plugins like Classic Editor are not required. We’ve made this decision for
several reasons.

## 1. Gutenberg has continued to change significantly up to the projected release date, without a sufficient period of API and UI stability.

At Pressbooks, our small development team accomplishes a lot with limited resources, but
ensuring compatibility with Gutenberg in time for its November 19th launch has proven to
be beyond our capacity. The [lack of clarity][3] in Gutenberg’s development process has
hindered us from integrating Gutenberg into our roadmap. We are now two weeks from its
production release, and Gutenberg’s [API freeze][4] is not yet complete. We’ve been
tracking blocking issues over the last year and a half and have tried to contribute where
possible, but ongoing API and user interface changes have made it difficult for us to keep
on top of things without neglecting Pressbooks core development, and have made us hesitant
to invest our limited resources in building on a codebase that has not yet stabilized.
Once WordPress 5.0 is released, we will be able to evaluate a stable version of Gutenberg
and map out a plan for integration.

## 2. Gutenberg lacks functionality that Pressbooks relies upon.

Because Pressbooks is used to produce content for the web and for export, we leverage
WordPress [custom post statuses][5] to determine whether chapters and other content appear
on the web, in export files, or both. (Custom post statuses do not have a full-featured
public API in WordPress, but they were the best solution for our use case. This is not the
fault of the Gutenberg team—arguably, it’s our fault—but that’s where we are.) We also use
a custom post submission UI to more clearly reflect content status for our users. At this
point in time, Gutenberg [does not support][6] custom post statuses, which is a
fundamental issue for us (and [others who leverage this functionality][7]). Furthermore,
the new post publish panel is [not easily modified][8], and we feel that it’s important to
maintain continuity of this interface for our users. Following the release of WordPress
5.0, we will engage on these specific issues with the WordPress and Gutenberg development
teams so that we can provide our users with a familiar experience in this area.

## 3. Gutenberg does not meet Pressbooks’ accessibility standards.

WordPress Accessibility team lead Rian Rietveld’s [resignation][9] in early October and
the team’s recent [report][10] on Gutenberg have brought widespread attention to the
accessibility shortcomings of the Gutenberg project. These issues are not new, as some
have implied; Rietveld [documented many][11] in March of this year, and tests of Gutenberg
by [Léonie Watson and Sina Bahram][12] highlighted significant problems around the same
time. Rietveld’s resignation, the team’s report, and the conversations surrounding them
have highlighted flaws in the Gutenberg development process and have underscored how hard
it is to retrofit an existing interface if it was not designed with accessibility and
inclusivity in mind. We're currently making accessibility improvement to elements of our
core UI that date back to the early days of our product—so we know this from firsthand
experience! More importantly, though, we’re continually seeking to expand our own shared
understanding of accessibility and inclusive design principles so that new features are
inclusive from day one. We’re grateful to [Jess Mitchell][13], Jonathan Hung, and the rest
of the team at OCAD’s [Inclusive Design Research Centre][14] for their guidance as we work
towards these goals.

We acknowledge the assessment of the WordPress Accessibility team, who [write][15] that
“based on [Gutenberg’s] current status, we cannot recommend that anybody who has a
need for assistive technology allow it to be in use on any sites they need to use at this
time.” We’re grateful to the many accessibility experts and advocates who have shone a
spotlight on accessibility in WordPress, particularly the volunteers who form the
WordPress Accessibility team. We’re also grateful to [Rachel Cherry][16] and the
[WPCampus][17] organization, who are funding a much-needed [accessibility audit][18] of
Gutenberg. As our focus is on continuously improving Pressbooks’ accessibility and all
signs suggest that Gutenberg would undermine this goal in its current state, we will be
awaiting the results of WPCampus’ audit following the release of WordPress 5.0, and we
will evaluate our next steps at that time.

## Closing Thoughts

There are parts of the Gutenberg project that we’re pretty excited about. The ability to
add and edit complex elements visually could be extremely helpful for book production,
allowing educational textboxes and other specialized content to be edited visually while
ensuring clean, semantic output on the front end. We’d love to be able to allow shortcodes
to be edited visually, which Gutenberg supports. And we’re eager to see what comes of
Gutenberg’s [Annotation API][19], which could support expanded integrations with tools
like [Hypothesis][20]. However, knowing what we know at this point and for the reasons
articulated above, we feel that a “wait and see” approach is most prudent for us and our
users. We are committed to tracking each of these issues and doing what we can to ensure
that authors using our software have the best available tools for the job at hand. We look
forward to a future where Gutenberg can be used for making books.

[1]: https://wordpress.org/gutenberg/
[2]: https://make.wordpress.org/core/5-0/
[3]: https://make.wordpress.org/core/2018/10/05/gutenberg-phase-2-leads/#comment-34084
[4]: https://github.com/WordPress/gutenberg/projects/18
[5]: https://developer.wordpress.org/reference/functions/register_post_status/
[6]: https://github.com/WordPress/gutenberg/issues/3144
[7]: https://github.com/AllediaWordPress/PublishPress/issues/296
[8]: https://github.com/danielbachhuber/gutenberg-migration-guide/blob/master/action-post-submitbox.md
[9]: https://rianrietveld.com/2018/10/09/i-have-resigned-the-wordpress-accessibility-team/
[10]: https://make.wordpress.org/accessibility/2018/10/29/report-on-the-accessibility-status-of-gutenberg/
[11]: https://make.wordpress.org/accessibility/2018/03/28/accessibility-of-gutenberg-the-state-of-play/
[12]: https://make.wordpress.org/accessibility/2018/03/27/accessibility-team-meeting-march-26-2018/
[13]: https://twitter.com/jesshmitchell
[14]: https://idrc.ocadu.ca/
[15]: https://make.wordpress.org/accessibility/2018/10/29/report-on-the-accessibility-status-of-gutenberg/
[16]: https://twitter.com/bamadesigner
[17]: https://wpcampus.org/
[18]: https://wpcampus.org/2018/10/gutenberg-a11y-audit-rfp/
[19]: https://github.com/WordPress/gutenberg/pull/7718/
[20]: https://web.hypothes.is/
