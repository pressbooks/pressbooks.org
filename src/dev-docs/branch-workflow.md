---
title: Branch Workflow
permalink: /dev-docs/branch-workflow/
---

For pressbooks/pressbooks and other repos that we maintain, we use the following branch naming conventions: 

- **production** is a stable branch. You'll find it running on all our hosted networks and reflected in our latest tagged releases.
- **staging** is used in bedrocks and infrastructure repos to reflect the current state of our staging environment. It receives changes from `dev` for final testing before they are pushed/merged to production.
- **dev** is a general-purpose work-in-progress branch and the default branch for our repositories. All PRs should be opened against `dev` and must pass our CI/CD pipeline and all coding standards before they are merged. When changes to the `dev` branch for a given repo have been fully tested and determined ready for release, commits are pushed/merged from this branch to `staging` and/or `production`.
- Any other branches you find are for feature development prior to merging into `dev`. Use at your own risk. 
- [Tags](https://github.com/pressbooks/pressbooks/tags) represent releases. If you are downloading a release for installation, you should typically download the package package (e.g. `pressbooks-6.6.0.zip`) from a repository's release list (e.g. [https://github.com/pressbooks/pressbooks/releases/](https://github.com/pressbooks/pressbooks/releases/)) as opposed to the source code.
