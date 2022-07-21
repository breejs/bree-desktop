const fs = require('fs/promises');
const path = require('path');
const { exec } = require('child_process');

(async () => {
  const packageJson = await fs.readFile(
    path.join(__dirname, '../package.json'),
    'utf8'
  );
  const packageJsonObject = JSON.parse(packageJson);
  const version = packageJsonObject.version;

  console.log(`Updating 'tauri.conf.json' file with version ${version}...`);
  const tauriConfPath = path.join(__dirname, '../src-tauri/tauri.conf.json');
  const tauriConfJson = await fs.readFile(tauriConfPath, 'utf8');
  const tauriConfJsonObject = JSON.parse(tauriConfJson);
  tauriConfJsonObject.package.version = version;
  const tauriConfJsonString = JSON.stringify(tauriConfJsonObject, null, 2);
  await fs.writeFile(tauriConfPath, tauriConfJsonString);

  console.log('Adding to git commit...');
  await new Promise((resolve, reject) => {
    exec(
      `git add ${tauriConfPath} && git commit --amend --no-edit`,
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
})().catch(console.error);
