import * as core from "@actions/core";
import * as github from "@actions/github";
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

// run();

async function bha(): Promise<void> {
  core.info(`env: ${JSON.stringify(process.env, null, 2)}`);
  core.info("-----------------------------------------");

  core.info(`process.env.GITHUB_BASE_REF: ${process.env.GITHUB_BASE_REF}`);
  core.info(`process.env.GITHUB_HEAD_REF: ${process.env.GITHUB_HEAD_REF}`);
  core.info("-----------------------------------------");

  const pullRequest = github.context.payload.pull_request;

  if (!pullRequest) return;

  const baseSha = pullRequest["base"]["sha"];
  const headSha = pullRequest["head"]["sha"];

  core.info(`base: ${baseSha}`);
  core.info(`base: ${headSha}`);

  core.info(`base: ${JSON.stringify(pullRequest["base"], null, 2)}`);
  core.info(`base: ${JSON.stringify(pullRequest["head"], null, 2)}`);

  core.info("-----------------------------------------");
  core.info(JSON.stringify(github.context, null, 2));
  core.info("-----------------------------------------");
}

bha();
