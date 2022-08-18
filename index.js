const core = require('@actions/core');
// const github = require('@actions/github');
const toolCache = require('@actions/tool-cache');
const {version} = require("./dist");

async function action() {
  try {
    const syncVersion = core.getInput("tyk-sync-version", { required: true });

    const tykSyncPath = await toolCache
      .downloadTool(`https://github.com/TykTechnologies/tyk-sync/releases/download/v${syncVersion}/tyk-sync_${syncVersion}_linux_amd64.tar.gz`);

    core.debug(`downloaded tyk-sync to ${tykSyncPath}`);

    const tykSyncExtractedDirectory = await toolCache
      .extractTar(tykSyncPath, `tyk-sync-${version}`);

    core.addPath(tykSyncExtractedDirectory);
  } catch (error) {
    core.setFailed(error.message);
  }
}

if (require.main === module) {
  action();
}

module.exports = action;
