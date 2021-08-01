---
title: 'Moving Half a Million Database Tables to AWS Aurora (Part 2)'
date: '2017-11-07T12:00'
author: Dac Chartrand
tags:
  - 'Core'
---

[Quick recap](https://pressbooks.org/blog/2017/10/19/moving-half-a-million-database-tables-to-aws-aurora-part-1/):
Migrate half a million database tables from a single bare metal server with 1 database to
101 database slices on AWS Aurora.

Wait, half a million database tables?! Answered in
[Part 1](https://pressbooks.org/blog/2017/10/19/moving-half-a-million-database-tables-to-aws-aurora-part-1/).

## Plan

1. Stop the server, take an LVM snapshot.
2. Use [mydumper](https://github.com/maxbube/mydumper) to dump the snapshot to SQL files.
3. rysnc these to the new server.
4. Use myloader to load the SQL files into the new databases.

<figure>

![](/images/Migration-Kanban.png)

<figcaption>A more detailed view of our plan as seen in our migration kanban</figcaption>

</figure>

## Captain Not So Obvious

> Why not setup the Aurora as a replica and then switch over?

Because our MariaDB server was a bare metal box outside of AWS. The
[read Replica docs](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Migration.RDSMySQL.html) imply
that MySQL has to already be in AWS for that to work. If that's not enough
[this doc says use mysqldump to start, then sync after.](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.Procedural.Importing.NonRDSRepl.html)
[This doc also says use mysqldump.](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.Procedural.Importing.External.Repl.html)
All signs point to nope.

> Why not DMS?

Answered in
[Part 1](https://pressbooks.org/blog/2017/10/19/moving-half-a-million-database-tables-to-aws-aurora-part-1/).

Mostly, at the end of the day, because our
[hosted networks](https://pressbooks.education/) are already on AWS it was simply more
cost effective to shut down our freemium site and migrate in one swoop than to have our
whole team keep at this for weeks, possibly months.

## Epilogue: What About Uploads?

Each book has media library files *(GIF, PNG, JPG, EPUB, PDF, etc)*. A few days before the
migration, we copied all files from the production server's `uploads/` directory using
`rsync`:

```bash
rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" someuser@oldpressbooksdotcom:/path/to/uploads/ /path/to/uploads/ --progress
```

This process took about 10 hours.

Then, on migration day, we ran the same command again with the `--delete` option to update
the new server with the latest files from the old server and remove any files that have
been deleted on the old server:

```bash
rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" someuser@oldpressbooksdotcom:/path/to/uploads/ /path/to/uploads/ --progress
```

Much quicker! (around 7 minutes)

## Launch it!

> “If we get into the trees it could be rather disastrous, so we’ve got to hit the roses.”
> – [Ken Carter](http://hnmag.ca/festivals/aiming-for-the-roses-with-devil-at-your-heels/)

Scripts from
[Part 1 (read it already!)](https://pressbooks.org/blog/2017/10/19/moving-half-a-million-database-tables-to-aws-aurora-part-1/)
were modified to include [Slack](https://slack.com/) notifications:

```bash
notify() {
  read -d '' payLoad << EOF
  {
    "channel": "#operations",
    "username": "Pressbot",
    "icon_emoji": ":closed_book:",
    "text": "Slice \`${1}\` has been imported on AWS."
  }
EOF

  curl \
    --write-out %{http_code} \
    --silent \
    --output /dev/null \
    -X POST \
    -H 'Content-type: application/json' \
    --data "${payLoad}" "https://hooks.slack.com/services/<SLACK_WEBHOOK_ID>"
}

# Usage

notify $slice
```

<figure>

![](/images/pressbot-e1510002038580.png)

<figcaption>Slack enhanced scripts.</figcaption>

</figure>

In an effort to reduce downtime we imported slices as soon as they were transferred.
Dumping was faster than imports.

<figure>

![Pressbot](/images/pressbot2.png)

<figcaption>Still slacking!</figcaption>

</figure>

Ned working hard:

<figure>

![Ned](/images/ned-again-225x300.jpg)

<figcaption>screen -r, control+a control+d,
repeat</figcaption>
</figure>

All while coding sprint tasks in between.

## Things That Went Wrong

We noticed an embarrassing typo in the first few database slices we imported. We had to
redo them because
[renaming a database with tens of thousands of tables in it is not obvious](https://stackoverflow.com/questions/67093/how-do-i-quickly-rename-a-mysql-database-change-schema-name).

I ordered takeout from the wrong [fish & chips shop](http://www.comptoir21.com/). I had to
take a subway 30 minutes to downtown to get it. _(Psst [Foodora](https://www.foodora.ca),
your geolocation feature sucks!)_

Otherwise, nothing. We landed in the roses.

## Timeline

- 8:00: Migration started.
- 10:40: Database migration started.
- 19:10: Database migration completed!
- 19:30: Migration completed.
- Total time: 11 hours 30 minutes.

DONE. Exciting to turn the page on this. Thanks for reading.
