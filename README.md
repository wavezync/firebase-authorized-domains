[![Build](https://github.com/wavezync/firebase-authorized-domains/actions/workflows/check-dist.yml/badge.svg)](https://github.com/wavezync/firebase-authorized-domains/actions/workflows/check-dist.yml) [![Security](https://github.com/wavezync/firebase-authorized-domains/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/wavezync/firebase-authorized-domains/actions/workflows/codeql-analysis.yml)

# Update Firebase Authorized Domains

Updating firebase authorized domains in a preview environment is a pain.
This action will help you to easily add a domain to your firebase project within CI pipeline and have
review apps right away after deployment.

## Code in Main

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)


## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
