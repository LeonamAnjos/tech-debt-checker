import * as core from "@actions/core";
import {crawl} from "./crawler";

async function run(): Promise<void> {
  try {
    const threshold: string = core.getInput("threshold");
    const strict: string = core.getInput("strict");

    core.debug(
      `refs/remotes/origin/${process.env.GITHUB_BASE_REF} vs refs/remotes/origin/${process.env.GITHUB_HEAD_REF}`
    );

    core.debug(`Env: ${process.env}`);
    core.debug(`Threshold: ${threshold}`);
    core.debug(`Strict: ${strict}`);

    const result = await crawl(
      `refs/remotes/origin/${process.env.GITHUB_BASE_REF}`,
      `refs/remotes/origin/${process.env.GITHUB_HED_REF}`
    );

    core.debug(`Strict: ${result}`);
    core.setOutput("Crawler", `${result}`);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();

// async function bha(): Promise<void> {
//   const octokit = github.getOctokit("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");

//   // const {data: pullRequest} = await octokit.rest.pulls.get({
//   //   owner: "LeonamAnjos",
//   //   repo: "tech-debt-checker",
//   //   pull_number: 7,
//   //   mediaType: {
//   //     format: "diff"
//   //   }
//   // });

//   const data = await octokit.rest.repos.listCommits({
//     owner: "LeonamAnjos",
//     repo: "tech-debt-checker",
//     ref: "refs/origin"
//   });

//   console.log(data);
// }
