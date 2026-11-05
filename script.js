/* ====== PERSONALIZE AQUI ====== */
const CONFIG = {
  nome: "Lindinha",                   // nome dela
  desde: "2023-02-14T00:00:00",   // início do namoro
  mensagemFinal: "Que este novo ciclo venha com muito amor, saúde e sonhos realizados. Obrigado por fazer parte da minha vida. Te amo!",
  perfis: [
    // foto: deixe "" para mostrar o emoji; para usar a foto dela, envie a imagem no chat e eu incluo aqui
    {nome:"Lindinha da Silva", emoji:"👑", foto:"", cor:"#1f9d6b", titulo:"Feliz aniversário, {nome}!", desc:"A temporada mais aguardada do ano chegou. Prepare a pipoca: hoje o dia é todo seu."}
  ],
  // v: endereço do vídeo de cada episódio (deixe "" até enviar o vídeo)
  momentos: [
    {t:"Buquê de Margaridas", e:"🌼", v:""},
    {t:"Kit Sheglam Harry Potter", e:"🪄", v:""},
    {t:"Bíblia Ara Verde", e:"📖", v:""},
    {t:"LEGO Tartaruga", e:"🐢", v:""},
    {t:"Pelúcia Tartaruga Ninja", e:"🥷", v:""},
    {t:"Pelúcia de Cachorro", e:"🐶", v:""},
    {t:"Perfume Árabe", e:"🧴", v:""},
    {t:"O Pequeno Príncipe", e:"👑", v:""},
    {t:"The Big Bang Theory", e:"🧪", v:""},
    {t:"Crocs", e:"👟", v:""},
    {t:"Canecas", e:"☕", v:""},
    {t:"Naruto", e:"🍥", v:""},
    {t:"Livro de Historinhas", e:"📚", v:""},
    {t:"Cartinhas", e:"💌", v:""},
    {t:"LEGO Flor", e:"🌸", v:""},
    {t:"Batom Coca-Cola", e:"💄", v:""},
    {t:"Funko Baby Yoda", e:"💚", v:""}
  ],
  fimMomentos: "Estes foram os presentes, escolhidos com muito carinho para você. Feliz aniversário!",
  // senha e dica do item protegido "De muito longe"; v: endereço do vídeo (deixe "" até enviar)
  longe: {titulo:"De muito longe", e:"💌", senha:"Jesus", dica:"Alguém muito próximo decidiu a senha e enviou a ti.", yt:"URuj-LyYP2Q", v:""},
  fileiras: [
    {titulo:"Motivos para te amar", itens:[
      {t:"Seu sorriso", e:"😊", c:["#a3d65c","#1f8a5a"], m:"98% de amor • HD", d:"Seu sorriso faz o meu dia carregar sem nenhum erro."},
      {t:"Seu apoio", e:"🤝", c:["#15a38a","#0b4f4a"], m:"98% de amor • HD", d:"Você me apoia até quando o código não compila."},
      {t:"Seu abraço", e:"🫂", c:["#2fd48a","#14785a"], m:"98% de amor • HD", d:"Seu abraço é meu lugar favorito no mundo."},
      {t:"Seu jeito", e:"💚", c:["#1f9d6b","#0d4d3a"], m:"98% de amor • HD", d:"Do seu jeito único de ser, eu gosto de cada detalhe."}
    ]},
    {titulo:"Em breve", itens:[
      {t:"Próxima viagem", e:"✈️", c:["#25b27a","#0f5a46"], m:"Lançamento em breve", d:"Escreva aqui um plano que vocês têm juntos."},
      {t:"Nosso cantinho", e:"🏡", c:["#4cc9a0","#1c7c63"], m:"Lançamento em breve", d:"Escreva aqui um sonho de vocês."},
      {t:"Temporada 2.0", e:"🚀", c:["#7bd86b","#1b7a4b"], m:"Renovada por tempo indeterminado", d:"Nossa história continua, e o melhor ainda está por vir."}
    ]}
  ]
};
/* ================================ */

const $ = id => document.getElementById(id);
let perfil = null;

$("lista").innerHTML = CONFIG.perfis.map((p,i) =>
  `<button class="perfil" data-i="${i}"><span class="av" style="background:${p.cor}">${p.foto ? `<img src="${p.foto}" alt="">` : p.emoji}</span><span>${p.nome}</span></button>`).join("");
$("lista").onclick = e => { const b = e.target.closest(".perfil"); if (b) entrar(+b.dataset.i); };

function dias(){ return Math.max(0, Math.floor((Date.now() - new Date(CONFIG.desde).getTime())/864e5)); }

function entrar(i){
  perfil = CONFIG.perfis[i];
  $("perfis").style.display = "none";
  $("splash").style.display = "grid";
  setTimeout(() => {
    $("splash").style.display = "none";
    montar();
    $("app").style.display = "block";
    scrollTo(0,0);
  }, 1500);
}

function montar(){
  $("miniAv").style.background = perfil.cor;
  $("miniAv").innerHTML = perfil.foto ? `<img src="${perfil.foto}" alt="">` : perfil.emoji;
  $("trocar").style.display = CONFIG.perfis.length > 1 ? "" : "none";
  maxEp = 0; irMomento(0);
  aba("inicio");
  $("tags").textContent = "ORIGINAL NOSSO PLAY • " + dias() + " DIAS DE HISTÓRIA";
  $("hTitulo").textContent = perfil.titulo.replace("{nome}", CONFIG.nome);
  $("hDesc").textContent = perfil.desc;
  const epCards = CONFIG.momentos.map((m,i) => `<button class="card" data-ep="${i}" style="background:linear-gradient(160deg,${PAL[i%PAL.length][0]},${PAL[i%PAL.length][1]})"><span class="em">${m.e}</span><span><b>${m.t}</b><br><small>Episódio ${i+1}</small></span></button>`).join("");
  const longeRow = `<section class="row"><h3>De muito longe</h3><div class="cards"><button class="card" data-longe="1" style="background:linear-gradient(160deg,#1f9d6b,#0d4d3a)"><span class="em">${CONFIG.longe.e}</span><span><b>${CONFIG.longe.titulo}</b><br><small>🔒 Com senha</small></span></button></div></section>`;
  $("rows").innerHTML = `<section class="row"><h3>Presentes</h3><div class="cards">${epCards}</div></section>` + CONFIG.fileiras.map((f,fi) =>
    `<section class="row"><h3>${f.titulo}</h3><div class="cards">` +
    f.itens.map((it,ii) =>
      `<button class="card" data-f="${fi}" data-i="${ii}" style="background:linear-gradient(160deg,${it.c[0]},${it.c[1]})"><span class="em">${it.e}</span><span><b>${it.t}</b><br><small>${it.m.split("•")[0]}</small></span></button>`
    ).join("") + `</div></section>` + (fi === 0 ? longeRow : "")).join("");
}

$("rows").onclick = e => {
  const b = e.target.closest(".card"); if (!b) return;
  if (b.dataset.longe !== undefined) { aba("longe"); return; }
  if (b.dataset.ep !== undefined) { aba("momentos"); irMomento(+b.dataset.ep); return; }
  const it = CONFIG.fileiras[+b.dataset.f].itens[+b.dataset.i];
  abrir(it.e, it.c, it.t, it.m, it.d);
};
$("btnInfo").onclick = () => abrir("🎬", ["#1f9d6b","#2fd48a"], "Nossa história", dias() + " dias • Temporada 1 • HD", "Cada dia ao seu lado é um episódio que eu assistiria de novo. Explore os títulos abaixo e reviva alguns deles.");
$("btnPlay").onclick = () => { abrir("🎂", ["#2fd48a","#b8e986"], "Feliz aniversário, " + CONFIG.nome + "!", "Episódio especial • Hoje", CONFIG.mensagemFinal); boom(); setTimeout(boom,700); };
$("trocar").onclick = () => { $("app").style.display = "none"; $("perfis").style.display = "flex"; };

function abrir(e,c,t,m,d){
  $("mCap").style.background = `linear-gradient(160deg,${c[0]},${c[1]})`;
  $("mCap").textContent = e; $("mT").textContent = t; $("mM").textContent = m; $("mD").textContent = d;
  $("modal").style.display = "flex";
}
function fechar(){ $("modal").style.display = "none"; }
$("fechar").onclick = fechar;
$("modal").onclick = e => { if (e.target === $("modal")) fechar(); };
addEventListener("keydown", e => { if (e.key === "Escape") fechar(); });

function aba(n){
  const m = n === "momentos", l = n === "longe", ini = n === "inicio";
  $("hero").style.display = ini ? "" : "none";
  $("rows").style.display = ini ? "" : "none";
  $("momentos").style.display = m ? "block" : "none";
  $("longe").style.display = l ? "block" : "none";
  if (l) renderLonge();
  if (!m) pausar();
  document.querySelectorAll(".nav button").forEach(b => b.classList.toggle("on", b.dataset.tab === n));
  scrollTo(0,0);
}
document.querySelector(".nav").onclick = e => { const b = e.target.closest("button"); if (b) aba(b.dataset.tab); };

const PAL = [["#1f9d6b","#0d4d3a"],["#2fd48a","#14785a"],["#7bd86b","#1b7a4b"],["#15a38a","#0b4f4a"],["#a3d65c","#1f8a5a"],["#25b27a","#0f5a46"],["#4cc9a0","#1c7c63"]];
let ep = 0, maxEp = 0;
function renderEps(){
  $("eps").innerHTML = CONFIG.momentos.map((m,i) =>
    `<button data-i="${i}" class="${i===ep?"on":""}">${m.e} ${i+1}. ${m.t}</button>`).join("");
}
function irMomento(i){
  const n = CONFIG.momentos.length, m = CONFIG.momentos[i];
  ep = i; maxEp = Math.max(maxEp, i);
  $("epT").textContent = m.t;
  $("epN").textContent = "Episódio " + (i+1) + " de " + n;
  $("ant").style.display = i > 0 ? "" : "none";
  $("prox").textContent = i < n-1 ? "Ir para o próximo ▶" : "Finalizar 💚";
  $("prox").style.display = "none";
  if (m.v) {
    $("screen").innerHTML = `<video controls playsinline preload="metadata" src="${m.v}"></video>`;
    $("screen").firstChild.onended = () => { $("prox").style.display = "inline-block"; };
  } else {
    $("screen").innerHTML = `<div class="soon"><span class="big">${m.e}</span><b>${m.t}</b><p>Vídeo em breve</p></div>`;
    $("prox").style.display = "inline-block";
  }
  renderEps();
}
$("eps").onclick = e => { const b = e.target.closest("button"); if (b && !b.disabled) { irMomento(+b.dataset.i); scrollTo(0,0); } };
$("ant").onclick = () => { if (ep > 0) { irMomento(ep-1); scrollTo(0,0); } };
$("prox").onclick = () => {
  const n = CONFIG.momentos.length;
  if (ep < n-1) { irMomento(ep+1); scrollTo(0,0); }
  else { boom(); setTimeout(boom,600); abrir("💚",["#2fd48a","#0d4d3a"],"Fim da temporada",n+" episódios",CONFIG.fimMomentos); aba("inicio"); }
};
function pausar(){ document.querySelectorAll("video").forEach(v => v.pause()); }

let longeOk = false;
const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
function renderLonge(){
  $("gate").style.display = longeOk ? "none" : "block";
  $("gateErro").classList.remove("show");
  $("gateDica").style.display = "none";
  $("senha").value = "";
  $("longeConteudo").innerHTML = "";
  if (longeOk) {
    const L = CONFIG.longe;
    $("longeConteudo").innerHTML = L.yt
      ? `<div class="screen shorts"><iframe src="https://www.youtube-nocookie.com/embed/${L.yt}?rel=0&playsinline=1" title="${L.titulo}" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><p class="sub" style="text-align:center;margin-top:12px"><a class="ytlink" href="https://www.youtube.com/shorts/${L.yt}" target="_blank" rel="noopener">Se o vídeo não carregar, abra no YouTube</a></p>`
      : `<div class="screen">` + (L.v ? `<video controls playsinline preload="metadata" src="${L.v}"></video>` : `<div class="soon"><span class="big">${L.e}</span><b>${L.titulo}</b><p>Vídeo em breve</p></div>`) + `</div>`;
  }
}
function tentarSenha(){
  if (norm($("senha").value) === norm(CONFIG.longe.senha)) { longeOk = true; renderLonge(); boom(); }
  else { const er = $("gateErro"); er.classList.remove("show"); void er.offsetWidth; er.classList.add("show"); }
}
$("entrar").onclick = tentarSenha;
$("senha").onkeydown = e => { if (e.key === "Enter") tentarSenha(); };
$("dica").onclick = () => { const d = $("gateDica"); d.textContent = "💡 " + CONFIG.longe.dica; d.style.display = "block"; };

$("logoHome").onclick = () => aba("inicio");

/* confete */
const cv = $("c"), ctx = cv.getContext("2d"); let ps = [], rodando = false;
function size(){ cv.width = innerWidth; cv.height = innerHeight; }
size(); addEventListener("resize", size);
function boom(){
  const cores = ["#2fd48a","#7bd86b","#b8e986","#1fb6a6","#e9f7a3"];
  for (let k = 0; k < 140; k++) ps.push({x:innerWidth/2,y:innerHeight/3,vx:(Math.random()-.5)*14,vy:Math.random()*-12-2,r:Math.random()*5+3,c:cores[k%5],l:140});
  if (!rodando) { rodando = true; anim(); }
}
function anim(){
  ctx.clearRect(0,0,cv.width,cv.height);
  ps = ps.filter(p => p.l-- > 0);
  ps.forEach(p => { p.x+=p.vx; p.y+=p.vy; p.vy+=.3; ctx.fillStyle=p.c; ctx.globalAlpha=Math.max(p.l/140,0); ctx.fillRect(p.x,p.y,p.r,p.r); });
  if (ps.length) requestAnimationFrame(anim); else { rodando = false; ctx.clearRect(0,0,cv.width,cv.height); }
}
