import process from 'node:process';

import chokidar from 'chokidar';
import { build as esbuild } from 'esbuild';
import { exec as pkg } from 'pkg';
import { execa } from 'execa';
import glob from 'glob';

const isProd = process.env.NODE_ENV === 'production';

const OUTDIR = 'dist-node';

let extension = '';
if (process.platform === 'win32') {
  extension = '.exe';
}

let BASE_ESBUILD_CONFIG = {
  bundle: true,
  sourcemap: true,
  platform: 'node',
  format: 'cjs',
  define: {
    'import.meta.url': '__dirname'
  }
};

if (isProd) {
  BASE_ESBUILD_CONFIG = {
    ...BASE_ESBUILD_CONFIG,
    minify: true,
    sourcemap: false
  };
}

async function bundle() {
  return Promise.all([
    esbuild({
      entryPoints: ['src-node/index.js'],
      outdir: OUTDIR,
      ...BASE_ESBUILD_CONFIG
    }),
    esbuild({
      entryPoints: [glob.sync('src-node/jobs/**/*.js')],
      outdir: `${OUTDIR}/jobs`,
      ...BASE_ESBUILD_CONFIG
    })
  ]);
}

async function binary() {
  const rust = await execa('rustc', ['-vV']);
  const targetTriple = /host: (\S+)/g.exec(rust.stdout)[1];

  return pkg([
    `${OUTDIR}/index.js`,
    '--config',
    '.pkg-config.json',
    '--output',
    `src-tauri/binaries/node-${targetTriple}${extension}`,
    '--options',
    'enable-source-maps'
  ]);
}

async function main() {
  console.log('Bundling files');
  // convert from esm to cjs
  // and bundle
  await bundle();

  console.log('Bundling Finished!');
  console.log('Packaging binary');

  // create node binary
  await binary();

  console.log('Packaging Finished!');
}

function run() {
  main().catch((err) => {
    console.error(err);
  });
}

run();

chokidar
  .watch('src-node/**/*', {
    ignoreInitial: true
  })
  .on('change', run)
  .on('add', run)
  .on('unlink', run);
