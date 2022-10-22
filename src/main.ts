import * as core from "@actions/core";
// import * as github from "@actions/github";
// import {crawl} from "./crawler";
import {execute} from "./utils";

// git init /home/runner/work/tech-debt-checker/tech-debt-checker
// git remote add origin https://github.com/LeonamAnjos/tech-debt-checker

// git -c protocol.version=2 fetch --no-tags --prune --progress --no-recurse-submodules --depth=1 origin +8a0e3959d0eea862c0aad21e17bc0401d918948c:refs/remotes/pull/7/merge
// git checkout --progress --force refs/remotes/pull/7/merge

// git -c protocol.version=2 fetch --no-tags --prune --progress --no-recurse-submodules --depth=1 origin master
// git grep -E 'todo' HEAD
// git grep -E 'todo' origin/master

async function run(): Promise<void> {
  try {
    const headRef = "HEAD";
    const baseRef = process.env.GITHUB_BASE_REF;

    core.info(`headRef: ${headRef}`);
    core.info(`baseRef: ${baseRef}`);

    core.info(
      await execute(
        `git -c protocol.version=2 fetch --no-tags --prune --progress --no-recurse-submodules --depth=1 origin ${baseRef}`
      )
    );

    const configs = ["error", "todo", "import"];

    for (const c of configs) {
      core.info(await execute(`git grep -E '${c}' ${headRef}`));
      core.info(await execute(`git grep -E '${c}' ${baseRef}`));
    }

    for (const c of configs) {
      core.info(await execute(`git grep -E '${c}' ${headRef} | wc -l`));
      core.info(await execute(`git grep -E '${c}' ${baseRef} | wc -l`));
    }

    // const threshold: string = core.getInput("threshold");
    // const strict: string = core.getInput("strict");
    // const options: string = core.getInput("options");

    // core.info(`Threshold: ${threshold}`);
    // core.info(`Strict: ${strict}`);
    // core.info(`Options: ${options}`);

    // const pullRequest = github.context.payload.pull_request;

    // if (!pullRequest) return;

    // const baseSha = pullRequest["base"]["sha"];
    // const headSha = pullRequest["head"]["sha"];

    // core.info(`base: ${baseSha}`);
    // core.info(`head: ${headSha}`);

    // const result = await crawl(baseSha, headSha);

    // core.info(`Strict: ${result}`);
    // core.setOutput("Crawler", `${result}`);
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
