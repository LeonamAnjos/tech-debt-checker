import * as core from "@actions/core";
import * as github from "@actions/github";
import {crawl} from "./crawler";

async function run(): Promise<void> {
  try {
    const threshold: string = core.getInput("threshold");
    const strict: string = core.getInput("strict");

    // core.info(`GITHUB_BASE_REF: ${process.env["GITHUB_BASE_REF"]}`);
    // core.info(`GITHUB_HEAD_REF: ${process.env["GITHUB_HEAD_REF"]}`);
    // core.info(`GITHUB_REF: ${process.env["GITHUB_REF"]}`);

    core.info(`GITHUB_SHA: ${process.env["GITHUB_SHA"]}`);
    core.info(`${github.context.sha}: github.context.sha`);
    core.info(`${github.context.payload.pull_request}: github.context.sha`);
    core.info(
      `${github.context.payload["after"]}: github.context.payload["after"]`
    );
    core.info(
      `${github.context.payload["before"]}: github.context.payload["before"]`
    );

    core.info(JSON.stringify(github.context, null, 2));

    core.info(`Threshold: ${threshold}`);
    core.info(`Strict: ${strict}`);

    const result = await crawl();

    core.info(`Strict: ${result}`);
    core.setOutput("Crawler", `${result}`);

    // core.setOutput("time", new Date().toTimeString());
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
