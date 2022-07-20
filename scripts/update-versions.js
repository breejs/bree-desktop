const fs = require('fs/promises');
const path = require('path');

(async () => {
  const packageJson = await fs.readFile('./package.json', 'utf8');
  const packageJsonObject = JSON.parse(packageJson);
  const version = packageJsonObject.version;

  console.log(`Updating 'tauri.conf.json' file...`);
  const tauriConfPath = path.join(__dirname, '../src-tauri/tauri.conf.json');
  const tauriConfJson = await fs.readFile(tauriConfPath, 'utf8');
  const tauriConfJsonObject = JSON.parse(tauriConfJson);
  tauriConfJsonObject.version = version;
  const tauriConfJsonString = JSON.stringify(tauriConfJsonObject, null, 2);
  await fs.writeFile(tauriConfPath, tauriConfJsonString);
})().catch(console.error);
