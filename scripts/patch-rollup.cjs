/**
 * Swaps rollup's native binary loader for the WASM build.
 * Some Windows machines block freshly written .node binaries via
 * Application Control policy — the WASM build has no native code.
 * Runs automatically on `npm install` (postinstall).
 */
const fs = require('node:fs');
const path = require('node:path');

const nativeJs = path.join(__dirname, '..', 'node_modules', 'rollup', 'dist', 'native.js');
const wasmShim = "module.exports = require('@rollup/wasm-node/dist/native.js');\n";

try {
  const current = fs.readFileSync(nativeJs, 'utf8');
  if (current !== wasmShim) {
    fs.writeFileSync(nativeJs, wasmShim);
    console.log('[patch-rollup] native.js → @rollup/wasm-node shim applied');
  }
} catch (err) {
  if (err.code !== 'ENOENT') {
    console.warn('[patch-rollup] could not patch rollup:', err.message);
  }
}
