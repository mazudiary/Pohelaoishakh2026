// ============================================================
// CURSOR
// ============================================================
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX=0,mouseY=0,curX=0,curY=0;
document.addEventListener('mousemove',e=>{mouseX=e.clientX;mouseY=e.clientY;cursorDot.style.left=mouseX+'px';cursorDot.style.top=mouseY+'px';});
(function animCursor(){curX+=(mouseX-curX)*.12;curY+=(mouseY-curY)*.12;cursor.style.left=curX+'px';cursor.style.top=curY+'px';requestAnimationFrame(animCursor);})();

// ============================================================
// PASSWORD
// ============================================================
const correctPws = ['Lopai', '20025', '2002520026', 'Premii'];
function checkPassword(){
  const v = document.getElementById('pwInput').value.toLowerCase().trim();
  if (correctPws.includes(v)) {
    unlockHeart();
  } else {
    const err = document.getElementById('gateErr');
    err.classList.add('show');
    document.getElementById('pwInput').style.borderColor = 'rgba(255,45,120,0.8)';
    setTimeout(() => {
      err.classList.remove('show');
      document.getElementById('pwInput').style.borderColor = 'rgba(245,200,66,0.4)';
    }, 3000);
    shakeInput();
  }
}
document.getElementById('pwInput').addEventListener('keypress',e=>{if(e.key==='Enter')checkPassword();});
function shakeInput(){
  const inp=document.getElementById('pwInput');
  inp.style.animation='none';
  void inp.offsetWidth;
  inp.style.animation='inputShake .4s ease';
}
document.getElementById('pwInput').style.cssText+=``;
const shakeStyle=document.createElement('style');
shakeStyle.textContent=`@keyframes inputShake{0%,100%{transform:translateX(0);}20%{transform:translateX(-10px);}40%{transform:translateX(10px);}60%{transform:translateX(-8px);}80%{transform:translateX(8px);}}`;
document.head.appendChild(shakeStyle);

function unlockHeart(){
  const gate=document.getElementById('gate');
  gate.style.transition='all 1.5s cubic-bezier(.16,1,.3,1)';
  gate.style.opacity='0';
  gate.style.transform='scale(1.1)';
  setTimeout(()=>{
    gate.style.display='none';
    document.getElementById('mainExp').style.display='block';
    initMain();
  },1500);
}

// ============================================================
// GATE PARTICLES
// ============================================================
(function initGateParticles(){
  const c=document.getElementById('gateParticles');
  const colors=['#f5c842','#ff2d78','#b400ff','#ff6b8a','#ffffff'];
  for(let i=0;i<50;i++){
    const p=document.createElement('div');
    p.className='gate-p';
    p.style.cssText=`left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};width:${Math.random()*3+1}px;height:${Math.random()*3+1}px;animation-duration:${Math.random()*10+8}s;animation-delay:${Math.random()*10}s;`;
    c.appendChild(p);
  }
})();

// ============================================================
// MAIN INIT
// ============================================================
function initMain(){
  initParticles();
  initFlowers();
  initNagoStars();
  initUniStars();
  initScrollReveal();
  initProgressBar();
  startNagoTextAnimation();
  initLetterTypewriter();
  initPromiseCards();
  window.scrollTo(0,0);
}

// ============================================================
// CANVAS PARTICLES
// ============================================================
function initParticles(){
  const canvas=document.getElementById('particles');
  const ctx=canvas.getContext('2d');
  let W=window.innerWidth,H=document.body.scrollHeight;
  canvas.width=W;canvas.height=H;
  window.addEventListener('resize',()=>{W=window.innerWidth;H=document.body.scrollHeight;canvas.width=W;canvas.height=H;});
  const pts=[];
  for(let i=0;i<120;i++){
    pts.push({
      x:Math.random()*W,y:Math.random()*H,
      r:Math.random()*1.5+0.3,
      vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,
      a:Math.random(),da:Math.random()*.02-.01,
      c:['rgba(245,200,66,','rgba(255,107,138,','rgba(180,0,255,','rgba(255,255,255,'][Math.floor(Math.random()*4)]
    });
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.a+=p.da;
      if(p.a<0||p.a>1)p.da*=-1;
      if(p.x<0||p.x>W)p.vx*=-1;
      if(p.y<0||p.y>H)p.vy*=-1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.c+Math.max(0,Math.min(1,p.a))+')';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ============================================================
// FLOWERS
// ============================================================
function initFlowers(){
  const container=document.getElementById('flowersContainer');
  const emojis=['🌺','🌸','🌼','🌻','💮','🌷'];
  for(let i=0;i<18;i++){
    const f=document.createElement('div');
    f.className='flower';
    f.textContent=emojis[Math.floor(Math.random()*emojis.length)];
    f.style.cssText=`left:${Math.random()*100}%;animation-duration:${Math.random()*12+10}s;animation-delay:${Math.random()*15}s;font-size:${Math.random()*16+12}px;`;
    container.appendChild(f);
  }
}

// ============================================================
// NAGO STARS
// ============================================================
function initNagoStars(){
  const sky=document.getElementById('nagoSky');
  for(let i=0;i<80;i++){
    const s=document.createElement('div');
    s.className='star';
    const sz=Math.random()*2+0.5;
    s.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*70}%;background:rgba(255,255,255,${Math.random()*.8+.2});animation-duration:${Math.random()*3+1}s;animation-delay:${Math.random()*3}s;`;
    sky.appendChild(s);
  }
}

// ============================================================
// UNIVERSE STARS
// ============================================================
function initUniStars(){
  const sec=document.getElementById('universe');
  for(let i=0;i<60;i++){
    const s=document.createElement('div');
    s.className='uni-star';
    const sz=Math.random()*1.5+0.3;
    s.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;background:rgba(255,255,255,${Math.random()*.7+.2});animation:twinkle ${Math.random()*3+1}s ease-in-out infinite;animation-delay:${Math.random()*3}s;position:absolute;border-radius:50%;`;
    sec.appendChild(s);
  }
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initScrollReveal(){
  const els=document.querySelectorAll('.reveal');
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');}});
  },{threshold:.15});
  els.forEach(el=>obs.observe(el));
}

// ============================================================
// PROGRESS BAR
// ============================================================
function initProgressBar(){
  window.addEventListener('scroll',()=>{
    const h=document.body.scrollHeight-window.innerHeight;
    const pct=h>0?(window.scrollY/h*100):0;
    document.getElementById('progressBar').style.width=pct+'%';
  });
}

// ============================================================
// NAGORDOLA TEXT ANIMATION
// ============================================================
function startNagoTextAnimation(){
  const lines=document.querySelectorAll('.nago-line');
  const obs=new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
      lines.forEach((l,i)=>{
        setTimeout(()=>l.classList.add('visible'),i*700+200);
      });
      obs.disconnect();
    }
  },{threshold:.3});
  const box=document.getElementById('nagoTextBox');
  if(box)obs.observe(box);
}

// ============================================================
// HOLD HAND
// ============================================================
let handHeld=false;
function holdHand(){
  if(handHeld)return;
  handHeld=true;
  const btn=document.getElementById('holdHandBtn');
  const msg=document.getElementById('heldMsg');
  const box=document.getElementById('nagoTextBox');
  btn.textContent='💚 Haath Dhore Achhi… 💚';
  btn.classList.add('held');
  box.classList.remove('shake');
  msg.classList.add('show');
  // Pulse screen green briefly
  const flash=document.createElement('div');
  flash.style.cssText='position:fixed;inset:0;background:rgba(0,200,80,0.08);z-index:9000;pointer-events:none;animation:flashFade 1s ease forwards;';
  document.body.appendChild(flash);
  const fs=document.createElement('style');
  fs.textContent='@keyframes flashFade{0%{opacity:1}100%{opacity:0}}';
  document.head.appendChild(fs);
  setTimeout(()=>flash.remove(),1000);
}

// ============================================================
// LOVE LETTER TYPEWRITER
// ============================================================
function initLetterTypewriter(){
  const letterText=`Pohela Boishakh mane notun shuru… 🌅\n\nKintu amar jonne, protidin notun hoy… jokhon tumi amar pashe thako… 💖\n\nFarzana Hossain Lopa…\n\nTumi amar bhoy ke shanti te porinoto koro…\nTumi amar chaos ke love-e convert koro…\n\nYou are not just my love…\nYou are my safe place… 🌸\n\nTumi amar onek kichu jano…\nKintu tumi jano ki?\n\nAmar shob theke boro shotti holo:\nTumi chara amar kono khushi complete na… 💍\n\nValobashiii Valobashaa… 😘\nLoveee of my loveee… 💖✨`;

  const el=document.getElementById('typewriterEl');
  const cursor=document.createElement('span');
  cursor.className='typewriter-cursor';

  let started=false;
  const obs=new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting&&!started){
      started=true;
      typeIt(el,letterText,cursor,0);
      obs.disconnect();
    }
  },{threshold:.3});
  const wrap=document.getElementById('letterWrap');
  if(wrap)obs.observe(wrap);
}

function typeIt(el,text,cursor,idx){
  if(idx===0){el.appendChild(cursor);}
  if(idx>=text.length){return;}
  const ch=text[idx];
  cursor.before(ch==='\n'?document.createElement('br'):document.createTextNode(ch));
  const delay=ch==='\n'?80:ch==='…'?120:28;
  setTimeout(()=>typeIt(el,text,cursor,idx+1),delay);
}

// ============================================================
// ORB MODAL
// ============================================================
const orbData={
  love:{icon:'💖',title:'Our Love — Amader Valobasha',text:'Tumi amar protidin er shundor karon… Shokal hoye uthle tomar kotha mone hoy… Rate ghomar age tomar kotha bhabi… Amader love ta ekta universe er moto — boundless, infinite, beautiful… 💖\n\nYou are my everything, Lopa. ✨'},
  fear:{icon:'😨',title:'The Nagordola Night — Shei Raat',text:'Onek upore uthsilam… Amar haath kapchilo… Bhoy ta onek boro chilo… Kintu tomar kotha mone porchilo… Mone hocchilo jodi tumi pashe thakto… tahole hoyto amar haath kapoto na… 💔\n\nSei bhoy ta ekhon amar shondor shopno… 🌟'},
  dream:{icon:'🌸',title:'Our Dreams — Amader Shopno',text:'Ekdin amra ekashathe shundor shokal dekho… Notun Boishakh celebrate kori… Nagordola te tomar haat dhorei uthbo… Tumi hasbe… Ami dekhbo… Sei hasita-i amar jibon… 🌸\n\nAmader shopno shotti hobe, Lopa… ami promise korchi… 💍'},
  future:{icon:'💍',title:'Our Future — Amader Kal',text:'Ekta shundor bhabisyot amader jonno opekkha korche… Jokhon sob kichu thik thakbe, ami tomar pashe thakbo… Prottek Boishakhe tomar haath dhore celebrate korbo… Amader golpo-ta shudhu shuru hochhe… 💍\n\nWill you write this story with me, Lopa? 💖✨'}
};
function openOrb(type){
  const d=orbData[type];
  document.getElementById('orbIcon').textContent=d.icon;
  document.getElementById('orbTitle').textContent=d.title;
  document.getElementById('orbText').innerHTML=d.text.replace(/\n/g,'<br/>');
  document.getElementById('orbModal').classList.add('open');
}
function closeOrb(){document.getElementById('orbModal').classList.remove('open');}

// ============================================================
// PROMISE CARDS STAGGER
// ============================================================
function initPromiseCards(){
  const cards=document.querySelectorAll('.promise-card');
  const obs=new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
      cards.forEach((c,i)=>setTimeout(()=>c.classList.add('visible'),i*200));
      obs.disconnect();
    }
  },{threshold:.2});
  const wrap=document.getElementById('promiseCards');
  if(wrap)obs.observe(wrap);
}

// ============================================================
// TOUCH HEART
// ============================================================
let heartTouched=false;
function touchHeart(){
  const btn=document.getElementById('bigHeart');
  const msg=document.getElementById('hbMsg');
  if(!heartTouched){heartTouched=true;btn.classList.add('touched');}
  msg.classList.add('show');
  launchFireworks();
  // Screen glow
  document.body.style.transition='background .3s';
  const overlay=document.createElement('div');
  overlay.style.cssText='position:fixed;inset:0;background:radial-gradient(circle at center,rgba(255,45,120,0.15),transparent 70%);z-index:8000;pointer-events:none;animation:flashFade .8s ease forwards;';
  document.body.appendChild(overlay);
  setTimeout(()=>overlay.remove(),800);
}
function launchFireworks(){
  const c=document.getElementById('fwContainer');
  const colors=['#f5c842','#ff2d78','#b400ff','#ff6b8a','#00c864','#00c8ff'];
  for(let i=0;i<30;i++){
    const p=document.createElement('div');
    p.className='fw-particle';
    const angle=Math.random()*Math.PI*2;
    const dist=60+Math.random()*80;
    const color=colors[Math.floor(Math.random()*colors.length)];
    p.style.cssText=`background:${color};width:${Math.random()*6+3}px;height:${Math.random()*6+3}px;animation:fwBurst ${Math.random()*.5+.6}s ease-out forwards;animation-delay:${Math.random()*.3}s;--tx:${Math.cos(angle)*dist}px;--ty:${Math.sin(angle)*dist}px;`;
    p.style.setProperty('--tx',`${Math.cos(angle)*dist}px`);
    p.style.setProperty('--ty',`${Math.sin(angle)*dist}px`);
    p.style.animation=`none`;
    c.appendChild(p);
    void p.offsetWidth;
    p.style.animation=``;
    p.style.animationName=`fwBurst`;
    p.style.animationDuration=`${Math.random()*.5+.6}s`;
    p.style.animationDelay=`${Math.random()*.3}s`;
    p.style.animationFillMode=`forwards`;
    p.style.animationTimingFunction=`ease-out`;
    p.style.transform=`translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist}px)) scale(0)`;
    void p.offsetWidth;
    p.style.transition=`transform ${Math.random()*.5+.6}s ease-out ${Math.random()*.3}s, opacity ${Math.random()*.5+.6}s ease-out ${Math.random()*.3}s`;
    p.style.transform=`translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist}px)) scale(1)`;
    p.style.opacity='0';
    setTimeout(()=>p.remove(),1200);
  }
}

// ============================================================
// SAY YES
// ============================================================
function sayYes(){
  document.getElementById('proposalBtns').style.display='none';
  const r=document.getElementById('yesResponse');
  r.style.display='block';
  setTimeout(()=>r.classList.add('show'),50);
  // Firework finale
  for(let i=0;i<5;i++){
    setTimeout(()=>{
      const overlay=document.createElement('div');
      overlay.style.cssText=`position:fixed;inset:0;background:radial-gradient(circle at ${30+Math.random()*40}% ${30+Math.random()*40}%,rgba(245,200,66,0.12),transparent 60%);z-index:8000;pointer-events:none;animation:flashFade .6s ease forwards;`;
      document.body.appendChild(overlay);
      setTimeout(()=>overlay.remove(),600);
    },i*400);
  }
}

// ============================================================
// SCROLL HELPER
// ============================================================
function scrollToSection(id){
  const el=document.getElementById(id);
  if(el)el.scrollIntoView({behavior:'smooth'});
}

// ============================================================
// MUSIC TOGGLE (Web Audio API ambient)
// ============================================================
let audioCtx=null,musicPlaying=false,gainNode=null,oscillators=[];
document.getElementById('musicBtn').addEventListener('click',toggleMusic);
function toggleMusic(){
  if(!musicPlaying){startMusic();document.getElementById('musicBtn').textContent='🔇';}
  else{stopMusic();document.getElementById('musicBtn').textContent='🎵';}
  musicPlaying=!musicPlaying;
}
function startMusic(){
  try{
    audioCtx=new(window.AudioContext||window.webkitAudioContext)();
    gainNode=audioCtx.createGain();
    gainNode.gain.setValueAtTime(0,audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.06,audioCtx.currentTime+2);
    gainNode.connect(audioCtx.destination);
    const masterReverb=audioCtx.createConvolver();
    gainNode.connect(masterReverb);
    masterReverb.connect(audioCtx.destination);

    // Ambient drone notes (pentatonic — warm, emotional)
    const notes=[196,220,261.63,329.63,392,440,523.25];
    function playNote(freq,startTime,dur,vol){
      const osc=audioCtx.createOscillator();
      const g=audioCtx.createGain();
      osc.type='sine';
      osc.frequency.setValueAtTime(freq,startTime);
      g.gain.setValueAtTime(0,startTime);
      g.gain.linearRampToValueAtTime(vol,startTime+.5);
      g.gain.linearRampToValueAtTime(0,startTime+dur-.3);
      osc.connect(g);g.connect(gainNode);
      osc.start(startTime);osc.stop(startTime+dur);
      oscillators.push(osc);
    }
    let t=audioCtx.currentTime;
    function scheduleLoop(){
      const melody=[196,220,261.63,329.63,392,440,392,329.63];
      melody.forEach((freq,i)=>{playNote(freq,t+i*3,4,.4);});
      // Harmony
      [261.63,329.63,392].forEach((freq,i)=>{playNote(freq,t+i*6,8,.15);});
      t+=melody.length*3;
    }
    scheduleLoop();
    const loopInterval=setInterval(()=>{if(musicPlaying)scheduleLoop();else clearInterval(loopInterval);},notes.length*3*1000);
  }catch(e){console.log('Audio not supported');}
}
function stopMusic(){
  if(gainNode)gainNode.gain.linearRampToValueAtTime(0,audioCtx.currentTime+.5);
  setTimeout(()=>{if(audioCtx)audioCtx.close();},600);
  musicPlaying=false;
}

// ============================================================
// NAGO SHAKE ON SCROLL (when in view)
// ============================================================
const ferrisWrap=document.querySelector('.ferris-wrap');
if(ferrisWrap){
  const shakeObs=new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting&&!handHeld){
      ferrisWrap.classList.add('shake');
    }else{
      ferrisWrap.classList.remove('shake');
    }
  },{threshold:.5});
  shakeObs.observe(ferrisWrap);
}