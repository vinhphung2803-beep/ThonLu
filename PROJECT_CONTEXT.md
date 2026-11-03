# PROJECT_CONTEXT – CMSN CON THƯ BÉO PHÌ
(Cập nhật: phiên 1. File này đủ để AI khác tiếp tục mà không phải phân tích lại.)

## Công nghệ / chạy
HTML5 Canvas 320x180 + vanilla JS, không build, không backend. Chạy: `python3 -m http.server 8000` rồi mở `index.html`
(`?chapter=2`, `?chapter=3` nhảy chương; `?sbseed=N` cố định ngẫu nhiên của trận đánh). Test: `node tests/battle_engine_test.js --sim`,
`python tests/run_tests.py` (Playwright). Tài liệu cũ: README.md, docs/ARCHITECTURE|GAMEPLAY|SOCIAL_BATTLE|TESTING.md.

## Cấu trúc ngắn
- Chapter 1: platformer (data/level1.js). Chapter 2: hub + 4 mini-game (Little Artist, Language Detective, Making Friends = **trận đánh theo lượt với Phùng Thế Vinh**, Discover Yourself).
- Chapter 3: hiện là map placeholder (`CH3_ROWS` trong data/levels_ch2.js, text trong data/text_ch3.js). **Chưa có trận boss Tuổi 18.**
- Hệ thống đánh: `js/battle_engine.js` (luật, test được trong Node) + `js/social_battle.js` (màn hình, `BattleMinigame` generic; Ch3 có thể `extends BattleMinigame`, xem docs/SOCIAL_BATTLE.md "Reuse in Chapter 3").
- Dữ liệu trận: data/social_battle_config.js, data/social_battle_questions.js.

## Đã làm (phiên 1)
1. **Kính cận cho Vinh** (chỉ màn đánh Chapter 2): `tools/make_vinh_glasses.py` tạo `assets/characters/npc_vinh_{child,preteen,teen,young}.png` từ `npc_calm_*` (KHÔNG sửa npc_calm). `data/social_battle_config.js`: opponent.sheet = 'npc_vinh' + `Assets.addNpcSheets(['vinh'],...)`. Đã kiểm tra trong trình duyệt headless.
2. **Đổi tên game**: màn tiêu đề (js/ui.js), 'Chọn chương', loading (js/main.js, font hệ thống), `<title>` index.html, README, tests docstring. Chưa có màn Credits trong game (không tồn tại).
3. **Hội thoại**: `NARRATIVE_SCRIPT_VI.md` (171 ô, ID ổn định) ↔ `tools/narrative.py` (init/md/check/import) ↔ `data/narrative_manifest.json` (id→đường dẫn dữ liệu, bản dịch CURRENT) ↔ `data/narrative_data.js` (sinh ra) ↔ `js/narrative.js` (áp dụng lúc tải, nối trong index.html sau social_battle_questions.js).
   Quy trình của người dùng: sửa EDITED TEXT trong md → `python tools/narrative.py import`. `md` sẽ GHI ĐÈ EDITED TEXT (chỉ dùng khi thêm ô mới).
   `tools/narrative_tr.py` = bảng dịch EN→VI chỉ dùng cho `init`. `tools/dump_data.js` = nạp data/*.js bằng Node vm.
   `data/letter.js`: `const LETTER_FROM` đổi thành `let` (để narrative.js gán).

4. **Chapter 3 – boss Tuổi 18**: `data/ch3_boss.js` (chỉ số boss, 4 phase, chiêu), `js/ch3_battle.js` (`Ch3BossBattle extends BattleMinigame`, đăng ký 'boss18'; huy hiệu Muôn Màu/Polyglot/Bạn Thân/Nhà Khám Phá/Lớn Lên và chỉ số Ch1-2 ảnh hưởng trận).
   Engine: mốc HP có `phase` (battle_engine.js `_enterPhase`), screen có beat 'phase' + hook `texts/uiOverride/opponentSheet/winStats/detailLine` (social_battle.js).
   Bản đồ: trạm ký tự `K` trong CH3_ROWS (B là ô gạch!), `Level` ánh xạ K→'boss18', cửa ra mở khi thắng (`exitNeedsBoss`). Thắng → `world.js bossVictory()` → growTo('adult') (tuổi 19, `adult.png`) → `finaleCheck` đặt `ch3.done`.
   Tài sản: `tools/make_ch3_assets.py` tạo `adult.png` và `npc_age18_young.png` (boss = chữ số "18", đã lật sẵn vì trận lật đối thủ). Cân bằng: mô phỏng bot ~58% (0 huy hiệu) → 100% (full). Lời dẫn boss: `CH3_TEXT.boss.{intro,phase2,phase3,phase4,victory,defeat}` (trống, người dùng tự viết qua NARRATIVE_SCRIPT_VI.md; `narrative.py init` đã thêm ô).
5. **Việt hóa**: giao diện trận, kỹ năng, nhãn Ch2, ui.js/main.js/world.js/growth.js/minigame.js. Giữ tiếng Anh: Language Detective (tên trạm, tên màn, nút Hint/Listen, từ vựng, tên huy hiệu First Words/Polyglot/Word Detective).
   Font: assets/ui/font.png (DejaVu 9px) đọc được dấu Việt; kerning chữ W hơi lệch (chưa sửa).

## Còn dang dở / việc tiếp theo
- [ ] Rà thủ công từng màn xem còn chuỗi tiếng Anh / chữ tràn khung (chưa chụp toàn bộ màn).
- [ ] `tests/run_tests.py` còn nhiều chuỗi tiếng Anh cũ -> test có thể báo hỏng giả; xem tests/test_report.json (kết quả phiên 1 ghi ở báo cáo cuối).
- [ ] Credits: game chưa có màn Credits.
- [ ] Cân bằng boss mới được kiểm bằng bot, chưa có người chơi thật thử.
