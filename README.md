[![Build](https://github.com/wavezync/firebase-authorized-domains/actions/workflows/check-dist.yml/badge.svg)](https://github.com/wavezync/firebase-authorized-domains/actions/workflows/check-dist.yml) [![Security](https://github.com/wavezync/firebase-authorized-domains/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/wavezync/firebase-authorized-domains/actions/workflows/codeql-analysis.yml)

# Update Firebase Authorized Domains

Updating firebase authorized domains in a preview environment is a pain.
This action will help you to easily add a domain to your firebase project within CI pipeline and have
review apps right away after deployment.

## Usage in actions

### Obtaining an Service Account Key

1. Login to Firebase > Project Settings > Service Accounts
2. Click **Manage service account permission** and go to google cloud console
3. Click **Create Service Account**
4. Give a name for your service account
5. In **Grant this service account access to project** section, add **Editor** and **Firebase Admin** roles
6. Save Service Account
7. Go back to Service Accounts Screen
8. Click Keys > Add Key > JSON
9. Download generated key
10. Copy content of Key
11. Go to Github and set this Key file content as a secret
12. Use it in your action :rocket:

### Add a domain to authorized domains

```yaml
- name: Update Firebase Authorized Domains
  uses: wavezync/firebase-authorized-domains@v1.0.0
  with:
    service_account_key_json: ${{ secrets.service_account_key_json }}
    domain: "https://example.com"
    action: add 
```

### Remove a domain to authorized domains

```yaml
- name: Update Firebase Authorized Domains
  uses: wavezync/firebase-authorized-domains@v1.0.0
  with:
    service_account_key_json: ${{ secrets.service_account_key_json }}
    domain: "https://example.com"
    action: remove 
```

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
