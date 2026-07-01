# Current Website Content Snapshot

Source: local Next.js files in this repository before the Astro rebuild.

Date captured: 2026-06-10.

Status: Historical source snapshot. Use `src/data/product.ts` and current
tracked Astro pages as the product copy source of truth.

## Home

Title: Rustzen macOS apps

Headline: macOS cleanup and clipboard history.

Description: Rustzen builds macOS tools for developer cache cleanup and local clipboard history.

Primary products:

- Zen Clear
  - Status: Beta
  - Description: A native macOS cleanup app for developer environments. It scans development caches, build outputs, AI tool state, Docker, Xcode, IDE residue, and local development files, then explains what can be cleaned before any action runs.
  - Path: `/zen-clear`
- Clipboard
  - Status: In development
  - Description: A macOS clipboard history app for text and images. It lets you search recent items, pin useful entries, and restore a selected item to the system clipboard.
  - Path: `/clipboard`

## Zen Clear

Description: A native macOS cleanup app for developer environments. It scans development caches, build outputs, AI tool state, Docker, Xcode, IDE residue, and local development files, then explains what can be cleaned before any action runs.

Features:

- Scan developer cache and build output locations across package managers, IDEs, Docker, Xcode, Homebrew, AI tools, and system cache
- Preview cleanup scope and risk before an action runs
- Default cleanup moves recoverable items into Zen Clear Restore Center, not macOS Trash or direct permanent deletion
- Restore or manually permanently delete retained Restore Center entries
- Surface Restore Center storage in disk analysis so retained cleanup items stay visible

Note: Cleanup is preview-first. Scanning, preview, macOS permission setup, and update checks do not require a license; Pro unlocks cleanup, Restore Center, scan rules, custom rules, scheduled scans, and up to 3 devices.

## Clipboard

Description: A macOS clipboard history app for text and images. It lets you search recent items, pin useful entries, and restore a selected item to the system clipboard.

Features:

- Text and image clipboard history
- History stays on the Mac
- Search recent and pinned entries
- Delete sensitive or temporary entries

Note: Clipboard history stays on the Mac. Rustzen Platform is not used for clipboard contents or clipboard history.
