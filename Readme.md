This repository contains work-in-progress material for longer-form [Long-term Research](https://khanacademy.org/research) reports.

Our plan is to build the relevant Javascript into one black-box file for each report, which `webapp` can then `<link>` in some barebones template, so that we maximally isolate these reports from `webapp` and vice-versa.

First, run `yarn install` to install the dependencies. You'll need a copy of `webapp` checked out in the parent of whatever folder you check this out; i.e. you might have `~/khan/webapp` and `~/khan/long-term-research-reports`.

Then, to work on the reports locally, run `yarn run start`; this will start a local hot-reloading server at `localhost:3100`.

To produce built output, run `yarn run build`.