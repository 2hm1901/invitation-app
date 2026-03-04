Code tham khảo:
'''
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thiệp Tốt Nghiệp | Classic Edition</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root {
  --bg-out: #e8e6df;
  --bg-card: #fdfcf7;
  --text-main: #2b3036;
  --text-light: #5a646e;
  --gold: #b3915f;
  --gold-light: #d4b88c;
  --border-color: #dcd7cb;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Montserrat', sans-serif;
  min-height: 100vh;
  background-color: var(--bg-out);
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
  display: flex; align-items: center; justify-content: center;
  padding: 24px; overflow-x: hidden;
  color: var(--text-main);
}

/* ════════════════════════════════════════
   FORM SECTION
════════════════════════════════════════ */
.wrapper {
  position: relative; z-index: 1;
  width: 100%; max-width: 440px;
  animation: fadeUp 0.8s ease-out both;
}
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.form-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 50px 40px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.04), 0 5px 15px rgba(0,0,0,0.02);
  position: relative; overflow: hidden;
  transition: all 0.6s ease;
  border-radius: 4px;
}

.form-panel::before {
  content: ''; position: absolute; inset: 10px;
  border: 1px solid var(--gold-light); opacity: 0.5; pointer-events: none;
}

.fp-badge {
  text-align: center; font-size: 10px; letter-spacing: 3px;
  text-transform: uppercase; color: var(--text-light);
  margin-bottom: 16px;
}

.fp-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px; font-weight: 600;
  text-align: center; line-height: 1.2; margin-bottom: 12px;
  color: var(--text-main);
}
.fp-title em { color: var(--gold); font-style: italic; font-weight: 500; }

.fp-sub {
  text-align: center; font-size: 13px; font-weight: 300;
  color: var(--text-light); margin-bottom: 30px; line-height: 1.5;
}

.div-line { display: flex; align-items: center; gap: 16px; margin-bottom: 30px; justify-content: center; }
.div-line::before, .div-line::after { content: ''; width: 40px; height: 1px; background: var(--gold-light); opacity: 0.6; }
.div-line span { color: var(--gold); font-size: 16px; font-family: serif; }

.fp-label { display: block; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--text-light); margin-bottom: 10px; font-weight: 500; }

.fp-input {
  width: 100%; padding: 14px 0;
  background: transparent;
  border: none; border-bottom: 1px solid var(--border-color);
  color: var(--text-main);
  font-family: 'Cormorant Garamond', serif; font-size: 20px; font-style: italic; outline: none;
  transition: all 0.3s ease; text-align: center;
  margin-bottom: 24px;
}
.fp-input::placeholder { color: #b8b8b8; font-style: italic; font-size: 18px; }
.fp-input:focus { border-bottom-color: var(--gold); }

.fp-err { color: #d9534f; font-size: 12px; text-align: center; margin-top: -16px; margin-bottom: 16px; display: none; }
.fp-err.on { display: block; animation: shk 0.4s ease; }
@keyframes shk { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }

.fp-btn {
  width: 100%; padding: 16px; border: 1px solid var(--gold); border-radius: 2px;
  font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 500;
  cursor: pointer; letter-spacing: 2px; text-transform: uppercase;
  background: var(--gold); color: #fff;
  transition: all 0.3s ease;
}
.fp-btn:hover:not(:disabled) { background: #9a7b4f; border-color: #9a7b4f; }
.fp-btn:active { transform: translateY(1px); }
.fp-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.form-panel.hidden { opacity: 0; transform: translateY(-10px); pointer-events: none; }

/* ════════════════════════════════════════
   LOADING OVERLAY
════════════════════════════════════════ */
#loadOv {
  position: fixed; inset: 0; z-index: 500;
  display: flex; align-items: center; justify-content: center;
  pointer-events: none; opacity: 0; background: var(--bg-out);
}
#loadOv.active { pointer-events: all; animation: ovIn 0.6s ease forwards; }
#loadOv.done { animation: ovOut 0.8s ease forwards; }
@keyframes ovIn { to { opacity: 1; } }
@keyframes ovOut { from { opacity: 1; } to { opacity: 0; } }

.ov-box {
  text-align: center; width: 100%; max-width: 480px;
  background: var(--bg-card); padding: 30px; border-radius: 4px;
  border: 1px solid var(--border-color);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}

#treeCv {
  display: block; width: 100%; height: 210px;
  margin-bottom: 24px;
  background: radial-gradient(ellipse at 50% 100%, rgba(179, 145, 95, 0.12) 0%, rgba(253, 252, 247, 0) 70%);
}

.ov-text {
  font-family: 'Cormorant Garamond', serif; font-size: 21px; font-style: italic; font-weight: 600;
  color: var(--text-main); margin-bottom: 12px; min-height: 56px; line-height: 1.4;
  padding: 0 10px; transition: opacity 0.3s ease;
}
.ov-sub { font-size: 11px; color: var(--text-light); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px; }

.pg-wrap { height: 2px; background: var(--border-color); width: 100%; position: relative; overflow: hidden; }
.pg-fill {
  height: 100%; width: 0%; background: var(--gold);
  transition: width 0.1s linear; 
}

/* ════════════════════════════════════════
   CARD SCENE
════════════════════════════════════════ */
#scene {
  position: relative; z-index: 1;
  width: 100%; max-width: 700px;
  display: none;
}
#scene.visible { display: block; animation: fadeUp 1s ease-out both; }

.card-container {
  width: 100%; position: relative;
  box-shadow: 0 20px 50px rgba(0,0,0,0.08), 0 5px 15px rgba(0,0,0,0.03);
  background: var(--bg-card);
  border-radius: 2px;
}

.card-container::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
}

canvas#cardCv { width: 100%; height: auto; aspect-ratio: 1 / 1.414; display: block; }

.card-btns {
  display: flex; gap: 16px; margin-top: 30px; justify-content: center;
}
.c-btn {
  padding: 12px 28px; border: 1px solid var(--border-color); border-radius: 2px;
  font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 500;
  cursor: pointer; letter-spacing: 1px; text-transform: uppercase;
  background: transparent; color: var(--text-main);
  transition: all 0.3s ease;
}
.c-btn-primary { background: var(--text-main); color: var(--bg-card); border-color: var(--text-main); }
.c-btn-primary:hover { background: #1a1d21; }
.c-btn:hover:not(.c-btn-primary) { border-color: var(--text-light); color: #000; }
</style>
</head>
<body>

<div id="loadOv">
  <div class="ov-box">
    <canvas id="treeCv" width="420" height="210"></canvas>
    <div class="ov-text" id="ovTxt">Tua lại một chút về chặng đường 4 năm đã qua...</div>
    <div class="ov-sub">Một chặng đường thanh xuân đang dần khép lại…</div>
    <div class="pg-wrap"><div class="pg-fill" id="pgFill"></div></div>
  </div>
</div>

<div class="wrapper" id="formWrap">
  <div class="form-panel" id="formPanel">
    <div class="fp-badge">Invitation</div>
    <h2 class="fp-title">Lễ Tốt Nghiệp<br><em>& Tri Ân</em></h2>
    <div class="div-line"><span>❧</span></div>
    <p class="fp-sub">Sự hiện diện của Quý vị là niềm vinh hạnh<br>trong ngày vui của chúng tôi.</p>
    
    <label class="fp-label" for="gName">NHẬP TÊN CỦA BẠN</label>
    <input class="fp-input" type="text" id="gName" placeholder="Tên khách mời" autocomplete="off" spellcheck="false">
    <p class="fp-err" id="fpErr">Vui lòng nhập tên khách mời.</p>
    
    <button class="fp-btn" id="genBtn" onclick="go()">Viết Thiệp</button>
  </div>
</div>

<div id="scene">
  <div class="card-container">
    <canvas id="cardCv" width="1200" height="1697"></canvas>
  </div>
  <div class="card-btns">
    <button class="c-btn" onclick="resetForm()">Soạn Lại</button>
    <button class="c-btn c-btn-primary" onclick="dlCard()">Lưu Ảnh Thiệp</button>
  </div>
</div>

<script>
/* ════════════════════════════════════════
   UTILS & HELPERS
════════════════════════════════════════ */
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));

const SEEDS = Array.from({length: 1200}, Math.random);
let ri = 0;
const rnd = () => SEEDS[(ri++)%SEEDS.length];

/* ════════════════════════════════════════
   GROWING TREE (Chỉ vẽ cành và lá từ đầu)
════════════════════════════════════════ */
const treeCv = document.getElementById('treeCv');
const tcx = treeCv.getContext('2d');

function drawBranch(ctx, x, y, angle, len, thick, depth, maxD, prog, segStart){
  if(depth > maxD || len < 1.5) return;
  
  const dur = 0.22; 
  const segEnd = segStart + dur;
  const lp = clamp((prog - segStart) / dur, 0, 1);
  if(lp <= 0) return;

  const ex = x + Math.cos(angle)*len*lp;
  const ey = y + Math.sin(angle)*len*lp;

  const t2 = depth/maxD;
  const r = Math.round(100-t2*40), g = Math.round(80-t2*30), b = Math.round(60-t2*20);
  
  const sway = (rnd()-.5)*0.2;
  const mx = x+Math.cos(angle+sway)*len*lp*0.5, my = y+Math.sin(angle+sway)*len*lp*0.5;
  
  ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(mx,my,ex,ey);
  ctx.strokeStyle = `rgb(${r},${g},${b})`;
  ctx.lineWidth = Math.max(1, thick*(1-t2*0.4));
  ctx.lineCap = 'round'; ctx.stroke();

  if(depth >= maxD-1 && lp > 0.5){
    const la = clamp((lp-.5)/.5, 0, 1);
    drawLeaves(ctx, ex, ey, la);
  }

  if(lp > 0.45 && depth < maxD){
    const cs = segStart + dur * 0.58; 
    const cl = len*(0.68+rnd()*0.1), ct = thick*0.65;
    const sp1 = 0.35+rnd()*0.15, sp2 = 0.35+rnd()*0.15, lean = (rnd()-.5)*0.15;
    drawBranch(ctx, ex, ey, angle-sp1+lean, cl, ct, depth+1, maxD, prog, cs);
    drawBranch(ctx, ex, ey, angle+sp2+lean, cl, ct, depth+1, maxD, prog, cs);
  }
}

function drawLeaves(ctx, x, y, alpha){
  const cols = ['#2ea35b', '#3eb565', '#57c77d', '#1a4d2c', '#4caf70'];
  const n = 4+Math.floor(rnd()*5);
  for(let i=0; i<n; i++){
    const ox = (rnd()-.5)*20, oy = (rnd()-.5)*20, r = 3+rnd()*5;
    ctx.beginPath(); ctx.ellipse(x+ox, y+oy, r, r*(0.6+rnd()*.4), rnd()*Math.PI, 0, Math.PI*2);
    ctx.fillStyle = cols[Math.floor(rnd()*cols.length)];
    ctx.globalAlpha = alpha * 0.85; ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function renderTree(progress){
  ri=0; const W=treeCv.width, H=treeCv.height;
  tcx.clearRect(0,0,W,H);
  
  const bx = W/2, by = H-25; 
  
  const gg = tcx.createRadialGradient(bx,by+5,0,bx,by+5,90);
  gg.addColorStop(0,'rgba(179, 145, 95, 0.3)'); gg.addColorStop(1,'transparent');
  tcx.fillStyle=gg; tcx.beginPath(); tcx.ellipse(bx,by+5,90,15,0,0,Math.PI*2); tcx.fill();
  
  tcx.beginPath(); tcx.moveTo(bx-70, by); tcx.lineTo(bx+70, by);
  tcx.strokeStyle = 'rgba(179, 145, 95, 0.5)'; tcx.lineWidth = 1.5; tcx.stroke();

  tcx.save();
  // Animation mọc cây trải dài toàn bộ quá trình loading
  let treeProg = clamp(progress, 0, 1);
  drawBranch(tcx, bx, by, -Math.PI/2, 48, 10, 0, 7, treeProg, 0);
  tcx.restore();
}

/* ════════════════════════════════════════
   LOADING CONTROLLER (15 Seconds)
════════════════════════════════════════ */
const LOAD_MS = 15000;
const PHASES = [
  { t: 0,    txt: 'Bốn năm – không chỉ là học tập, mà là trưởng thành.' },
  { t: 0.15, txt: 'Có những áp lực, những thử thách và cả những lần nghi ngờ chính mình...' },
  { t: 0.35, txt: 'Nhưng cũng có những người bạn đã cùng mình bước qua mọi điều đó.' },
  { t: 0.55, txt: 'Cùng học, cùng cố gắng, cùng cười và đôi khi cùng… than thở.' },
  { t: 0.75, txt: 'Thanh xuân ấy sẽ luôn là một phần rất đẹp trong ký ức.' },
  { t: 0.92, txt: 'Hành trình mới bắt đầu – và mình rất vui nếu có bạn ở đó.' }
];

function runLoading(cb) {
  const loadOv = document.getElementById('loadOv');
  const pgFill = document.getElementById('pgFill');
  const ovTxt = document.getElementById('ovTxt');
  
  loadOv.classList.remove('done'); 
  loadOv.classList.add('active');
  
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    let progress = Math.min(elapsed / LOAD_MS, 1);
    
    renderTree(progress);
    pgFill.style.width = (progress * 100) + '%';
    
    const currentPhase = [...PHASES].reverse().find(p => progress >= p.t);
    if (currentPhase && ovTxt.innerText !== currentPhase.txt) {
      ovTxt.style.opacity = 0; 
      setTimeout(()=>{
         ovTxt.innerText = currentPhase.txt;
         ovTxt.style.opacity = 1; 
      }, 300); 
    }
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      renderTree(1); 
      setTimeout(() => {
        loadOv.classList.replace('active', 'done');
        setTimeout(cb, 800); 
      }, 500);
    }
  }
  requestAnimationFrame(update);
}

/* ════════════════════════════════════════
   HIGH-RES CLASSIC CARD CANVAS RENDERING
════════════════════════════════════════ */
const cardCv = document.getElementById('cardCv');
const cctx = cardCv.getContext('2d');
let lastName = '';

function drawClassicBorder(ctx, W, H, inset, color, thick) {
  ctx.strokeStyle = color;
  ctx.lineWidth = thick;
  ctx.strokeRect(inset, inset, W - inset*2, H - inset*2);
  
  const cornerSize = 15;
  ctx.beginPath();
  ctx.moveTo(inset - 5, inset + cornerSize); ctx.lineTo(inset - 5, inset - 5); ctx.lineTo(inset + cornerSize, inset - 5);
  ctx.moveTo(W - inset + 5, inset + cornerSize); ctx.lineTo(W - inset + 5, inset - 5); ctx.lineTo(W - inset - cornerSize, inset - 5);
  ctx.moveTo(inset - 5, H - inset - cornerSize); ctx.lineTo(inset - 5, H - inset + 5); ctx.lineTo(inset + cornerSize, H - inset + 5);
  ctx.moveTo(W - inset + 5, H - inset - cornerSize); ctx.lineTo(W - inset + 5, H - inset + 5); ctx.lineTo(W - inset - cornerSize, H - inset + 5);
  ctx.lineWidth = thick / 2;
  ctx.stroke();
}

function drawCard(name){
  const W = cardCv.width; const H = cardCv.height;
  cctx.clearRect(0,0,W,H);

  cctx.fillStyle = '#fdfcf7'; cctx.fillRect(0, 0, W, H);
  cctx.fillStyle = 'rgba(0,0,0,0.015)';
  for(let i=0; i<8000; i++) { cctx.fillRect(Math.random()*W, Math.random()*H, 2, 2); }

  drawClassicBorder(cctx, W, H, 60, '#dcd7cb', 2);
  
  cctx.strokeStyle = '#b3915f'; cctx.lineWidth = 4;
  cctx.strokeRect(75, 75, W - 150, H - 150);
  cctx.lineWidth = 1;
  cctx.strokeRect(85, 85, W - 170, H - 170);

  cctx.font = '60px serif'; cctx.fillStyle = '#b3915f'; cctx.textAlign = 'center';
  cctx.strokeStyle = '#b3915f';
cctx.lineWidth = 2;

// Line trái
cctx.beginPath();
cctx.moveTo(W/2 - 140, 220);
cctx.lineTo(W/2 - 20, 220);
cctx.stroke();

// Line phải
cctx.beginPath();
cctx.moveTo(W/2 + 20, 220);
cctx.lineTo(W/2 + 140, 220);
cctx.stroke();

// Dot giữa
cctx.beginPath();
cctx.arc(W/2, 220, 4, 0, Math.PI * 2);
cctx.fillStyle = '#b3915f';
cctx.fill(); 

  cctx.font = '300 24px "Montserrat"'; cctx.fillStyle = '#5a646e';
  cctx.letterSpacing = '10px'; cctx.fillText('THƯ MỜI THAM DỰ', W/2 + 5, 300);
  cctx.letterSpacing = '0px';

  cctx.font = '600 85px "Cormorant Garamond"'; cctx.fillStyle = '#2b3036';
  cctx.fillText('LỄ TỐT NGHIỆP', W/2, 400);
  
  cctx.font = 'italic 40px "Cormorant Garamond"'; cctx.fillStyle = '#b3915f';
  cctx.fillText('& Lễ Tri Ân Thầy Cô', W/2, 460);

  cctx.beginPath(); cctx.moveTo(W/2 - 150, 520); cctx.lineTo(W/2 + 150, 520);
  cctx.strokeStyle = '#dcd7cb'; cctx.lineWidth = 2; cctx.stroke();
  cctx.font = '30px serif'; cctx.fillStyle = '#b3915f'; cctx.fillText('❧', W/2, 532);

  cctx.font = '300 30px "Montserrat"'; cctx.fillStyle = '#5a646e';
  cctx.fillText('Trân trọng kính mời:', W/2, 650);

  cctx.font = '110px "Great Vibes", cursive'; cctx.fillStyle = '#2b3036';
  cctx.fillText(name, W/2, 800);

  cctx.font = 'italic 34px "Cormorant Garamond"'; cctx.fillStyle = '#5a646e';
  cctx.fillText('Đến chung vui và chứng kiến khoảnh khắc', W/2, 920);
  cctx.fillText('đánh dấu chặng đường trưởng thành của mình nhé.', W/2, 975);

  cctx.fillStyle = '#f6f4ed'; cctx.fillRect(W/2 - 350, 1080, 700, 240);
  cctx.strokeStyle = '#e2dfd5'; cctx.lineWidth = 1;
  cctx.strokeRect(W/2 - 350, 1080, 700, 240);

  cctx.beginPath(); cctx.moveTo(W/2, 1110); cctx.lineTo(W/2, 1290); cctx.stroke();

  cctx.font = '600 20px "Montserrat"'; cctx.fillStyle = '#b3915f';
  cctx.letterSpacing = '3px'; cctx.fillText('THỜI GIAN', W/2 - 175, 1140);
  cctx.letterSpacing = '0px';
  
  cctx.font = '400 32px "Cormorant Garamond"'; cctx.fillStyle = '#2b3036';
  cctx.fillText('08:00 Sáng', W/2 - 175, 1195);
  cctx.font = 'italic 28px "Cormorant Garamond"'; cctx.fillStyle = '#5a646e';
  cctx.fillText('Thứ Bảy, 25.07.2025', W/2 - 175, 1245);

  cctx.font = '600 20px "Montserrat"'; cctx.fillStyle = '#b3915f';
  cctx.letterSpacing = '3px'; cctx.fillText('ĐỊA ĐIỂM', W/2 + 175, 1140);
  cctx.letterSpacing = '0px';

  cctx.font = '400 32px "Cormorant Garamond"'; cctx.fillStyle = '#2b3036';
  cctx.fillText('Hội Trường Chăm Pa', W/2 + 175, 1195);
  cctx.font = 'italic 28px "Cormorant Garamond"'; cctx.fillStyle = '#5a646e';
  cctx.fillText('Đại học ABC', W/2 + 175, 1245);

  cctx.font = '40px serif'; cctx.fillStyle = '#dcd7cb'; cctx.fillText('✤', W/2, 1550);
}

const genBtn = document.getElementById('genBtn');
function go(){
  const name = document.getElementById('gName').value.trim();
  const err = document.getElementById('fpErr');
  err.classList.remove('on');
  if(!name){ err.classList.add('on'); return; }

  genBtn.disabled = true; genBtn.textContent = 'ĐANG XỬ LÝ...';
  document.getElementById('formPanel').classList.add('hidden');
  lastName = name;

  document.fonts.ready.then(function() {
    runLoading(() => {
      document.getElementById('formWrap').style.display = 'none';
      const scene = document.getElementById('scene');
      scene.classList.add('visible');
      drawCard(name);
    });
  });
}

function resetForm(){
  const scene = document.getElementById('scene');
  scene.classList.remove('visible');
  document.getElementById('formWrap').style.display = 'block';
  setTimeout(() => {
    document.getElementById('formPanel').classList.remove('hidden');
    document.getElementById('ovTxt').style.opacity = 1; 
    document.getElementById('ovTxt').innerText = PHASES[0].txt;
  }, 50);
  genBtn.disabled = false; genBtn.textContent = 'VIẾT THIỆP';
  document.getElementById('gName').value = '';
  setTimeout(() => scene.style.display = 'none', 1000);
}

function dlCard(){
  const a = document.createElement('a');
  a.download = `Thiep-Moi-Tot-Nghiep-${lastName.replace(/\s+/g, '-')}.png`;
  a.href = cardCv.toDataURL('image/png', 1.0);
  a.click();
}

document.getElementById('gName').addEventListener('keydown', e => { if(e.key==='Enter') go(); });
</script>
</body>
</html>
'''

Dựa vào đoạn code tham khảo, hãy hoàn thành các task ở dưới:


#TASK 05 — Frontend: Trang tạo sự kiện (index.html)

Tạo public/index.html — trang tạo sự kiện cho Host.

Thiết kế: cùng phong cách với file thiệp đính kèm (màu cream #fdfcf7, vàng #b3915f, font Cormorant Garamond + Montserrat, đường viền tinh tế).

Chức năng:
1. Form gồm 3 field: Tên chủ tiệc, Thời gian (datetime-local), Địa điểm.
2. Nút "Tạo Link Chia Sẻ" → gọi POST /api/events → hiển thị kết quả.
3. Sau khi tạo thành công, ẩn form, hiện panel kết quả gồm:
   - Link chia sẻ (publicUrl) + nút Copy
   - Link quản lý (adminUrl) + nút Copy  
   - Cảnh báo nổi bật: "Vui lòng lưu lại link quản lý này. Hệ thống không yêu cầu đăng nhập và không thể khôi phục link nếu mất."
4. Có animation khi hiện panel kết quả (fadeIn + slideUp).
5. Xử lý lỗi: hiện thông báo nếu API trả lỗi.

File này phải standalone (không dùng framework), chỉ dùng Fetch API.


#TASK 06 — Frontend: Trang khách mời (event.html)
Tạo public/event.html — trang dành cho Guest khi nhận được link mời.

Tích hợp toàn bộ code canvas/animation từ file thiệp đính kèm (giữ nguyên logic drawCard, runLoading, growing tree animation).

Luồng hoạt động:
1. Khi load trang: đọc eventId từ URL (path /e/:eventId), gọi GET /api/events/:id.
   - Nếu 404: hiện thông báo "Sự kiện không tồn tại hoặc đã kết thúc."
   - Nếu OK: điền host_name, event_time, location vào giao diện chào mừng.
2. Giao diện chào mừng: hiển thị "Bạn được [host_name] mời đến [tên sự kiện]" + ô input nhập tên + nút "Tạo Thiệp".
3. Sau khi nhập tên và bấm "Tạo Thiệp": chạy animation loading (giữ nguyên code tham khảo), render thiệp với tên Guest + thông tin sự kiện từ API (thay thế hardcode).
4. Sau khi thiệp hiện ra: hiện 2 nút action:
   - "✓ Tôi sẽ đến dự" → gọi POST /api/events/:id/guests với status='attending' → hiện thông báo xác nhận
   - "✉ Chỉ gửi lời chúc" → gọi POST /api/events/:id/guests với status='wish_only' → hiện thông báo
   - "⬇ Tải thiệp xuống" → download PNG (giữ nguyên logic cũ)
5. Sau khi bấm 1 trong 2 nút action: disable cả 2 nút, hiện thông báo "Đã ghi nhận phản hồi của bạn."

Lưu ý: thông tin sự kiện (event_time, location) phải được truyền vào hàm drawCard() thay vì hardcode.

