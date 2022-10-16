import * as core from "@actions/core";
import {exec} from "child_process";

const refNames = ["refs/heads/master", "HEAD"];
const configs = ["error", "todo", "import"];

const revParseCommand = (refName: string): string => `git rev-parse ${refName}`;
const grepCommand = (predicate: string, gitSha: string): string =>
  `git grep -E '${predicate}' ${gitSha} | wc -l`;

const execute = (command: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) reject(error);

      resolve(stdout.trim());
    });
  });
};

const crawl = async (): Promise<string[][]> => {
  const gitSha = await Promise.all([
    execute(revParseCommand(refNames[0])),
    execute(revParseCommand(refNames[1]))
  ]);

  core.debug(`gitSha: ${gitSha}`);

  const commands = [
    configs.map((config: string) => grepCommand(config, gitSha[0])),
    configs.map((config: string) => grepCommand(config, gitSha[1]))
  ];

  core.debug(`Commands: ${commands}`);

  const result: string[][] = await Promise.all([
    Promise.all(
      configs
        .map((config: string) => grepCommand(config, gitSha[0]))
        .map(execute)
    ),
    Promise.all(
      configs
        .map((config: string) => grepCommand(config, gitSha[1]))
        .map(execute)
    )
  ]);

  core.debug(`Crawler results: ${result}`);

  return result;
};

export {crawl};