import assert from 'node:assert/strict';
import test from 'node:test';
import {
  isAllowedUpdateAssetPath,
  resolveUpdateProduct,
  updateBlobOrigin,
  updateManifestUrl,
  updateProductForAssetPath,
} from './update-products.ts';

test('keeps Rustzen Clear as the backward-compatible default updater product', () => {
  assert.equal(resolveUpdateProduct(null)?.code, 'rustzen-clear');
  assert.equal(resolveUpdateProduct('rustzen-clear')?.code, 'rustzen-clear');
});

test('resolves Clipboard to its isolated manifest and asset prefix', () => {
  const product = resolveUpdateProduct('rustzen-clipboard');
  assert.ok(product);
  assert.equal(product.assetPrefix, 'rustzen-clipboard/releases');
  assert.match(updateManifestUrl(product), /rustzen-clipboard-updates\.json$/);
  assert.equal(product.inferredDmgName('0.1.0'), 'RustzenClipboard_0.1.0_universal.dmg');
});

test('rejects unknown updater products', () => {
  assert.equal(resolveUpdateProduct('unknown-product'), null);
});

test('isolates allowed asset paths by product', () => {
  const clear = resolveUpdateProduct('rustzen-clear');
  const clipboard = resolveUpdateProduct('rustzen-clipboard');
  assert.ok(clear);
  assert.ok(clipboard);

  const clipboardPath =
    'rustzen-clipboard/releases/v0.1.0/RustzenClipboard_0.1.0_universal.dmg';
  assert.equal(isAllowedUpdateAssetPath(clipboardPath, clipboard), true);
  assert.equal(isAllowedUpdateAssetPath(clipboardPath, clear), false);
  assert.equal(updateProductForAssetPath(clipboardPath)?.code, 'rustzen-clipboard');
});

test('uses product-specific environment overrides', () => {
  const product = resolveUpdateProduct('rustzen-clipboard');
  assert.ok(product);

  const manifestUrl = process.env.RUSTZEN_CLIPBOARD_UPDATE_MANIFEST_URL;
  const blobOrigin = process.env.RUSTZEN_CLIPBOARD_UPDATE_BLOB_ORIGIN;
  process.env.RUSTZEN_CLIPBOARD_UPDATE_MANIFEST_URL = ' https://updates.example/clipboard.json ';
  process.env.RUSTZEN_CLIPBOARD_UPDATE_BLOB_ORIGIN = ' https://assets.example/ ';
  try {
    assert.equal(updateManifestUrl(product), 'https://updates.example/clipboard.json');
    assert.equal(updateBlobOrigin(product), 'https://assets.example');
  } finally {
    if (manifestUrl === undefined) {
      delete process.env.RUSTZEN_CLIPBOARD_UPDATE_MANIFEST_URL;
    } else {
      process.env.RUSTZEN_CLIPBOARD_UPDATE_MANIFEST_URL = manifestUrl;
    }
    if (blobOrigin === undefined) {
      delete process.env.RUSTZEN_CLIPBOARD_UPDATE_BLOB_ORIGIN;
    } else {
      process.env.RUSTZEN_CLIPBOARD_UPDATE_BLOB_ORIGIN = blobOrigin;
    }
  }
});
