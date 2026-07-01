# Rustzen Design System — Zen Blue Glass

> Canonical brand & UI spec. This document is the single source of truth shared by
> the **apps/site** marketing site (Astro) and the **apps/console** admin dashboard (Next.js).
> The product desktop app (`rustzen-clear/zen-gui`) already implements this language;
> the website and dashboard are being aligned to it.
>
> Status: v1 — token foundation + homepage/overview restyle sample. Evolve via PR.

## 0. Strategy

The product GUI ships a calm, blue, glassy aesthetic. Until now the website (teal +
Atkinson serif + warm paper) and the dashboard (default shadcn slate) each did their
own thing. This spec **derives every token from the product's existing palette** so
all three surfaces read as one brand, and a future product redesign propagates
everywhere by updating one token block.

Two rules govern every decision below:

1. **One token contract, three implementations.** Colors, type, radius, motion,
   glass and safety semantics are defined once here and copied verbatim into
   `apps/site/src/styles/global.css` and `apps/console/src/app/globals.css`.
2. **Brand color has two strengths.** `#77a8f7` (brand-400) is soft — great for
   glass, gradients, ambient glow and icons. It fails contrast as a primary button
   or body text on white, so those use the deeper `#3f7fd9` (brand-600). Never use
   brand-400 for text on light backgrounds.

---

## 1. Token system

### 1.1 Brand scale

Anchored on the product's `#77a8f7` at step 400.

```css
--brand-50:  #f3f7fe;
--brand-100: #e3edfd;
--brand-200: #d3e7fd;   /* = product zen-blue-highlight */
--brand-300: #a8cbfb;   /* = product zen-blue-mid      */
--brand-400: #77a8f7;   /* = product zen-blue-deep — primary surface color */
--brand-500: #4f8af3;   /* hover / strong interactive                */
--brand-600: #3f7fd9;   /* = product success/safe — buttons, icons, links */
--brand-700: #2f63b0;
--brand-800: #244783;
--brand-900: #1b2f56;
```

### 1.2 Ink (text) and neutrals

```css
--ink:     #2f3e58;   /* primary text   */
--ink-2:   #60708a;   /* secondary      */
--ink-3:   #8391a7;   /* muted          */
--ink-4:   #a7b5c8;   /* dim / placeholder */
--line:    #e3edfd;   /* dividers (brand-100 shifted) */
--panel:   #eef4fe;   /* section tint = product zen-panel */
--paper:   #f7faff;   /* page background */
--surface: #ffffff;   /* cards / elevated */
```

### 1.3 Safety semantics

The product's signature feature is **risk-grading**. These three colors are
identical across the GUI, website and dashboard. (Note: "Safe" is blue, not green —
that is the established ZenClear language; keep it consistent everywhere.)

```css
--safe:    #3f7fd9;  --safe-soft:    rgba(119,168,247,.16);
--caution: #b58221;  --caution-soft: rgba(181,130,33,.14);
--danger:  #e85a5a;  --danger-soft:  rgba(232,90,90,.12);
```

Dashboard status mapping (reuses the same tokens): `ACTIVE → safe`,
`EXPIRED → caution`, `REVOKED → danger`.

### 1.4 Glass tiers and ambient

The "blue glass" identity. Three opacity tiers give depth; ambient blobs sit behind
hero/hero-like regions.

```css
--glass-1-bg: rgba(255,255,255,.78); --glass-1-blur: 24px; --glass-1-border: rgba(119,168,247,.32);
--glass-2-bg: rgba(255,255,255,.70); --glass-2-blur: 20px; --glass-2-border: rgba(119,168,247,.24);
--glass-3-bg: rgba(238,244,254,.82); --glass-3-blur: 18px; --glass-3-border: rgba(119,168,247,.20);

--ambient-a: rgba(211,231,253,.72);
--ambient-b: rgba(168,203,251,.38);
```

### 1.5 Type, radius, motion

```css
--font-display: "SF Pro Display","PingFang SC",system-ui,sans-serif;
--font-body:    "SF Pro Text","PingFang SC",system-ui,sans-serif;
--font-mono:    "SF Mono","JetBrains Mono",ui-monospace,monospace;
/* Atkinson (existing) is retained only for large display kickers, never body. */

--radius-sm: 10px;  --radius: 14px;  --radius-lg: 18px;  --radius-xl: 24px;
--motion-fast: 140ms;  --motion-base: 220ms;  --motion-slow: 320ms;
--ease-standard:   cubic-bezier(.32,.72,0,1);
--ease-emphasized: cubic-bezier(.2,.8,.2,1);
```

### 1.6 Dark mode

The product is light-only today; the website and dashboard add dark mode via a
`.dark` class on `<html>`/root, toggled by a button and seeded from
`prefers-color-scheme`.

```css
.dark {
  --paper:#0c1426; --panel:#0f1830; --surface:#111c36;
  --ink:#e8eef9; --ink-2:#aebbd2; --ink-3:#8595ad; --ink-4:#5e6c84;
  --line: rgba(119,168,247,.16);
  --glass-1-bg: rgba(255,255,255,.06); --glass-1-border: rgba(119,168,247,.22);
  --glass-2-bg: rgba(255,255,255,.04); --glass-2-border: rgba(119,168,247,.16);
  --glass-3-bg: rgba(255,255,255,.03);
  --ambient-a: rgba(47,99,176,.30);
  --ambient-b: rgba(31,48,86,.50);
}
```

---

## 2. Information architecture

```
/                     Home (rebuilt, see §4)
/features             Feature detail (anchor sections)
/pricing              Pro $10/yr — detail, comparison, FAQ
/download             macOS download — requirements, current version, checksum
/changelog            Release notes (mirrors platform versions)
/help                 Quick start + FAQ
/contact              Support
/privacy /terms /refund   Legal (kept; restyled)   ← also surfaced in header, see §3
/checkout/success     Creem return page (kept; restyled)
/404                  (new)
```

**Bilingual:** path-prefix i18n — English default at `/`, Chinese at `/zh/*`.
Content lives in `src/i18n/{en,zh}.ts` dictionaries plus Astro content collections.
Each page emits `<link rel="alternate" hreflang>`. A header switcher persists the
choice in `localStorage` and rewrites to the sibling locale path.

---

## 3. Header decision: legal links in header

Per product decision, **Privacy / Terms / Refund are surfaced in the header**, not
only the footer. They live in a compact **Policies** dropdown in the primary nav so
they stay one click away without crowding the main marketing items. Footer keeps a
duplicate set for end-of-page convenience.

Header layout (desktop):

```
[◆ Rustzen]   Features  Pricing  Changelog  Help  Policies▾   [中/EN] [☀/🌙] [⬇ Download]
                                                       └ Privacy
                                                         Terms
                                                         Refund
                                                         Contact
```

- Nav is a glass sticky bar (`--glass-1`), brand-200 hairline border.
- Active/inline links use `--ink`; hover → `--brand-600`.
- Download is the only filled button (brand-600 → brand-500 gradient, white text).
- Language and theme toggles are ghost icon buttons.
- Mobile: nav collapses into a sheet under the brand; Policies becomes a section
  inside it.

---

## 4. Homepage spec (component-level)

### 4.1 Section order

1. `Nav` — sticky glass bar (§3).
2. `HeroSection` — copy left, framed app screenshot right, ambient glow.
3. `ProblemBand` — scrolling pills of dev-data categories with sizes.
4. `HowItWorks` — 3 numbered steps with connector line.
5. `FeatureGrid` — 2×2 glass cards.
6. `SafetyShowcase` — 3 columns Safe / Caution / Danger (brand centerpiece).
7. `DeepDive` — alternating image/text rows (Disk analysis, Categories).
8. `PricingTeaser` — Free vs Pro comparison, CTA to /pricing.
9. `FAQ` — accordion.
10. `FinalCTA` — big ambient panel + download.
11. `Footer` — columns + legal + language.

### 4.2 Components (props + sizes)

| Component | Key props | Spec |
|---|---|---|
| `Button` | `variant: primary\|secondary\|ghost`, `href`, `size` | min-height 44px, radius 999, primary = `linear-gradient(135deg,brand-600,brand-500)` white text, shadow `0 14px 28px brand/18`; secondary = glass-1 + brand-200 border + ink text |
| `GlassCard` | `tier: 1\|2\|3`, `as` | padding 28px, radius lg (18px), backdrop-blur per tier, 1px border per tier |
| `SafetyChip` | `level: safe\|caution\|danger`, `label` | pill, soft bg + semantic color text/border, 4px 10px |
| `Eyebrow` | `children` | uppercase, 0.14em tracking, brand-600, 0.78rem |
| `Nav` | `active`, `locale` | §3 |
| `FeatureCard` | `icon`, `title`, `body` | GlassCard tier-2, icon chip 36px brand-600/15 bg, title 1.15rem 600, body ink-2 |

### 4.3 Bilingual copy (EN / ZH)

| Section | English | 中文 |
|---|---|---|
| Hero eyebrow | Native macOS cleaner for developers | 为开发者打造的原生 macOS 清理工具 |
| Hero H1 | Reclaim disk space you can't see. | 找回你看不见的磁盘空间。 |
| Hero sub | Zen Clear scans dev caches, build output, AI tool state, and local development residue — and explains what can be cleaned before anything runs. | Zen Clear 扫描开发缓存、构建产物、AI 工具数据与本地开发残留，并在任何清理动作之前告诉你什么可以安全处理。 |
| CTA primary | Download for macOS | 下载 macOS 版 |
| CTA secondary | Get Pro — $10/year | 升级 Pro — $10/年 |
| Trust line | Beta · macOS 13+ · Universal · Restorable | Beta · macOS 13+ · 通用 · 可恢复 |
| Problem title | Your Mac fills up with dev data you can't see | 你的 Mac 正被看不见的开发数据占满 |
| Step 1 | Scan every dev cache & build output | 扫描全部开发缓存与构建产物 |
| Step 2 | Risk-grade each finding | 为每项结果评级 |
| Step 3 | Preview, confirm, restore or delete | 预览、确认、恢复或删除 |
| Feature · scan | Development-aware scan | 开发环境感知扫描 |
| Feature · project | Project-centric analysis | 以项目为中心的分析 |
| Feature · safety | Safety levels | 安全分级 |
| Feature · restore | Restore Center | 恢复中心 |
| Safety · safe | Rebuildable cache — usually safe to remove | 可重建缓存，通常可安全清理 |
| Safety · caution | May affect local workflow — review first | 可能影响本地工作流，请先确认 |
| Safety · danger | Potentially important — not selected by default | 可能是重要数据，默认不选中 |
| Pricing free | Free (Beta) | 免费（Beta） |
| Pricing pro | Pro — $10/year · cleanup, Restore Center, scan rules, scheduled scans, up to 3 devices | Pro — $10/年 · 清理、恢复中心、扫描规则、定时扫描、最多 3 台设备 |
| Final CTA | Start reclaiming space | 开始找回磁盘空间 |

### 4.4 Hero visual

The existing `zen-clear-product.png` sits inside a `AppFrame` (macOS traffic-light
cap, radius-xl, layered shadow). Two `SafetyChip`s float at the frame edges
(`Safe`, `Caution`) to telegraph the signature feature before scroll. Ambient glow
uses `--ambient-a`/`--ambient-b` behind the frame.

---

## 5. Roadmap

| Phase | Scope | Repo | Status |
|---|---|---|---|
| P0 | Token foundation in both globals; header+hero restyle sample (apps/site); shell+overview restyle sample (apps/console) | apps/site, apps/console | ✅ Done |
| P1 | Component extraction; full homepage rebuild; Nav with Policies dropdown + i18n + theme | apps/site | ✅ Done |
| P2 | New pages (pricing, changelog, help, 404); SEO suite; image optimization | apps/site | ✅ Done |
| P3 | Dashboard token pass + component restyle | apps/console | ✅ Done |
| P4 | DataTable (search/sort/page), skeleton/empty/toast/confirm, dark mode, sparkline | apps/console | ✅ Done |

All phases shipped. Remaining polish (not blocking): path-based `/zh` route
mirroring (current i18n is robust client-side with `html lang` seeded pre-paint);
wire `/changelog` to the live platform `/api/versions` endpoint.
