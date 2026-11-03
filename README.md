# CMSN CON THƯ BÉO PHÌ

A small 2D pixel-art birthday game (320x180, HTML5 Canvas + vanilla JavaScript, no frameworks, no backend).
Chapter 1 *The Little Seed* (platformer) -> Chapter 2 *Becoming Myself* (hub + 4 mini-games + character growth) -> Chapter 3 (placeholder level that reuses all the systems) -> birthday ending + letter.
The game has **3 chapters**. All story text is yours to write (see "Write your words").

## Run locally
Browsers block some features when you double-click `index.html`, so use a tiny server:
* VS Code: install **Live Server**, right-click `index.html` -> *Open with Live Server*, or
* Terminal in this folder: `python -m http.server 8000` then open http://localhost:8000
Shortcut for testing: `index.html?chapter=2` jumps straight to Chapter 2 (`?chapter=3` for Chapter 3).

## Controls
| Key | Action |
|---|---|
| A / D or arrows | walk / crawl |
| SPACE / W / Up | hop |
| E / ENTER / tap / Down | enter a station, talk to an NPC, confirm |
| mouse / touch | paint, tap words, pick menu icons |
| P | progress screen (stats, stars, badges, rewards) |
| R | back to checkpoint (Chapter 1) |
| M | music on/off |
| G | debug view |
| Esc / top-right button | leave a mini-game level |
Phones/tablets get on-screen buttons automatically.

## Write your words (important!)
* `data/text_ch2.js` - **all** Chapter 2 words: intro dialogue, text after each growth, after each mini-game, finale, NPC lines, labels. Empty = nothing shown.
* `data/text_ch3.js` - Chapter 3 words.
* `data/vocab.js` - vocabulary + sentences + categories + voice language of Language Detective.
* `data/letter.js` - your personal letter (ending screen, key `L`).  `data/chapters.js` -> `ENDING` - final lines.
Chapter 1 still contains placeholder lines written by the assistant (`data/chapters.js`, `data/level1.js`); replace them freely.

## Deploy to GitHub Pages
1. Create a repository on github.com. 2. Upload the CONTENTS of this folder (so `index.html` is at the repository root).
3. Settings -> Pages -> *Deploy from a branch* -> `main` / `(root)`.  4. Open `https://<user>.github.io/<repo>/` (try it on a phone first).
All paths are relative, so sub-folder URLs work. The `tests/`, `tools/`, `docs/`, `backup_before_ch1/` and `_unused_root_copies/` folders are not needed online (you may delete them from the repo).

## Project structure
```
index.html  css/style.css
js/    config input physics player camera level renderer ui text audio fx assets anim   (Chapter 1 engine, extended)
       save growth progression achievements uimanager minigame paint language npc social battle_engine social_battle discover world main
data/  level1 chapters letter | text_ch2 text_ch3 vocab paintings npc_data growth progression_data
       minigame_data social_levels social_battle_config social_battle_questions levels_ch2
assets/ characters (baby, child, preteen, teen, young, 12 NPC sheets) environments collectibles effects ui
tools/ make_assets.py make_characters.py make_ch2_assets.py make_social_levels.py make_font.py validate_assets.py
tests/ run_tests.py test_report.json     docs/ GAMEPLAY.md ARCHITECTURE.md TESTING.md SOCIAL_BATTLE.md
```
`js/player.js`, `js/physics.js`, `js/camera.js` are the original Chapter 1 files, unchanged.

## Regenerating art / data
`python tools/make_assets.py` (Chapter 1 art), `python tools/make_characters.py` (growth sheets + NPCs), `python tools/make_ch2_assets.py` (stations, icons, badges, vocab pictures, paintings), `python tools/make_social_levels.py`, `python tools/validate_assets.py`. Needs Python + Pillow.

## Documents
`docs/GAMEPLAY.md` (rules of every mini-game, progression) · `docs/ARCHITECTURE.md` (modules + how to add a mini-game / chapter) · `docs/TESTING.md` (what was tested and how to re-run) · `docs/SOCIAL_BATTLE.md` (the turn-based Social Battle: questions, thresholds, skills).

**Social Battle (Chapter 2):** the "Making Friends" station is a turn-based battle with conversation events at opponent-HP thresholds. Edit `data/social_battle_questions.js` (questions, all placeholders) and `data/social_battle_config.js` (thresholds, skills). Engine tests: `node tests/battle_engine_test.js --sim`.


## Cập nhật (phiên bàn giao)
- Chapter 3: trận boss "Tuổi 18" (xem PROJECT_CONTEXT.md). Thắng → tuổi 19.
- Hội thoại: sửa `NARRATIVE_SCRIPT_VI.md` (cột EDITED TEXT) rồi chạy `python tools/narrative.py import`.
- Kính của Phùng Thế Vinh: `python tools/make_vinh_glasses.py`. Tài sản Chapter 3: `python tools/make_ch3_assets.py`.
