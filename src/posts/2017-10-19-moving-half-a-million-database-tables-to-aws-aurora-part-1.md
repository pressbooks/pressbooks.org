---
title: 'Moving Half a Million Database Tables to AWS Aurora (Part 1)'
date: '2017-10-19T12:00'
author: Dac Chartrand
tags:
  - 'Core'
---

This post is about migrating Pressbooks.com to AWS.

## Does It Scale?

At [Pressbooks](https://pressbooks.org/) we use
[WordPress Multisite](https://codex.wordpress.org/Create_A_Network) as a development
platform. [Pressbooks changes WordPress](https://github.com/pressbooks/pressbooks) and
makes every blog a book.

The prevailing wisdom of the day is that a relational database should have a manageable
set of tables with lots of rows of data in them ...and then there's WordPress.

WP Multisite creates
[10 database tables](https://codex.wordpress.org/Database_Description#Site_Specific_Tables)
for every blog _(or in our case: for every book.)_ Tables share IDs but they are not
enforced at the database level. There are no foreign key constraints, no triggers, nor
routines. It's simple no frills MySQL.

Pressbooks dot com is currently running on a single bare metal server. _(Our hosted
instances are already on AWS)_ This server has a single MariaDB database with 60,000 books
in it. When we do the math that's over 600,000 tables in one database.
[Are you nuts?!](http://www.askbjoernhansen.com/2008/02/14/10000_tables_in_one_mysql_database.html)
Unusual? Horrible? Yet
[entirely possible](https://dev.mysql.com/doc/refman/5.7/en/database-count-limit.html),
[even plausible](https://www.percona.com/blog/2017/10/01/one-million-tables-mysql-8-0/).

I've met people who worked at Automattic and
[from the stories, I heard](https://www.meetup.com/wp-mtl/events/240377606/) WordPress dot
com uses the same WP Multisite technology but instead of half a million tables it's over a
billion tables *(probably not all in the same database though, more on that later)*.

I call this the Schrödinger's Cat of database design because so long as we don't look it's
alive?

## Prerequisites

As I said, we already host hundreds of WP Multisite networks on AWS. We build, manage, and
deploy to our infrastructure using [Terraform](https://www.terraform.io/),
[Ansible](https://www.ansible.com/), [wp-cli](http://wp-cli.org/) and
[all things competent](https://github.com/roots/trellis). We simply just, sort of, well,
neglected to move our freemium site over because we were too busy.

The time has come.

## Research

We tried `mysqldump`. It was too slow. Our tests showed that a dump would take days.

Some colleagues recommended [AWS DMS](https://aws.amazon.com/dms/). It did not work.  Some
reasons:

- [The `AUTO_INCREMENT` attribute is not migrated.](http://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.MySQL.html#CHAP_Source.MySQL.Limitations)
- WP Multisite tables are prefixed `wp_1_, wp_2_, wp_3_, ...` MySQL considers the
  underscore a
  [one character wildcard](https://stackoverflow.com/questions/8236818/why-does-underscore-match-hyphen)
  when used in LIKE queries, DMS provided no way to escape it for table filters.
- Unexplained crashing on anything less than a `c4.large` _(failed last Error The task
  stopped abnormally Stop Reason RECOVERABLE_ERROR Error Level RECOVERABLE)_
- Mostly, the fastest migration we could get going, running 4 tasks in parallel, was an
  ETA of 10 days

We asked for help. [Ned](https://pressbooks.org/blog/author/ned/) had a conference call
with a reputable consulting firm and they gave us a quote: $34K USD + travel & on-site
expenses.

![Coffee spitting ](/images/coffee-spitting.gif)

Next, our research led us to [mydumper](https://github.com/maxbube/mydumper). From the
README:

> == What is mydumper? Why? ==
>
> - Parallelism (hence, speed) and performance (avoids expensive character set conversion
>   routines, efficient code overall)
> - Easier to manage output (separate files for tables, dump metadata, etc, easy to
>   view/parse data)
> - Consistency - maintains snapshot across all threads, provides accurate master and
>   slave log positions, etc
> - Manageability - supports PCRE for specifying database and tables inclusions and
>   exclusions

So far so good...

> \== How to build it? ==

![Jerry Seinfeld leaving](/images/jerry-seinfeld-leaving.gif)

Just kidding. It turns out we don't have to build mydumper. On
Ubuntu `sudo apt install mydumper` works fine. Similar command using `yum` on CentOS.

Our tests conclude that mydumper finishes in hours instead of days.

## Plan

It is our opinion that this kind of problem is better suited for a
[document-oriented database](https://en.wikipedia.org/wiki/Document-oriented_database).
Given that this is the database design we inherited, there's not much we can do about it,
so we'll try our best with what we've got. ¯\\_(ツ)_/¯

At a billion tables, Automattic has already established its own internal best practices
with plugins like [HypderDB](https://github.com/Automattic/hyperdb). Unfortunately HyperDB
doesn't have [Composer](https://getcomposer.org/) support and doesn't look
maintained. [LudicrousDB](https://github.com/stuttter/ludicrousdb), a Composer compatible
drop-in that works with our [existing tech stack](https://github.com/roots/bedrock/), to
the rescue.

> LudicrousDB is an advanced database interface for WordPress that supports replication,
> fail-over, load balancing, and partitioning, based on Automattic's HyperDB drop-in.

With LudicrousDB tested and working, we are moving towards a 101 slice approach. 1 slice
for core tables and 100 slices for books.

The idea is to use the last **two digits** of a book ID to pick one of 100 slices. If this
becomes unmanageable in the future _(important to remember that we already have over half
a million_ tables _in 1 database and
[things are fine](http://knowyourmeme.com/memes/this-is-fine))_, we can change the
splitting algorithm by adding a condition to use the last **X digits** on books with IDs
bigger than **Y**.

## Code

_For informational purposes only. Read the snippets and reason about them. Copy/paste at
your own peril._

## LudicrousDB  Callback

```php
/**
 * Slices
 *
 * We can predict what slice a blog is in by looking
 * at the last two digits of the id. Examples:
 *
 * + blog_id: 9, in db09
 * + blog_id: 74, in db74
 * + blog_id: 999989, in db89
 * + blog_id: 9200, in db00
 *
 * @param $query
 * @param \LudicrousDB $wpdb
 *
 * @return string
 */
function pb_db_callback( $query, $wpdb ) {
  if ( preg_match( "/^{$wpdb->base_prefix}\d+_/i", $wpdb->table ) ) {
    $last_two_digits = (int) substr( $wpdb->blogid, -2 );
    $db = sprintf( 'db%02d', $last_two_digits ); // db00, db01, db02, ..., db99
    return $db;
  } else {
    return 'global';
  }
}
$wpdb->add_callback( 'pb_db_callback' );
```

### Export DB Into 101 Slices:

```bash
#!/bin/bash

# This script will CREATE 101 directories in current
# working directory, you have been warned!

db='old_database_name'

sudo mydumper --regex="^${db}\.wp_[a-zA-Z]+.*" --database="${db}" --outputdir="core" --build-empty-files
for ((i=0; i<=99; i++)); do
  ii=`printf %02d $i`
  sudo mydumper --regex="^${db}\.(wp_${i}_|wp_\d+${ii}_).*" --database="${db}" --outputdir="${ii}" --build-empty-files
done
```

### Import 101 Slices:

```bash
#!/bin/bash

# This script will READ 101 directories in current
# working directory

db='new_database_name'

sudo myloader --directory="core" --database="${db}" --overwrite-tables
for ((i=0; i<=99; i++)); do
  ii=`printf %02d $i`
  sudo myloader --directory="${ii}" --database="${db}_${ii}" --overwrite-tables
done
```

## Did it work?

<https://youtu.be/RA5WCpFY0PE>

To be continued in Part 2...

## Bonus tips:

Because Pressbooks has so many MySQL tables, the Clients I use are always getting stuck or
freezing. Here are some tricks I use to keep sane:

- Don't let MySQL Workbench load the table schemas. Set up your GUI so that schemas are in
  a separate tab, disable autoloading, autocomplete, etc. _(Edit ⇨ Preferences ⇨ SQL
  Editor)_
- Disable MySQL CLI auto-completion
  with [`--disable-auto-rehash`](https://dev.mysql.com/doc/refman/5.7/en/mysql-command-options.html#option_mysql_auto-rehash)
