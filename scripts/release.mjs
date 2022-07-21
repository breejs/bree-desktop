import process from 'node:process';
import request from 'superagent';
import { getOctokit, context } from '@actions/github';

const UPDATER_TAG = 'updater';
const UPDATER_FILE = 'release.json';

if (process.env.GITHUB_TOKEN === undefined) {
  throw new Error('GITHUB_TOKEN not found.');
}

const getSignature = async (url) => {
  const response = await request.get(url).type('application/octet-stream');

  return response.text;
};

const github = getOctokit(process.env.GITHUB_TOKEN);
const { repos } = github.rest;
const repoMetaData = {
  owner: context.repo.owner,
  repo: context.repo.repo
};

const { data: latestRelease } = await repos.getLatestRelease(repoMetaData);

const releaseData = {
  version: latestRelease.tag_name,
  notes: `https://github.com/${repoMetaData.owner}/${repoMetaData.repo}/releases/tag/${latestRelease.tag_name}`,
  pub_date: new Date().toISOString(),
  platforms: {
    'darwin-aarch64': {
      signature: '',
      url: ''
    },
    'darwin-linux': {
      signature: '',
      url: ''
    },
    'linux-x86_64': {
      signature: '',
      url: ''
    },
    'windows-x86_64': {
      signature: '',
      url: ''
    }
  }
};

const promises = latestRelease.assets.map(
  async ({ name, browser_download_url }) => {
    // win64 url
    if (name.endsWith('.msi.zip') && name.includes('en-US')) {
      releaseData.platforms['windows-x86_64'].url = browser_download_url;
    }

    // win64 signature
    if (name.endsWith('.msi.zip.sig') && name.includes('en-US')) {
      const sig = await getSignature(browser_download_url);
      releaseData.platforms['windows-x86_64'].signature = sig;
    }

    // darwin url (intel)
    if (name.endsWith('.app.tar.gz') && !name.includes('aarch')) {
      releaseData.platforms['darwin-intel'].url = browser_download_url;
    }

    // darwin signature (intel)
    if (name.endsWith('.app.tar.gz.sig') && !name.includes('aarch')) {
      const sig = await getSignature(browser_download_url);
      releaseData.platforms['darwin-intel'].signature = sig;
    }

    // darwin url (aarch)
    if (name.endsWith('aarch64.app.tar.gz')) {
      releaseData.platforms['darwin-aarch64'].url = browser_download_url;
    }

    // darwin signature (aarch)
    if (name.endsWith('aarch64.app.tar.gz.sig')) {
      const sig = await getSignature(browser_download_url);
      releaseData.platforms['darwin-aarch64'].signature = sig;
    }

    // linux url
    if (name.endsWith('.AppImage.tar.gz')) {
      releaseData.platforms['linux-x86_64'].url = browser_download_url;
    }

    // linux signature
    if (name.endsWith('.AppImage.tar.gz.sig')) {
      const sig = await getSignature(browser_download_url);
      releaseData.platforms['linux-x86_64'].signature = sig;
    }
  }
);

await Promise.allSettled(promises);

if (!releaseData.platforms['darwin-aarch64'].url) {
  throw new Error('Failed to get release for MacOS');
}

if (!releaseData.platforms['linux-x86_64'].url) {
  throw new Error('Failed to get release for Linux');
}

if (!releaseData.platforms['windows-x86_64'].url) {
  throw new Error('Failed to get release for Windows');
}

const { data: updater } = await repos.getReleaseByTag({
  ...repoMetaData,
  tag: UPDATER_TAG
});

const prevReleaseAsset = updater.assets.find(
  (asset) => asset.name === UPDATER_FILE
);
if (prevReleaseAsset) {
  await repos.deleteReleaseAsset({
    ...repoMetaData,
    asset_id: prevReleaseAsset.id
  });
}

await repos.uploadReleaseAsset({
  ...repoMetaData,
  release_id: updater.id,
  name: UPDATER_FILE,
  data: JSON.stringify(releaseData)
});
