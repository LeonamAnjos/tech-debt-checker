import * as core from "@actions/core";
import {exec} from "child_process";

const execute = (command: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    core.info(`[Exec] ${command}`);
    exec(command, (error, stdout) => {
      if (error) reject(error);

      resolve(stdout.trim());
    });
  });
};

export {execute};
