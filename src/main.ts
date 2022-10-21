import * as core from "@actions/core";
import * as github from "@actions/github";
import {crawl} from "./crawler";

async function run(): Promise<void> {
  try {
    const threshold: string = core.getInput("threshold");
    const strict: string = core.getInput("strict");
    const options: string = core.getInput("options");

    core.info(`Threshold: ${threshold}`);
    core.info(`Strict: ${strict}`);
    core.info(`Options: ${options}`);

    const pullRequest = github.context.payload.pull_request;

    if (!pullRequest) return;

    const baseSha = pullRequest["base"]["sha"];
    const headSha = pullRequest["head"]["sha"];

    core.info(`base: ${baseSha}`);
    core.info(`head: ${headSha}`);

    const result = await crawl(baseSha, headSha);

    core.info(`Strict: ${result}`);
    core.setOutput("Crawler", `${result}`);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();

// async function bha(): Promise<void> {
//   core.info(`env: ${JSON.stringify(process.env, null, 2)}`);
//   core.info("-----------------------------------------");

//   core.info(`process.env.GITHUB_BASE_REF: ${process.env.GITHUB_BASE_REF}`);
//   core.info(`process.env.GITHUB_HEAD_REF: ${process.env.GITHUB_HEAD_REF}`);
//   core.info("-----------------------------------------");

//   const pullRequest = github.context.payload.pull_request;

//   if (!pullRequest) return;

//   const baseSha = pullRequest["base"]["sha"];
//   const headSha = pullRequest["head"]["sha"];

//   core.info(`base: ${baseSha}`);
//   core.info(`head: ${headSha}`);

//   core.info(`base: ${JSON.stringify(pullRequest["base"], null, 2)}`);
//   core.info(`head: ${JSON.stringify(pullRequest["head"], null, 2)}`);

//   core.info("-----------------------------------------");
//   core.info(JSON.stringify(github.context, null, 2));
//   core.info("-----------------------------------------");
// }

// bha();
