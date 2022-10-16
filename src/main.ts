import * as core from "@actions/core";
import {wait} from "./wait";

async function run(): Promise<void> {
  try {
    const threshold: string = core.getInput("threshold");
    const strict: string = core.getInput("strict");
    core.debug(`Threshold: ${threshold}`);
    core.debug(`Strict: ${strict}`);

    core.debug(new Date().toTimeString());
    await wait(parseInt(threshold, 10));
    core.debug(new Date().toTimeString());

    core.setOutput("time", new Date().toTimeString());
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
