import * as core from '@actions/core'
import {Action, updateAuthorizedDomain} from './updateDomains'

async function run(): Promise<void> {
  try {
    const svc_account_key_json: string = core.getInput(
      'service_account_key_json'
    )
    const action = core.getInput('action')
    const domain = core.getInput('domain')

    core.debug('Running action for updating firebase authorized domains')
    await updateAuthorizedDomain(
      action as Action,
      domain,
      JSON.parse(svc_account_key_json) as any
    )
    core.debug('Action completed successfully')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
