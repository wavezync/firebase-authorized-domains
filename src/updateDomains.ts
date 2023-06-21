import {google} from 'googleapis'
import {
  CredentialBody,
  ExternalAccountClientOptions,
  GoogleAuth
} from 'google-auth-library'
import * as core from '@actions/core'

export type Action = 'add' | 'remove'

export const updateAuthorizedDomain = async (
  action: Action,
  domain: string,
  credentials: CredentialBody | ExternalAccountClientOptions
): Promise<void> => {
  // Acquire an auth client, and bind it to all future calls
  const auth = new GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/identitytoolkit',
      'https://www.googleapis.com/auth/firebase',
      'https://www.googleapis.com/auth/cloud-platform'
    ]
  })

  const authClient = await auth.getClient()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore line because of google lib problem
  google.options({auth: authClient})

  // Get the Identity Toolkit API client
  const idToolkit = google.identitytoolkit('v2')

  /**
   * When calling the methods from the Identity Toolkit API, we are
   * overriding the default target URLs and payloads (that interact
   * with the v3 endpoint) so we can talk to the v2 endpoint, which is
   * what Firebase Console uses.
   */

  // Generate the request URL
  const projectId = await auth.getProjectId()
  const name = `projects/${projectId}/config`

  // Get current config so we can use it when we later update it
  core.debug(`Getting current config for ${projectId}`)
  const currentConfig = await idToolkit.projects.getConfig({
    name
  })
  core.debug('Google API response:')
  core.debug(JSON.stringify(currentConfig.data))

  // Update the config based on the values that already exist
  if (action === 'add') {
    core.debug(`Adding ${domain} to ${projectId}`)
    console.log(`Adding ${domain} to ${projectId}`, domain)

    if (currentConfig.data.authorizedDomains?.includes(domain)) {
      console.log(`Domain ${domain} already exists in ${projectId}`)
      return
    }

    const result = await idToolkit.projects.updateConfig({
      name,
      updateMask: 'authorizedDomains',
      requestBody: {
        authorizedDomains: [
          ...(currentConfig.data.authorizedDomains || []),
          domain
        ]
      }
    })
    core.debug('Google API response:')
    core.debug(JSON.stringify(result.data))

    console.log(`Added ${domain} to ${projectId}`)
  }

  if (action === 'remove') {
    core.debug(`Removing ${domain} from ${projectId}`)
    console.log(`Removing ${domain} from ${projectId}`, domain)

    if (!currentConfig.data.authorizedDomains?.includes(domain)) {
      console.log(`Domain ${domain} does not exist in ${projectId}`)
      return
    }

    const result = await idToolkit.projects.updateConfig({
      name,
      updateMask: 'authorizedDomains',
      requestBody: {
        authorizedDomains: [
          ...(currentConfig.data.authorizedDomains || []).filter(
            (d: string) => d !== domain
          )
        ]
      }
    })
    core.debug('Google API response:')
    core.debug(JSON.stringify(result.data))

    console.log(`Removed ${domain} from ${projectId}`)
  }
}
