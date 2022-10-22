import * as core from "@actions/core";
import {execute} from "./utils";

// const refNames = ["refs/remotes/origin/master", "HEAD"];
const configs = ["error", "todo", "import"];

// const revParseCommand = (refName: string): string => `git rev-parse ${refName}`;
const grepCommand = (predicate: string, gitSha: string): string =>
  `git grep -E '${predicate}' ${gitSha} | wc -l`;

const crawl = async (base: string, head: string): Promise<string[][]> => {
  core.info(await execute("git show-ref"));

  // const gitSha = await Promise.all([
  //   execute(revParseCommand(refNames[0])),
  //   execute(revParseCommand(refNames[1]))
  // ]);

  // core.debug(`gitSha: ${gitSha}`);

  const result: string[][] = await Promise.all([
    Promise.all(
      configs.map((config: string) => grepCommand(config, base)).map(execute)
    ),
    Promise.all(
      configs.map((config: string) => grepCommand(config, head)).map(execute)
    )
  ]);

  core.info(`Crawler results: ${result}`);

  return result;
};

export {crawl};
