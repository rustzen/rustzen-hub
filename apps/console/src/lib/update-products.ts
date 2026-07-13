const DEFAULT_UPDATE_BLOB_ORIGIN =
  'https://zlobtosdpjhocxfj.public.blob.vercel-storage.com';

export type UpdateProductConfig = {
  code: 'rustzen-clear' | 'rustzen-clipboard';
  assetPrefix: string;
  manifestEnvironmentName:
    | 'RUSTZEN_CLEAR_UPDATE_MANIFEST_URL'
    | 'RUSTZEN_CLIPBOARD_UPDATE_MANIFEST_URL';
  blobOriginEnvironmentName:
    | 'RUSTZEN_CLEAR_UPDATE_BLOB_ORIGIN'
    | 'RUSTZEN_CLIPBOARD_UPDATE_BLOB_ORIGIN';
  defaultManifestUrl: string;
  inferredDmgName(version: string): string;
};

const UPDATE_PRODUCTS: Record<UpdateProductConfig['code'], UpdateProductConfig> = {
  'rustzen-clear': {
    code: 'rustzen-clear',
    assetPrefix: 'rustzen-clear/releases',
    manifestEnvironmentName: 'RUSTZEN_CLEAR_UPDATE_MANIFEST_URL',
    blobOriginEnvironmentName: 'RUSTZEN_CLEAR_UPDATE_BLOB_ORIGIN',
    defaultManifestUrl:
      `${DEFAULT_UPDATE_BLOB_ORIGIN}/rustzen-clear/releases/latest/zen-clear-updates.json`,
    inferredDmgName: (version) => `ZenClear_${version}_universal.dmg`,
  },
  'rustzen-clipboard': {
    code: 'rustzen-clipboard',
    assetPrefix: 'rustzen-clipboard/releases',
    manifestEnvironmentName: 'RUSTZEN_CLIPBOARD_UPDATE_MANIFEST_URL',
    blobOriginEnvironmentName: 'RUSTZEN_CLIPBOARD_UPDATE_BLOB_ORIGIN',
    defaultManifestUrl:
      `${DEFAULT_UPDATE_BLOB_ORIGIN}/rustzen-clipboard/releases/latest/rustzen-clipboard-updates.json`,
    inferredDmgName: (version) => `RustzenClipboard_${version}_universal.dmg`,
  },
};

export function resolveUpdateProduct(value: string | null) {
  if (!value) {
    return UPDATE_PRODUCTS['rustzen-clear'];
  }

  return UPDATE_PRODUCTS[value as UpdateProductConfig['code']] ?? null;
}

export function updateProductForAssetPath(path: string) {
  return (
    Object.values(UPDATE_PRODUCTS).find((product) =>
      path.startsWith(`${product.assetPrefix}/`),
    ) ?? null
  );
}

export function updateManifestUrl(product: UpdateProductConfig) {
  return process.env[product.manifestEnvironmentName]?.trim() || product.defaultManifestUrl;
}

export function updateBlobOrigin(product: UpdateProductConfig) {
  return (
    process.env[product.blobOriginEnvironmentName]?.trim().replace(/\/+$/, '') ||
    DEFAULT_UPDATE_BLOB_ORIGIN
  );
}

export function isAllowedUpdateAssetPath(path: string, product: UpdateProductConfig) {
  const prefix = `${product.assetPrefix}/`;
  if (!path.startsWith(prefix)) {
    return false;
  }

  return /^[^/]+\/[^/]+\.(?:app\.tar\.gz|dmg)$/.test(path.slice(prefix.length));
}
