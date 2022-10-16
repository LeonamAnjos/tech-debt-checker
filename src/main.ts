import * as core from "@actions/core";
import {crawl} from "./crawler";

async function run(): Promise<void> {
  try {
    const threshold: string = core.getInput("threshold");
    const strict: string = core.getInput("strict");

    core.debug(`GITHUB_BASE_REF: ${core.getInput("GITHUB_BASE_REF")}`);
    core.debug(`GITHUB_HEAD_REF: ${core.getInput("GITHUB_HEAD_REF")}`);
    core.debug(`GITHUB_REF: ${core.getInput("GITHUB_REF")}`);
    core.debug(`GITHUB_SHA: ${core.getInput("GITHUB_SHA")}`);

    core.debug(`Threshold: ${threshold}`);
    core.debug(`Strict: ${strict}`);

    const result = await crawl();

    core.setOutput("Crawler", `${result}`);

    // core.setOutput("time", new Date().toTimeString());
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
