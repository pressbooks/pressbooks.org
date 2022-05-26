---
title: Branch Workflow
permalink: /dev-docs/branch-workflow/
---

These are our branches:

- **[master](https://github.com/pressbooks/pressbooks/tree/master)** is our stable branch. You'll find it running on all our hosted networks and reflected in our [latest release](https://github.com/pressbooks/pressbooks/releases/latest/).
- **[dev](https://github.com/pressbooks/pressbooks/tree/dev)** is a general-purpose work-in-progress branch. It is merged with `master` when a new release is forthcoming.
- **[hotfix](https://github.com/pressbooks/pressbooks/tree/hotfix)** is for emergency patches. It exists solely to avoid conflicts with `dev`.
- Any other branches you find are for feature development prior to merging into `dev`. Use at your own risk.
- [Tags](https://github.com/pressbooks/pressbooks/tags) represent releases, but if you are downloading a release for installation, you should download the package (e.g. `pressbooks-5.34.0.zip`) from [releases](https://github.com/pressbooks/pressbooks/releases/) as opposed to the source code.
