// ============================================================
// renderer.js - TOÀN BỘ code vẽ nằm ở đây.
// Game logic không gọi ctx.fillRect trực tiếp.
//
// Khi có sprite sheet: chỉ cần sửa drawPlayer() và drawLevel()
// (đổi fillRect thành ctx.drawImage). Phần còn lại giữ nguyên.
// ============================================================
const Renderer = {
  COLORS: {
    sky: '#CDE8F6',
    solid: '#7d7d8c',
    solidTop: '#a3a3b3',
    player: '#ffb84d',
    playerEye: '#3A3351',
    grid: 'rgba(58, 51, 81, 0.18)',
    hitbox: '#f2688c'
  },

  render(ctx, game) {
    const cx = Math.round(game.camera.x);   // làm tròn để pixel luôn khớp lưới
    const cy = Math.round(game.camera.y);

    this.clear(ctx);
    this.drawLevel(ctx, game.level, cx, cy);
    this.drawPlayer(ctx, game.player, cx, cy);
    if (game.debug) this.drawDebug(ctx, game, cx, cy);
  },

  clear(ctx) {
    ctx.fillStyle = this.COLORS.sky;
    ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);
  },

  drawLevel(ctx, level, cx, cy) {
    const T = CONFIG.TILE;
    // Chỉ vẽ những tile đang nằm trong khung nhìn (tiết kiệm hiệu năng)
    const c0 = Math.max(0, Math.floor(cx / T));
    const c1 = Math.min(level.colCount - 1, Math.floor((cx + CONFIG.WIDTH) / T));
    const r0 = Math.max(0, Math.floor(cy / T));
    const r1 = Math.min(level.rowCount - 1, Math.floor((cy + CONFIG.HEIGHT) / T));

    for (let ty = r0; ty <= r1; ty++) {
      for (let tx = c0; tx <= c1; tx++) {
        if (!level.solid[ty][tx]) continue;
        const sx = tx * T - cx;
        const sy = ty * T - cy;
        ctx.fillStyle = this.COLORS.solid;
        ctx.fillRect(sx, sy, T, T);
        // Viền sáng trên cùng nếu phía trên là ô trống -> dễ nhìn mặt đứng
        if (!level.isSolid(tx, ty - 1)) {
          ctx.fillStyle = this.COLORS.solidTop;
          ctx.fillRect(sx, sy, T, 3);
        }
      }
    }
  },
drawPlayer(ctx, p, cx, cy) {
    // Tải sprite một lần duy nhất
    if (!this.playerSprite) {
        this.playerSprite = new Image();
        this.playerSprite.src = 'assets/characters/baby_idle_crawl.png';
    }

    const sprite = this.playerSprite;

    // Vị trí vẽ: căn giữa theo hitbox, giữ chân chạm mặt đất
    const drawX = Math.round(p.x + p.w / 2 - 16) - cx;
    const drawY = Math.round(p.y + p.h - 32) - cy;

    if (sprite.complete && sprite.naturalWidth > 0) {
        ctx.imageSmoothingEnabled = false;

        if (p.facing === -1) {
            // Lật sprite khi nhân vật quay trái
            ctx.save();
            ctx.translate(drawX + 32, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(sprite, 0, drawY, 32, 32);
            ctx.restore();
        } else {
            ctx.drawImage(sprite, drawX, drawY, 32, 32);
        }
    } else {
        // Hình thay thế trong lúc ảnh chưa tải xong
        ctx.fillStyle = this.COLORS.player;
        ctx.fillRect(
            Math.round(p.x) - cx,
            Math.round(p.y) - cy,
            p.w,
            p.h
        );
    }
},
  drawDebug(ctx, game, cx, cy) {
    const T = CONFIG.TILE;
    const p = game.player;

    // Lưới tile
    ctx.fillStyle = this.COLORS.grid;
    for (let x = -(cx % T); x < CONFIG.WIDTH; x += T) ctx.fillRect(x, 0, 1, CONFIG.HEIGHT);
    for (let y = -(cy % T); y < CONFIG.HEIGHT; y += T) ctx.fillRect(0, y, CONFIG.WIDTH, 1);

    // Hitbox
    ctx.strokeStyle = this.COLORS.hitbox;
    ctx.lineWidth = 1;
    ctx.strokeRect(Math.round(p.x) - cx + 0.5, Math.round(p.y) - cy + 0.5, p.w - 1, p.h - 1);

    // Thông số
    ctx.fillStyle = '#3A3351';
    ctx.font = '8px monospace';
    ctx.fillText('FPS ' + game.fps, 4, 10);
    ctx.fillText('state ' + p.state + (p.onGround ? ' (ground)' : ''), 4, 20);
    ctx.fillText('x ' + p.x.toFixed(1) + ' y ' + p.y.toFixed(1), 4, 30);
    ctx.fillText('vx ' + p.vx.toFixed(0) + ' vy ' + p.vy.toFixed(0), 4, 40);
  }
};
