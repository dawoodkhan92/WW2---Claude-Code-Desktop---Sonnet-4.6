# ✦ WAR ROOM — Pre-War Strategic Planning Map 1938

> An interactive, historically accurate battle planning tool set in the pre-World War II era. Built for historians, wargamers, and strategy enthusiasts.

**[▶ Try it Live →](https://dawoodkhan92.github.io/ww2-war-room/)**

![War Room Screenshot](https://raw.githubusercontent.com/dawoodkhan92/ww2-war-room/main/preview.png)

---

## What is this?

A fully browser-based war room that lets you plan battles on a historically accurate **1938 world map** — complete with correct borders, colonial territories, and faction alignments of the pre-WWII era. No installs, no sign-ups. Just open and plan.

The map reflects the world as it was in **September 1938**: post-Anschluss Germany, Manchukuo under Japan, Italian Ethiopia, the full British and French Empires, and a Soviet Union fresh from Stalin's military purges.

---

## Features

### 🗺️ Historically Accurate 1938 World Map
- Real pre-WWII borders (not modern ones) — Austria absorbed into Germany, Manchukuo, colonial empires
- Faction color-coded territories: Axis, Western Allies, Soviet, USA, British Empire, French Empire, Neutral
- Click any territory for a full **intelligence briefing**: leader, government, military strength, historical context

### 🪖 Military Unit Placement
- 8 unit types: Infantry, Armor/Panzer, Motorized, Artillery, Air Wing, Naval Fleet, Submarine, HQ
- 11 nations: Germany, UK, France, USSR, USA, Japan, Italy, Poland, Finland, Hungary, Romania
- NATO APP-6 standard military symbols (via milsymbol)
- Drag units to reposition, right-click to edit designation

### ✏️ Battle Planning Tools (keyboard shortcuts `1`–`8`)
| Key | Tool | Use |
|-----|------|-----|
| `1` | **Attack Arrow** | Show offensive thrusts |
| `2` | **Defense Line** | Mark defensive positions |
| `3` | **Front Line** | Draw contact lines |
| `4` | **Supply Route** | Mark logistics corridors |
| `5` | **Encirclement** | Show encirclement zones |
| `6` | **Naval Zone** | Mark maritime patrol areas |
| `7` | **Airstrike** | Mark air attack targets |
| `8` | **Freehand** | Annotate freely |

### 📋 Historical Scenarios (pre-loaded with all units & arrows)
| Code | Operation | Date |
|------|-----------|------|
| **CASE WHITE** | Invasion of Poland | 1 Sep 1939 |
| **FALL GELB** | Invasion of France (Sichelschnitt) | 10 May 1940 |
| **WESERÜBUNG** | Norway & Denmark | 9 Apr 1940 |
| **BARBAROSSA** | Invasion of the Soviet Union | 22 Jun 1941 |

### 💾 Save, Load & Export
- Save your plan to browser storage (`Ctrl+S`)
- Load previous plans instantly
- Export the map as a **PNG image**
- Intel ticker: 40+ real historical events scrolling 1936–1941

---

## How to Use

### Option 1: Live Demo (no install)
👉 **[https://dawoodkhan92.github.io/ww2-war-room/](https://dawoodkhan92.github.io/ww2-war-room/)**

### Option 2: Run Locally
```bash
git clone https://github.com/dawoodkhan92/ww2-war-room.git
cd ww2-war-room
python -m http.server 8080
# Open http://localhost:8080 in your browser
```

> ⚠️ Must be served via HTTP (not opened as a file) — the map loads GeoJSON data from CDN which requires a server context.

---

## Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `1`–`8` | Activate drawing tools |
| `Esc` | Cancel current tool / placement |
| `Delete` | Remove selected unit or drawing |
| `Ctrl+S` | Save plan |

---

## Tech Stack
- **[Leaflet.js](https://leafletjs.com/)** — Interactive map engine
- **[milsymbol](https://github.com/spatialillusions/milsymbol)** — NATO APP-6 military symbols
- **[1938 World GeoJSON](https://github.com/aourednik/historical-basemaps)** — Historical borders by @aourednik
- **[CartoDB Voyager](https://carto.com/basemaps)** tiles + sepia filter for the war-room aesthetic
- **Leaflet.draw** + **Leaflet.PolylineDecorator** for drawing tools
- Pure vanilla JS/CSS/HTML — zero build steps, zero dependencies to install

---

## Historical Accuracy Notes

- Map date: **September 1938** (post-Anschluss, post-Munich Agreement)
- Germany includes Austria (annexed March 1938) and Sudetenland (October 1938)
- Manchukuo shown as Japanese puppet state
- Italian East Africa (Ethiopia + Eritrea + Somalia) shown as Axis territory
- Soviet Union borders reflect Molotov-Ribbentrop pre-partition state
- Country intelligence data sourced from historical records of the 1936–1941 period

---

## Built with Claude

This project was designed and built entirely with [Claude](https://claude.ai/claude-code) as a demonstration of AI-assisted historical tooling.

---

*"History doesn't repeat itself, but it often rhymes." — Mark Twain*
