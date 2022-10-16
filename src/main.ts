import * as core from "@actions/core";
import {crawl} from "./crawler";

async function run(): Promise<void> {
  try {
    const threshold: string = core.getInput("threshold");
    const strict: string = core.getInput("strict");

    core.debug(`Threshold: ${threshold}`);
    core.debug(`Strict: ${strict}`);

    const result = await crawl();

    core.debug(`Strict: ${result}`);
    core.setOutput("Crawler", `${result}`);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
