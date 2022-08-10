const core = require('@actions/core');
const github = require('@actions/github');

async function createIssue() {
  try {
    const token = core.getInput('token')
    const title = core.getInput('title')
    const body = core.getInput('body')
    const assignees = core.getInput('assignees')

    const octokit = github.getOctokit(token)
    //const octokit = new github.GitHub(token)

    const response = await octokit.rest.issues.create(
      {
        owner: github.context.repo.owner ,
        repo: github.context.repo.repo,
        // ..github.context.repo
        title: title,
        body: body,
        assignees: assignees ? assignees.split(","): undefined
      }
    )

    //core.setOutput('issue', JSON.stringify(response.data))

    core.startGroup('Logging Issue Response OBJECT')
    console.log(response.data)
    core.endGroup()
    core.setOutput('issue', JSON.stringify(response.data))
  } catch (error) {
      core.setFailed(error.message)
  }
}

createIssue()