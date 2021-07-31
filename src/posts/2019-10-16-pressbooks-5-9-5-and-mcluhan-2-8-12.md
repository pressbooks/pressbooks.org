---
title: 'Pressbooks 5.9.5 and McLuhan 2.8.12'
date: '2019-10-16'
author: Dac Chartrand
tags:
  - Changelog
---

We released a patch for Pressbooks and have deployed it to all our hosted networks. We
also bumped McLuhan's version number, but there isn't much in there, only a change to
Theme Tags.

The patch introduces
[two new Data Collectors](https://github.com/pressbooks/pressbooks/tree/dev/inc/datacollector).
Data Collectors _(two words we put together to name an idea we made up)_ are a way of
storing additional WordPress multisite metadata, or enhancing the way it is stored. This
new data is already being used by our
[Network Analytics premium plugin](https://pressbooks.com/2019/08/21/network-analytics-now-available-in-pressbooksedu/).
It will, next, be used to speed up the
[Network API](https://pressbooks.community/t/question-about-cloning/292).

### More Info About The New Code

[Users](https://github.com/pressbooks/pressbooks/blob/dev/inc/datacollector/class-user.php):
WordPress user data is stored in two tables. Running SQL queries to access user info is
generally OK. This user class only extends the metadata. For example: Last login.

[Books](https://github.com/pressbooks/pressbooks/blob/dev/inc/datacollector/class-book.php):
Like the user class, this book class extends the metadata. More importantly, this book
class copies metadata into `wp_blogmeta` (introduced in WordPress 5.1)

WordPress book data is stored in X tables per book. Without this class, for every book on
a network we have to use the expensive `switch_to_blog` function, point PHP to the x
tables we want, run queries, then repeat for every single book.

With the introduction of this data collector, the metadata we need can be queried more
easily. Example using a pivot table (aka. cross-tabulated table:)

```sql
SELECT b.blog_id AS id,
MAX(IF(b.meta_key='pb_word_count',CAST(b.meta_value AS UNSIGNED),null)) AS words,
MAX(IF(b.meta_key='pb_is_public',CAST(b.meta_value AS UNSIGNED),null)) AS public
FROM wp_blogmeta b
GROUP BY id HAVING (public = 0) AND (words > 1000) LIMIT 25;
```

### Changelogs

- <https://github.com/pressbooks/pressbooks/releases/tag/5.9.5>
- <https://github.com/pressbooks/pressbooks-book/releases/tag/2.8.12>

"Thank you for blessing me with a mind to rhyme and two hype feet." -MC Hammer
