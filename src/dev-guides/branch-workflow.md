---
title: Branch Workflow
slug: ''
metaDesc: Description of branch naming convention used by Pressbooks for its public repositories.
---
We use the following branch naming conventions for pressbooks/pressbooks and other public repositories that we maintain:

- **dev** is a general-purpose work-in-progress branch and the default branch for our repositories. All PRs should be opened against `dev` and must pass our CI/CD pipeline and all coding standards before they are merged. When changes to the `dev` branch for a given repo have been fully tested and determined ready for release, a [new release](https://github.com/pressbooks/reusable-workflows/blob/main/.github/workflows/prepare-release.yml) is tagged and created.
- Any other branches you find are for feature development prior to merging into `dev`. Use at your own risk.
- [Tags](https://github.com/pressbooks/pressbooks/tags) represent releases. If you are downloading a release for installation, you should typically download the package package (e.g. `pressbooks-6.6.0.zip`) from a repository's release list (e.g. [https://github.com/pressbooks/pressbooks/releases/](https://github.com/pressbooks/pressbooks/releases/)) as opposed to the source code.