import * as core from "@actions/core";
import {crawl} from "./crawler";

async function run(): Promise<void> {
  try {
    const threshold: string = core.getInput("threshold");
    const strict: string = core.getInput("strict");

    core.debug(
      `refs/remotes/origin/${process.env.GITHUB_BASE_REF} vs refs/remotes/origin/${process.env.GITHUB_HEAD_REF}`
    );
    //refs/remotes/origin/ vs refs/remotes/origin/

    core.debug(`Env: ${process.env}`);
    core.debug(`Threshold: ${threshold}`);
    core.debug(`Strict: ${strict}`);

    const result = await crawl(
      process.env.GITHUB_BASE_REF ?? "",
      process.env.GITHUB_HEAD_REF ?? ""
    );

    core.debug(`Strict: ${result}`);
    core.setOutput("Crawler", `${result}`);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
