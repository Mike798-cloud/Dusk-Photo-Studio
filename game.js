(function(){
'use strict';

const SAVE_KEY='twilight_photo_studio_save_v1';
const BACKUP_KEY='twilight_photo_studio_save_backup_v1';
const SETTINGS_KEY='twilight_photo_studio_settings_v1';
const VERSION='1.0.0';

const GUESTS={
  0:{name:'咔嗒',role:'暗房引导',portrait:'assets/characters/kada-camera.svg'},
  1:{name:'白棠',role:'绵羊面包师',portrait:'assets/characters/baitang-sheep.svg'},
  2:{name:'阿潮',role:'水獭渡船员',portrait:'assets/characters/achao-otter.svg'},
  3:{name:'杏禾',role:'狐狸舞台设计师',portrait:'assets/characters/xinghe-fox.svg'},
  4:{name:'青芒老师',role:'白鹭退休教师',portrait:'assets/characters/qingmang-heron.svg'},
  5:{name:'小栎',role:'被照片裁掉的自己',portrait:'assets/characters/player-hedgehog.svg'},
  6:{name:'柏叔',role:'照相馆旧主人',portrait:'assets/characters/bo-uncle.svg'}
};

const CHAPTERS=[
  {kicker:'序章',title:'重新对焦',night:'开馆之暮',env:'百叶窗把夕光切成细长的亮带，旧镜头停在十二年前的位置。'},
  {kicker:'第一卷',title:'被裁掉的人',night:'第 1 / 6 卷',env:'白棠把旧家庭照压在桌边，缺口处只剩一小截羊毛围巾。'},
  {kicker:'第二卷',title:'渡口上的光',night:'第 2 / 6 卷',env:'暴雨底片上只有几个模糊灯点，阿潮始终不敢靠近灯箱。'},
  {kicker:'第三卷',title:'旧戏院的影子',night:'第 3 / 6 卷',env:'投影机的光束穿过尘埃，停电夜的路线第一次重新出现。'},
  {kicker:'第四卷',title:'并不存在的合影',night:'第 4 / 6 卷',env:'五张底片的颗粒并不一致，镇史上最有名的照片开始露出接缝。'},
  {kicker:'第五卷',title:'每个人站在哪里',night:'第 5 / 6 卷',env:'多重曝光里有一处被反复遮住的空位，玻璃倒影像一根旧刺。'},
  {kicker:'第六卷',title:'未显影的你',night:'第 6 / 6 卷',env:'最后一张相纸浸入显影液，童年的你慢慢回到画面。'},
  {kicker:'尾声',title:'照片应该去哪里',night:'六卷之后',env:'原片、修复版与钥匙并排放在柜台上。今天不再有标准答案。'}
];

const FLOW=[
  {type:'story',chapter:0,title:'回到云岸镇',speaker:'小栎',text:'柏叔去外地做眼部治疗，把即将拆除的暮光照相馆交给你临时整理。纸箱最上方压着六卷胶片和一句话：“看完再决定，不必替我留下。”'},
  {type:'puzzle',chapter:0,pid:'p01',title:'镜头对焦校准',desc:'按校准卡上的景深顺序，让远景、中景、近景依次清晰。'},
  {type:'story',chapter:0,title:'咔嗒醒来了',speaker:'咔嗒',text:'快门柄轻轻弹了一下，旧教学磁带自动播放：“先把焦点交还给眼前的人。”你明知道这是柏叔录下的声音，却还是把它当作咔嗒在陪你。'},
  {type:'story',chapter:1,title:'来客：白棠',speaker:'白棠',text:'“我只想把照片修平整，不需要补回缺口。”她说得很快。家庭照右侧被剪掉一角，残留的围巾颜色与她妹妹常戴的那条一模一样。'},
  {type:'puzzle',chapter:1,pid:'p02',title:'负片补边',desc:'把四段负片放回灯箱。依据齿孔编号、衣角轮廓和曝光颗粒判断位置；D 片需要旋转一次。'},
  {type:'story',chapter:1,title:'被剪掉的不是陌生人',speaker:'白棠',text:'拼回的底片显示，妹妹原本正把一袋面包递给白棠。照片背后那场争执并不是妹妹离开家庭，而是白棠在最难堪的时候主动把她裁掉。'},
  {type:'puzzle',chapter:1,pid:'p03',title:'裁切边缘显影',desc:'依次使用侧光、放大镜和补边框，读出剪裁前写在照片边缘的日期与地点。'},
  {type:'choice',chapter:1,cid:'fox',title:'怎样归还这张照片？',options:[
    {id:'old',label:'恢复完整照片并交给白棠',detail:'让被剪掉的事实重新回到画面。',stat:'honesty'},
    {id:'new',label:'把原片与裁切版一起交还',detail:'由白棠决定何时、以什么方式面对妹妹。',stat:'boundary'}]},
  {type:'story',chapter:2,title:'暴雨中的接触印样',speaker:'阿潮',text:'阿潮把六格底片放在灯箱旁：“那晚渡口一度全黑。我记得有人受伤，也记得远处亮过一下，可我不敢确认那束光是不是我想出来的。”'},
  {type:'puzzle',chapter:2,pid:'p04',title:'快门间隔排序',desc:'比较六格边缘的快门划痕，输入短、短、长、短的拍摄节奏，打开接触印样夹层。'},
  {type:'puzzle',chapter:2,pid:'p05',title:'曝光修复',desc:'调整曝光、对比度与阴影细节，让暴雨渡口的灯点从欠曝区域中恢复。'},
  {type:'story',chapter:2,title:'光来自照相馆楼顶',speaker:'阿潮',text:'阴影中出现一束跨过街道的投影光，它没有照亮整座镇，却刚好给渡船靠岸留下了方向。阿潮低声说：“原来我不是凭空记住它。”'},
  {type:'puzzle',chapter:2,pid:'p06',title:'停电夜时间线',desc:'将街区灯饰过载、旧投影机接入与独立蓄电池启动按时间顺序排列。'},
  {type:'choice',chapter:2,cid:'chen',title:'怎样陪阿潮看完？',options:[
    {id:'together',label:'陪他把整卷底片看完',detail:'让模糊、害怕和救援同时留在记录里。',stat:'honesty'},
    {id:'alone',label:'关小灯箱，把原片留给他',detail:'给他不被注视地重新观看那一夜的空间。',stat:'boundary'}]},
  {type:'story',chapter:3,title:'戏院的线路记录',speaker:'杏禾',text:'十二年前，杏禾负责暮灯节舞台。镇上一直有人说，她擅自接入投影机导致全街停电。她想证明自己无辜，却又害怕公开记录会把责任推给另一个人。'},
  {type:'puzzle',chapter:3,pid:'p07',title:'滤镜组合',desc:'选择三片光学滤镜，使投影光同时满足亮度、穿透与柔化目标。'},
  {type:'puzzle',chapter:3,pid:'p08',title:'双层光路',desc:'将六个反射节点分配到上层与下层光路，让光束避开戏院帷幕并抵达渡口。'},
  {type:'story',chapter:3,title:'投影机不是根因',speaker:'杏禾',text:'线路图证明街区灯饰早已超载，投影机只是最后接入的设备。真正改变那一夜的，是有人将投影机切到独立蓄电池，并把光束转向渡口。'},
  {type:'choice',chapter:3,cid:'siblings',title:'线路记录怎样公开？',options:[
    {id:'show',label:'公开完整记录纠正传言',detail:'让多年误解被清楚写回镇史。',stat:'honesty'},
    {id:'return',label:'先交给当事人共同决定',detail:'避免用一次新的公开替所有人发言。',stat:'boundary'}]},
  {type:'story',chapter:4,title:'五张照片的接缝',speaker:'青芒老师',text:'镇史展览中的《停电之后》被称为柏叔按下的一次完美快门。但放大后，人物雨痕、窗影方向和胶片颗粒都不一致。'},
  {type:'puzzle',chapter:4,pid:'p09',title:'底片来源判定',desc:'依据颗粒、水印、遮罩笔痕与边缘编号，判断六块影像是原始底片、柏叔拼接层，还是童年玩家的胶片。'},
  {type:'puzzle',chapter:4,pid:'p10',title:'双底片叠合',desc:'调整位置与透明度，让窗框、灯影和人物座位重合，检查拼接是否经过当事人确认。'},
  {type:'story',chapter:4,title:'拼接不等于捏造',speaker:'青芒老师',text:'叠合层里出现每位当事人的确认手印。停电夜没有一台相机拍下完整场面，柏叔把不同人真实拍到的救援片段组合起来，只为了让没有站在中心的人也被看见。'},
  {type:'choice',chapter:4,cid:'records',title:'展览是否呈现拼接过程？',options:[
    {id:'public',label:'同时展示原片和拼接过程',detail:'让照片如何形成也成为历史的一部分。',stat:'honesty'},
    {id:'private',label:'只展示成片，原片归还本人',detail:'把被观看的边界交给影像中的每个人。',stat:'boundary'}]},
  {type:'story',chapter:5,title:'多重曝光里的空位',speaker:'小栎',text:'第五卷毕业合照被覆盖曝光三次。分离后的玻璃倒影里，有个小刺猬抱着投影机电源线，却在最终照片中被遮罩笔彻底擦去。'},
  {type:'puzzle',chapter:5,pid:'p11',title:'投影光路径',desc:'依次选择窗框、反光牌、水面和渡口，让独立蓄电池的光束抵达安全靠岸点。'},
  {type:'story',chapter:6,title:'第六卷胶片盒',speaker:'小栎',text:'胶片盒内侧贴着童年的笔迹：‘请把我剪掉，但不要把那束光剪掉。’这一次，你决定让最后一张相纸完整显影。'},
  {type:'puzzle',chapter:6,pid:'p12',title:'第六张相纸',desc:'按显影、定影、水洗的正确顺序处理相纸，恢复被遮罩的童年身影。'},
  {type:'story',chapter:6,title:'被删除的人是你',speaker:'柏叔',text:'教学磁带最后一段终于播放：“停电不是你一个人造成的，灯也不是我一个人点亮的。是你请求我把你从照片里剪掉，因为你不想再看见那一天。”'},
  {type:'tea',chapter:6,title:'决定最终构图',desc:'从六件修复物中任选三件放进第六张照片。没有标准构图，它只决定你愿意怎样重新讲述那一夜。'},
  {type:'final',chapter:7,title:'照片与照相馆的明天',desc:'决定是否经营、开放档案、带走暗房或归还钥匙。任何选择都不是失败。'}
];

const PUZZLES={
 p01:{hints:['先观察校准卡上三个物体的距离标记。','校准从最远处开始，逐步把焦点拉回近处。','完整顺序：远景 → 中景 → 近景。'],answer:'远景 → 中景 → 近景'},
 p02:{hints:['先对齐负片齿孔编号，再看衣角和雨痕。','A/B 在上排，C/D 在下排；D 的人物方向相反。','A 左上、B 右上、C 左下、D 右下；D 旋转 90°。'],answer:'A/B/C/D，D 旋转 90°'},
 p03:{hints:['剪裁边缘需要先看侧光下的纤维。','放大后才能找到被剪断的铅笔字，最后用补边框校准。','依次使用：侧光检查 → 放大纤维 → 补边显字。地点为“旧渡口照相亭”。'],answer:'侧光 → 放大 → 补边'},
 p04:{hints:['看每格边缘的快门拖影长短。','第三格拖影明显更长，其余三格都短。','输入：短 → 短 → 长 → 短。'],answer:'短短长短'},
 p05:{hints:['先让曝光接近正常，再调对比和阴影。','修复卡的三个目标分别围绕 70、95、60。','曝光 70%、对比度 95%、阴影细节 60%；允许小范围误差。'],answer:'70 / 95 / 60'},
 p06:{hints:['灯饰线路在投影机之前已经过载。','投影机接入触发跳闸，独立蓄电池在停电后启动。','顺序：灯饰过载 → 投影机接入 → 蓄电池启动。'],answer:'灯饰过载 → 投影机接入 → 蓄电池启动'},
 p07:{hints:['三个目标分别是亮度、穿透和柔化。','琥珀片提供亮度，蓝灰片提高穿透，柔光片补足柔化。','选择：琥珀滤镜 + 蓝灰滤镜 + 柔光片。'],answer:'琥珀 + 蓝灰 + 柔光'},
 p08:{hints:['两条光路不能在同一个反射点相撞。','上层负责镜头、反光镜和窗框；下层负责街牌、水面与渡口。','上层：镜头/反光镜/窗框；下层：街牌/水面/渡口。'],answer:'上：镜头/镜/窗；下：街牌/水面/渡口'},
 p09:{hints:['同一张照片中的颗粒并不代表同一块底片。','A/C/F 是原始拍摄层；B/D 有柏叔遮罩编号；E 带童年相机齿孔。','A、C、F=原始底片；B、D=柏叔拼接层；E=童年玩家。'],answer:'A/C/F 原片，B/D 拼接，E 童年'},
 p10:{hints:['先对齐窗框竖线，再看灯影落点。','上层底片向右约 18，透明度略高于一半。','位置 18，透明度 55%；接近即视为对齐。'],answer:'位置 18 / 透明度 55'},
 p11:{hints:['观察线路草图上四个可反光节点。','光束应先穿过窗框，再到反光牌、水面，最后抵达渡口。','依次点击：窗框 → 反光牌 → 水面 → 渡口。'],answer:'窗框-反光牌-水面-渡口'},
 p12:{hints:['相纸处理不是同时进行，要按暗房流程。','显影让影像出现，定影让它稳定，最后才能水洗。','依次：显影 → 定影 → 水洗。'],answer:'显影 → 定影 → 水洗'}
};

const MEMORY_TEXT=[
 '白棠照片袋里留着妹妹做的面包标签。日期是争执后的第二天，说明对方仍然来过。',
 '阿潮船灯底部写着“看不清也可以慢一点”，字迹来自十二年前的柏叔。',
 '戏院反光镜背面有杏禾的修理记录。她在停电前已经三次申请更换过载线路。',
 '拼接照片每层背面都有不同人的确认手印，柏叔从未替影像中的人偷偷决定。',
 '多重曝光的空位旁有一小段刺猬轮廓，说明遮罩不是相机故障，而是一次主动请求。',
 '最后一卷胶片盒里有你童年写的纸条：“请把我剪掉，但不要把那束光剪掉。”'
];

function defaultState(){return{
 saveVersion:VERSION,flowIndex:0,started:false,completedPuzzles:{},puzzleState:{},choices:{},stats:{honesty:0,boundary:0,connection:0},memoryStamps:[],hints:{},hintLog:[],journal:[],teaChoice:[],futureChoice:null,lastEnding:null,endings:[],settings:loadSettings(),supportShown:false,updatedAt:new Date().toISOString()
}}
function loadSettings(){try{return Object.assign({font:100,sound:true,master:.55,ambient:.45,sfx:.65,reducedMotion:false,highContrast:false,dragAssist:true},JSON.parse(localStorage.getItem(SETTINGS_KEY)||'{}'))}catch(e){return{font:100,sound:true,master:.55,ambient:.45,sfx:.65,reducedMotion:false,highContrast:false,dragAssist:true}}}

const Game={
 state:defaultState(),currentPuzzle:null,selectedPiece:null,dialogueQueue:[],
 init(){
  this.cache();this.bind();this.load();this.applySettings();this.updateCover();
 },
 cache(){
  const ids=['cover','game','start-btn','continue-btn','continue-note','settings-btn','cover-audio-btn','album-btn','about-btn','home-btn','journal-btn','support-btn','game-audio-btn','game-settings-btn','chapter-kicker','chapter-title','night-progress','save-indicator','guest-portrait','guest-name','guest-role','environment-note','memory-hotspot','objective-title','objective-desc','puzzle-root','hint-btn','check-btn','reset-puzzle-btn','chapter-percent','chapter-meter-fill','dialogue-panel','dialogue-portrait','dialogue-speaker','dialogue-text','dialogue-next','modal-root'];
  for(const id of ids)this[id.replace(/-/g,'_')]=document.getElementById(id);
 },
 bind(){
  this.start_btn.addEventListener('click',()=>this.startNewPrompt());
  this.continue_btn.addEventListener('click',()=>this.continueGame());
  this.settings_btn.addEventListener('click',()=>this.showSettings());
  this.game_settings_btn.addEventListener('click',()=>this.showSettings());
  this.cover_audio_btn.addEventListener('click',()=>this.toggleAudio());
  this.game_audio_btn.addEventListener('click',()=>this.toggleAudio());
  this.album_btn.addEventListener('click',()=>this.showJournal());
  this.about_btn.addEventListener('click',()=>this.showAbout());
  this.home_btn.addEventListener('click',()=>this.showCover());
  this.journal_btn.addEventListener('click',()=>this.showJournal());
  this.support_btn.addEventListener('click',()=>Paywall.show({force:true}));
  this.hint_btn.addEventListener('click',()=>this.showHints());
  this.check_btn.addEventListener('click',()=>this.primaryAction());
  this.reset_puzzle_btn.addEventListener('click',()=>this.resetCurrentPuzzle());
  this.dialogue_next.addEventListener('click',()=>this.primaryAction());
  this.memory_hotspot.addEventListener('click',()=>this.collectMemory());
  document.addEventListener('keydown',e=>this.handleKeys(e));
  window.addEventListener('beforeunload',()=>this.save(true));
 },
 handleKeys(e){
  if(e.key==='Escape'){const m=document.querySelector('.modal-backdrop');if(m){m.remove();return}}
  if(e.key===' '&&document.activeElement===document.body){e.preventDefault();this.primaryAction()}
 },
 load(){
  try{const raw=localStorage.getItem(SAVE_KEY);if(raw){const parsed=JSON.parse(raw);this.state=Object.assign(defaultState(),parsed,{settings:Object.assign(loadSettings(),parsed.settings||{})})}}
  catch(e){try{const b=JSON.parse(localStorage.getItem(BACKUP_KEY)||'null');if(b)this.state=Object.assign(defaultState(),b)}catch(_){this.state=defaultState()}}
 },
 save(silent=false){
  this.state.updatedAt=new Date().toISOString();
  try{const old=localStorage.getItem(SAVE_KEY);if(old)localStorage.setItem(BACKUP_KEY,old);localStorage.setItem(SAVE_KEY,JSON.stringify(this.state));localStorage.setItem(SETTINGS_KEY,JSON.stringify(this.state.settings));if(!silent){this.save_indicator.textContent='已保存';this.save_indicator.classList.add('pulse');setTimeout(()=>this.save_indicator.classList.remove('pulse'),300)}}catch(e){if(!silent)this.toast('浏览器存储不可用，当前进度可能无法保留。','error')}
 },
 updateCover(){
  const has=this.state.started;this.continue_btn.disabled=!has;this.continue_btn.textContent=this.state.lastEnding?'回看结局':'继续游戏';this.continue_note.textContent=has?`最近记录：${CHAPTERS[FLOW[Math.min(this.state.flowIndex,FLOW.length-1)].chapter].kicker} · ${new Date(this.state.updatedAt).toLocaleString('zh-CN')}`:'尚无胶片修复记录';this.cover_audio_btn.textContent=`音效：${this.state.settings.sound?'开':'关'}`;
 },
 startNewPrompt(){
  if(this.state.started){this.modal(`<h2>开始新的六卷修复？</h2><p>新游戏会覆盖当前修复进度，但设置与已收集结局卡会保留。</p><div class="ending-actions"><button data-cancel>取消</button><button data-confirm>确认开始</button></div>`,el=>{el.querySelector('[data-cancel]').onclick=()=>el.closest('.modal-backdrop').remove();el.querySelector('[data-confirm]').onclick=()=>{const endings=this.state.endings||[];const settings=this.state.settings;this.state=defaultState();this.state.endings=endings;this.state.settings=settings;this.enterGame();el.closest('.modal-backdrop').remove()}})}else{this.state=defaultState();this.enterGame()}
 },
 continueGame(){if(!this.state.started)return;this.enterGame();if(this.state.lastEnding){const d=this.endingData(this.state.lastEnding);setTimeout(()=>this.showEnding(this.state.lastEnding,d.title,d.text),120)}},
 enterGame(){this.state.started=true;this.cover.classList.add('is-hidden');this.game.classList.remove('is-hidden');this.applySettings();AudioSys.apply(this.state.settings);this.renderStage();this.save()},
 showCover(){this.save(true);this.game.classList.add('is-hidden');this.cover.classList.remove('is-hidden');this.updateCover()},
 current(){return FLOW[Math.min(this.state.flowIndex,FLOW.length-1)]},
 renderStage(){
  const stage=this.current();const ch=CHAPTERS[stage.chapter];const guest=GUESTS[stage.chapter]||GUESTS[0];
  this.chapter_kicker.textContent=ch.kicker;this.chapter_title.textContent=ch.title;this.night_progress.textContent=ch.night;this.environment_note.textContent=ch.env;
  this.guest_portrait.src=guest.portrait;this.guest_portrait.alt=guest.name;this.guest_name.textContent=guest.name;this.guest_role.textContent=guest.role;this.dialogue_portrait.src=guest.portrait;
  this.memory_hotspot.classList.toggle('collected',this.state.memoryStamps.includes(stage.chapter));this.memory_hotspot.style.display=(stage.chapter>=1&&stage.chapter<=6)?'flex':'none';
  this.objective_title.textContent=stage.title;this.objective_desc.textContent=stage.desc||'';this.currentPuzzle=null;this.puzzle_root.innerHTML='';this.check_btn.style.display='';this.reset_puzzle_btn.style.display='none';this.hint_btn.disabled=true;
  this.dialogue_speaker.textContent=stage.speaker||guest.name;this.dialogue_text.textContent=stage.text||this.dialogueFor(stage);this.dialogue_next.style.display='';
  if(stage.type==='puzzle'){this.currentPuzzle=stage.pid;this.hint_btn.disabled=false;this.reset_puzzle_btn.style.display='';this.check_btn.textContent='确认答案';this.dialogue_next.style.display='none';this.renderPuzzle(stage.pid)}
  else if(stage.type==='choice'){this.check_btn.style.display='none';this.dialogue_next.style.display='none';this.renderChoice(stage)}
  else if(stage.type==='tea'){this.check_btn.textContent='冲泡这壶茶';this.dialogue_next.style.display='none';this.renderTea()}
  else if(stage.type==='final'){this.check_btn.style.display='none';this.dialogue_next.style.display='none';this.renderFinal()}
  else{this.check_btn.textContent='继续';this.reset_puzzle_btn.style.display='none';this.renderStory(stage)}
  this.updateProgress();window.scrollTo({top:0,behavior:'smooth'});
 },
 dialogueFor(stage){return stage.type==='puzzle'?'慢慢来，所有答案都藏在眼前的物件里。':'暗房灯轻轻亮了一格。'},
 renderStory(stage){this.puzzle_root.innerHTML=`<div class="reveal-card"><h3>${stage.title}</h3><p>${stage.text}</p>${stage.chapter===4?'<blockquote>照片可以被修整，但修整过程也应该被看见。</blockquote>':''}</div>`},
 primaryAction(){const s=this.current();AudioSys.click();if(s.type==='puzzle')this.checkPuzzle(s.pid);else if(s.type==='story')this.advance();else if(s.type==='tea')this.checkTea()},
 advance(){if(this.state.flowIndex<FLOW.length-1){this.state.flowIndex++;this.save();this.renderStage()}},
 updateProgress(){
  const c=this.current().chapter;const idxs=FLOW.map((x,i)=>x.chapter===c?i:-1).filter(i=>i>=0);const local=idxs.indexOf(this.state.flowIndex);const pct=Math.round((Math.max(0,local)/(Math.max(1,idxs.length-1)))*100);this.chapter_percent.textContent=pct+'%';this.chapter_meter_fill.style.width=pct+'%';
  const warm=Math.min(1,(this.state.flowIndex+1)/FLOW.length);document.getElementById('scene-tint').style.background=`linear-gradient(180deg,rgba(57,74,87,${.22-.12*warm}),rgba(179,113,52,${.08+.16*warm}))`;
 },
 completePuzzle(pid,reveal){
  if(this.state.completedPuzzles[pid])return;this.state.completedPuzzles[pid]=true;this.state.stats.connection=Math.min(8,this.state.stats.connection+1);this.addJournal(PUZZLES[pid]?`谜题 ${pid.toUpperCase()}`:'谜题',reveal||'已完成',this.current().chapter);AudioSys.success();this.toast('影像已复原，真相又清楚了一层。','success');this.save();setTimeout(()=>this.advance(),650)
 },
 resetCurrentPuzzle(){if(!this.currentPuzzle)return;delete this.state.puzzleState[this.currentPuzzle];this.selectedPiece=null;this.save(true);this.renderPuzzle(this.currentPuzzle);AudioSys.paper()},
 getPS(pid,defaults){if(!this.state.puzzleState[pid])this.state.puzzleState[pid]=JSON.parse(JSON.stringify(defaults));return this.state.puzzleState[pid]},
 renderPuzzle(pid){
  const root=this.puzzle_root;root.innerHTML='';
  if(pid==='p01')this.renderP01(root);if(pid==='p02')this.renderP02(root);if(pid==='p03')this.renderP03(root);if(pid==='p04')this.renderP04(root);if(pid==='p05')this.renderP05(root);if(pid==='p06')this.renderP06(root);if(pid==='p07')this.renderP07(root);if(pid==='p08')this.renderP08(root);if(pid==='p09')this.renderP09(root);if(pid==='p10')this.renderP10(root);if(pid==='p11')this.renderP11(root);if(pid==='p12')this.renderP12(root);
 },
 renderP01(root){const ps=this.getPS('p01',{seq:[]});root.innerHTML=`<div class="puzzle-card focus-puzzle"><div class="focus-preview"><span class="focus-object far">远处路灯</span><span class="focus-object mid">柜台相机</span><span class="focus-object near">近处花瓶</span></div><p class="puzzle-caption">校准卡提示：从最远景开始，逐步把焦点拉回。</p><div class="sequence-row"><button class="sequence-btn" data-v="1">近景</button><button class="sequence-btn" data-v="2">中景</button><button class="sequence-btn" data-v="3">远景</button></div><div class="progress-dots">${[0,1,2].map(i=>`<i class="${ps.seq[i]?'done':''}"></i>`).join('')}</div></div>`;root.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{const exp=[3,2,1];const v=+b.dataset.v;if(v===exp[ps.seq.length]){ps.seq.push(v);AudioSys.click()}else{b.classList.add('wrong');setTimeout(()=>b.classList.remove('wrong'),350);AudioSys.error()}this.save(true);this.renderP01(root)})},
 renderP02(root){const ps=this.getPS('p02',{slots:[null,null,null,null],rot:{A:0,B:0,C:0,D:0}});const pieces=['A','B','C','D'];const placed=new Set(ps.slots.filter(Boolean));root.innerHTML=`<div class="puzzle-card"><p class="puzzle-caption">点击负片，再点击灯箱槽位；旋转按钮可改变底片方向。</p><div class="piece-bank">${pieces.filter(p=>!placed.has(p)).map(p=>`<div class="paper-piece film-piece ${this.selectedPiece===p?'selected':''}" data-piece="${p}" draggable="true"><div class="art" style="--rot:${ps.rot[p]}deg"></div><span class="mark">${p}</span><button data-rotate="${p}">↻</button></div>`).join('')||'<p>负片已全部放入灯箱。</p>'}</div><div class="slot-grid lightbox-grid">${ps.slots.map((p,i)=>`<div class="paper-slot film-slot" data-slot="${i}">${p?`<div class="art" style="--rot:${ps.rot[p]}deg"></div><span class="mark">${p}</span>`:`<span class="mark">灯箱 ${i+1}</span>`}</div>`).join('')}</div></div>`;
  root.querySelectorAll('[data-piece]').forEach(el=>{el.onclick=e=>{if(e.target.dataset.rotate)return;this.selectedPiece=el.dataset.piece;this.renderP02(root)};el.ondragstart=e=>{this.selectedPiece=el.dataset.piece;e.dataTransfer.setData('text/plain',el.dataset.piece)}});root.querySelectorAll('[data-rotate]').forEach(btn=>btn.onclick=e=>{e.stopPropagation();const p=btn.dataset.rotate;ps.rot[p]=(ps.rot[p]+90)%360;this.save(true);this.renderP02(root)});root.querySelectorAll('[data-slot]').forEach(el=>{el.ondragover=e=>e.preventDefault();el.ondrop=e=>{e.preventDefault();this.selectedPiece=e.dataTransfer.getData('text/plain')||this.selectedPiece;el.click()};el.onclick=()=>{const i=+el.dataset.slot;if(this.selectedPiece){const old=ps.slots.indexOf(this.selectedPiece);if(old>=0)ps.slots[old]=null;ps.slots[i]=this.selectedPiece;this.selectedPiece=null;AudioSys.paper()}else if(ps.slots[i]){this.selectedPiece=ps.slots[i];ps.slots[i]=null}this.save(true);this.renderP02(root)}})
 },
 renderP03(root){const ps=this.getPS('p03',{steps:[]});const names={v:'侧光检查',h:'放大纤维',o:'补边显字'};root.innerHTML=`<div class="puzzle-card edge-puzzle"><div class="edge-photo ${ps.steps.length>=1?'side-lit':''} ${ps.steps.length>=2?'magnified':''} ${ps.steps.length>=3?'restored':''}"><span>${ps.steps.length>=3?'旧渡口照相亭 · 1994.08':'被剪断的照片边缘'}</span></div><div class="fold-controls"><button class="fold-btn" data-step="v">侧光检查</button><button class="fold-btn" data-step="h">放大纤维</button><button class="fold-btn" data-step="o">补边显字</button></div><p class="puzzle-caption">已操作：${ps.steps.map(x=>names[x]).join(' → ')||'尚未处理'}</p></div>`;root.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{ps.steps.push(b.dataset.step);if(ps.steps.length>3)ps.steps.shift();AudioSys.paper();this.save(true);this.renderP03(root)})},
 renderP04(root){const ps=this.getPS('p04',{seq:[]});root.innerHTML=`<div class="puzzle-card"><div class="contact-strip"><i></i><i></i><i class="long"></i><i></i></div><p class="puzzle-caption">底片边缘的拖影代表快门间隔。输入四次节奏。</p><div class="rhythm-controls"><button class="rhythm-btn" data-r="S">短快门</button><button class="rhythm-btn" data-r="L">长快门</button></div><div class="rhythm-readout">${ps.seq.map(x=>x==='S'?'短':'长').join(' - ')||'等待输入快门节奏'}</div></div>`;root.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{if(ps.seq.length>=4)ps.seq=[];ps.seq.push(b.dataset.r);this.save(true);AudioSys.tone(b.dataset.r==='S'?700:430,b.dataset.r==='S'?.08:.2,'triangle',.06);this.renderP04(root)})},
 renderP05(root){const ps=this.getPS('p05',{low:35,speed:80,voice:35});const good=Math.abs(ps.low-70)<=5&&Math.abs(ps.speed-95)<=3&&Math.abs(ps.voice-60)<=5;root.innerHTML=`<div class="puzzle-card"><div class="exposure-preview ${good?'good':''}" style="--ex:${ps.low}%;--ct:${ps.speed}%;--sh:${ps.voice}%"></div>${[['low','曝光'],['speed','对比度'],['voice','阴影细节']].map(([k,l])=>`<div class="slider-row"><label>${l}</label><input type="range" min="0" max="100" value="${ps[k]}" data-slider="${k}"><output>${ps[k]}%</output></div>`).join('')}<p class="puzzle-caption">${good?'渡口灯点和水面反光已经恢复。':'画面仍然欠曝，灯点与岸线没有同时出现。'}</p></div>`;root.querySelectorAll('[data-slider]').forEach(i=>i.oninput=()=>{ps[i.dataset.slider]=+i.value;this.save(true);this.renderP05(root)})},
 renderP06(root){const ps=this.getPS('p06',{items:['record','repair','tea']});const labels={repair:'20:11 街区灯饰线路过载',tea:'20:14 旧投影机接入',record:'20:18 独立蓄电池启动'};root.innerHTML=`<div class="puzzle-card"><div class="timeline-list">${ps.items.map((id,i)=>`<div class="timeline-item"><span>${labels[id]}</span><button data-up="${i}" ${i===0?'disabled':''}>↑</button><button data-down="${i}" ${i===ps.items.length-1?'disabled':''}>↓</button></div>`).join('')}</div></div>`;root.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>{const i=+b.dataset.up;[ps.items[i-1],ps.items[i]]=[ps.items[i],ps.items[i-1]];this.save(true);this.renderP06(root)});root.querySelectorAll('[data-down]').forEach(b=>b.onclick=()=>{const i=+b.dataset.down;[ps.items[i+1],ps.items[i]]=[ps.items[i],ps.items[i+1]];this.save(true);this.renderP06(root)})},
 renderP07(root){const ps=this.getPS('p07',{selected:[]});const mats={jam:{n:'琥珀滤镜',i:'◉',v:[3,1,1]},honey:{n:'蓝灰滤镜',i:'◐',v:[2,3,0]},lemon:{n:'柔光片',i:'◎',v:[1,0,3]},sugar:{n:'高反差片',i:'▦',v:[4,0,0]},mint:{n:'雾化片',i:'◌',v:[0,1,4]}};const sum=[0,0,0];ps.selected.forEach(k=>mats[k].v.forEach((v,i)=>sum[i]+=v));const targets=[6,4,4];root.innerHTML=`<div class="puzzle-card"><div class="attribute-bars">${['亮度','穿透','柔化'].map((n,i)=>`<div class="attribute-bar"><span>${n}</span><i><b style="width:${Math.min(100,sum[i]/targets[i]*100)}%"></b></i><strong>${sum[i]}/${targets[i]}</strong></div>`).join('')}</div><div class="option-grid">${Object.entries(mats).map(([k,m])=>`<button class="ingredient-card ${ps.selected.includes(k)?'selected':''}" data-mat="${k}"><span>${m.i}</span><b>${m.n}</b><small>亮${m.v[0]} 穿${m.v[1]} 柔${m.v[2]}</small></button>`).join('')}</div></div>`;root.querySelectorAll('[data-mat]').forEach(b=>b.onclick=()=>{const k=b.dataset.mat;ps.selected=ps.selected.includes(k)?ps.selected.filter(x=>x!==k):[...ps.selected,k];this.save(true);AudioSys.click();this.renderP07(root)})},
 renderP08(root){const ps=this.getPS('p08',{assign:{knead:'none',bake:'none',box:'none',jam:'none',cool:'none',decorate:'none'}});const labels={knead:'镜头',bake:'反光镜',box:'窗框',jam:'街道反光牌',cool:'水面',decorate:'渡口'};const column=who=>Object.entries(ps.assign).filter(([,v])=>v===who).map(([k])=>`<div class="task-token assigned">${labels[k]}</div>`).join('')||'<div class="task-token">点击下方节点分配</div>';root.innerHTML=`<div class="puzzle-card"><div class="assignment-grid"><div class="assignment-column"><h4>上层光路</h4>${column('bro')}</div><div class="assignment-column"><h4>下层光路</h4>${column('sis')}</div></div><div class="option-grid" style="margin-top:10px">${Object.entries(labels).map(([k,l])=>`<button class="choice-chip" data-cycle="${k}">${l}：${ps.assign[k]==='bro'?'上层':ps.assign[k]==='sis'?'下层':'未分配'}</button>`).join('')}</div></div>`;root.querySelectorAll('[data-cycle]').forEach(b=>b.onclick=()=>{const k=b.dataset.cycle;ps.assign[k]=ps.assign[k]==='none'?'bro':ps.assign[k]==='bro'?'sis':'none';this.save(true);this.renderP08(root)})},
 renderP09(root){const ps=this.getPS('p09',{ans:{A:'',B:'',C:'',D:'',E:'',F:''}});const clues={A:'连续齿孔 / 同机颗粒',B:'柏叔遮罩编号 / 边缘笔痕',C:'渡口水滴 / 原始卷号',D:'拼接定位点 / 双层乳剂',E:'儿童相机齿孔 / 电源线倒影',F:'戏院卷号 / 原始曝光'};root.innerHTML=`<div class="puzzle-card"><div class="evidence-list">${Object.keys(clues).map(k=>`<div class="evidence-row"><div class="evidence-visual"><span class="film-reel"></span><span><b>影像层 ${k}</b><br><small>${clues[k]}</small></span></div><select data-ev="${k}"><option value="">请选择</option><option value="hand" ${ps.ans[k]==='hand'?'selected':''}>原始底片</option><option value="dict" ${ps.ans[k]==='dict'?'selected':''}>柏叔拼接层</option><option value="child" ${ps.ans[k]==='child'?'selected':''}>童年玩家胶片</option></select></div>`).join('')}</div></div>`;root.querySelectorAll('[data-ev]').forEach(s=>s.onchange=()=>{ps.ans[s.dataset.ev]=s.value;this.save(true)})},
 renderP10(root){const ps=this.getPS('p10',{x:0,opacity:35});const good=Math.abs(ps.x-18)<=3&&Math.abs(ps.opacity-55)<=5;root.innerHTML=`<div class="puzzle-card"><div class="photo-stage real-photo ${good?'good':''}"><div class="photo-layer photo-base"></div><div class="photo-layer photo-overlay" style="transform:translateX(${ps.x}px);opacity:${ps.opacity/100}"></div><div class="confirm-hand">确认手印</div></div><div class="photo-guides"><div class="slider-row"><label>水平位置</label><input type="range" min="-30" max="40" value="${ps.x}" data-photo="x"><output>${ps.x}</output></div><div class="slider-row"><label>透明度</label><input type="range" min="10" max="90" value="${ps.opacity}" data-photo="opacity"><output>${ps.opacity}%</output></div></div><p class="puzzle-caption">${good?'窗框、灯影和手印已经重合。':'先对齐窗框，再让灯影落到桌角。'}</p></div>`;root.querySelectorAll('[data-photo]').forEach(i=>i.oninput=()=>{ps[i.dataset.photo]=+i.value;this.save(true);this.renderP10(root)})},
 renderP11(root){const ps=this.getPS('p11',{seq:[]});const items=[['R','▣','窗框'],['O','◇','反光牌'],['L','≈','水面'],['N','⌂','渡口']];root.innerHTML=`<div class="puzzle-card"><div class="moon-coasters light-nodes">${items.map(([v,s,l])=>`<button class="coaster" data-moon="${v}" title="${l}"><span>${s}</span><small>${l}</small></button>`).join('')}</div><div class="light-path-line"></div><div class="rhythm-readout">${ps.seq.map(x=>({R:'窗框',O:'反光牌',L:'水面',N:'渡口'}[x])).join(' → ')||'开始连接投影光路'}</div></div>`;root.querySelectorAll('[data-moon]').forEach(b=>b.onclick=()=>{if(ps.seq.length>=4)ps.seq=[];ps.seq.push(b.dataset.moon);this.save(true);AudioSys.click();this.renderP11(root)})},
 renderP12(root){const ps=this.getPS('p12',{steps:[]});const names={wall:'显影',roof:'定影',pocket:'水洗'};root.innerHTML=`<div class="puzzle-card"><div class="develop-trays"><div class="tray ${ps.steps.includes('wall')?'active':''}">显影液</div><div class="tray ${ps.steps.includes('roof')?'active':''}">定影液</div><div class="tray ${ps.steps.includes('pocket')?'active':''}">清水</div></div><div class="final-print ${ps.steps.length>=3?'revealed':''}"><span>${ps.steps.length>=3?'童年的小栎站在投影光里':'未显影相纸'}</span></div><div class="fold-controls"><button class="fold-btn" data-f="wall">显影</button><button class="fold-btn" data-f="roof">定影</button><button class="fold-btn" data-f="pocket">水洗</button></div><p class="puzzle-caption">步骤：${ps.steps.map(x=>names[x]).join(' → ')||'尚未处理'}</p></div>`;root.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{ps.steps.push(b.dataset.f);if(ps.steps.length>3)ps.steps.shift();this.save(true);AudioSys.paper();this.renderP12(root)})},
 checkPuzzle(pid){
  const ps=this.state.puzzleState[pid]||{};let ok=false,reveal='';
  if(pid==='p01'){ok=JSON.stringify(ps.seq)===JSON.stringify([3,2,1]);reveal='远景、中景、近景依次清晰，咔嗒恢复了对焦。'}
  if(pid==='p02'){ok=JSON.stringify(ps.slots)===JSON.stringify(['A','B','C','D'])&&ps.rot?.D===90;reveal='家庭照的缺口重新出现白棠妹妹递来的面包袋。'}
  if(pid==='p03'){ok=JSON.stringify(ps.steps)===JSON.stringify(['v','h','o']);reveal='照片边缘显出“旧渡口照相亭 · 1994.08”。'}
  if(pid==='p04'){ok=JSON.stringify(ps.seq)===JSON.stringify(['S','S','L','S']);reveal='快门节奏打开接触印样夹层。'}
  if(pid==='p05'){ok=Math.abs(ps.low-70)<=5&&Math.abs(ps.speed-95)<=3&&Math.abs(ps.voice-60)<=5;reveal='欠曝区域恢复出照相馆楼顶投向渡口的光。'}
  if(pid==='p06'){ok=JSON.stringify(ps.items)===JSON.stringify(['repair','tea','record']);reveal='灯饰早已过载，投影机不是停电的根本原因。'}
  if(pid==='p07'){ok=['jam','honey','lemon'].every(x=>ps.selected?.includes(x))&&ps.selected?.length===3;reveal='三片滤镜让光束穿过雨幕而不过度刺眼。'}
  if(pid==='p08'){const a=ps.assign||{};ok=a.knead==='bro'&&a.bake==='bro'&&a.box==='bro'&&a.jam==='sis'&&a.cool==='sis'&&a.decorate==='sis';reveal='上下两层光路避开帷幕，并在渡口汇合。'}
  if(pid==='p09'){const a=ps.ans||{};ok=a.A==='hand'&&a.B==='dict'&&a.C==='hand'&&a.D==='dict'&&a.E==='child'&&a.F==='hand';reveal='三块原始底片、两层柏叔拼接和一块童年胶片被区分开。'}
  if(pid==='p10'){ok=Math.abs(ps.x-18)<=3&&Math.abs(ps.opacity-55)<=5;reveal='叠合层出现当事人确认手印，拼接经过本人同意。'}
  if(pid==='p11'){ok=JSON.stringify(ps.seq)===JSON.stringify(['R','O','L','N']);reveal='投影光穿过窗框与水面，最终抵达渡口。'}
  if(pid==='p12'){ok=JSON.stringify(ps.steps)===JSON.stringify(['wall','roof','pocket']);reveal='第六张相纸完整显影，童年的你重新回到照片。'}
  if(ok)this.completePuzzle(pid,reveal);else{AudioSys.error();this.toast('还差一点。可以重看照片细节，或向咔嗒获取逐级提示。','error')}
 },
 renderChoice(stage){this.puzzle_root.innerHTML=`<div class="chapter-choice-grid">${stage.options.map(o=>`<button class="chapter-choice" data-choice="${o.id}"><b>${o.label}</b><small>${o.detail}</small></button>`).join('')}</div><p class="puzzle-caption">两种选择都能继续故事，没有“错误选项”。后续照片说明与结局会记住你的处理方式。</p>`;this.puzzle_root.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>this.makeChoice(stage,b.dataset.choice))},
 makeChoice(stage,id){if(this.state.choices[stage.cid])return;const opt=stage.options.find(x=>x.id===id);this.state.choices[stage.cid]=id;this.state.stats[opt.stat]=Math.min(4,this.state.stats[opt.stat]+1);if(stage.cid!=='records')this.state.stats.connection=Math.min(8,this.state.stats.connection+1);this.addJournal(stage.title,opt.label+'：'+opt.detail,stage.chapter);this.save();AudioSys.bell();this.toast('选择已写进暗房记录。','success');if(stage.cid==='fox'&&!this.state.supportShown&&!Paywall.hasPaid()){this.state.supportShown=true;this.save(true);setTimeout(()=>Paywall.show(),450)}setTimeout(()=>this.advance(),500)},
 renderTea(){const ps=this.getPS('tea',{selected:[]});const mats=[['bread','白棠的面包袋','assets/ui/icon-bread.svg'],['lamp','阿潮的船灯','assets/ui/icon-lamp.svg'],['ticket','戏院旧票根','assets/ui/icon-ticket.svg'],['chalk','青芒的粉笔','assets/ui/icon-chalk.svg'],['clip','柏叔显影夹','assets/ui/icon-clip.svg'],['coil','童年线圈','assets/ui/icon-coil.svg']];this.puzzle_root.innerHTML=`<div class="puzzle-card"><div class="tea-materials composition-items">${mats.map(([k,n,i])=>`<button class="tea-card ${ps.selected.includes(k)?'selected':''}" data-tea="${k}"><img src="${i}" alt=""><b>${n}</b></button>`).join('')}</div><p class="puzzle-caption">已选择 ${ps.selected.length}/3。任何三件都成立，它们只改变最终照片的细节与独白。</p></div>`;this.puzzle_root.querySelectorAll('[data-tea]').forEach(b=>b.onclick=()=>{const k=b.dataset.tea;if(ps.selected.includes(k))ps.selected=ps.selected.filter(x=>x!==k);else if(ps.selected.length<3)ps.selected.push(k);else this.toast('最终构图先放入三件物品。','error');this.save(true);AudioSys.click();this.renderTea()})},
 checkTea(){const ps=this.state.puzzleState.tea;if(!ps||ps.selected.length!==3){this.toast('请选择三件物品完成构图。','error');return}this.state.teaChoice=[...ps.selected];this.addJournal('第六张照片的构图','你选择放入：'+ps.selected.join(' + '),6);this.save();AudioSys.success();this.advance()},
 renderFinal(){const opts=[['keep','继续经营照相馆','改成预约制修复室，保留原片与修复过程。'],['archive','开放社区影像档案','让每位当事人决定自己的照片如何被观看。'],['mobile','移动暗房','关闭旧店，把修复工具带去不同城镇。'],['leave','归还钥匙','把原片归还当事人，诚实地离开故乡。']];this.puzzle_root.innerHTML=`<div class="chapter-choice-grid">${opts.map(([k,n,d])=>`<button class="chapter-choice" data-future="${k}"><b>${n}</b><small>${d}</small></button>`).join('')}</div><p class="puzzle-caption">结局会引用前四次选择、连接值与胶片标记，但不会把任何方向贬低为失败。</p>`;this.puzzle_root.querySelectorAll('[data-future]').forEach(b=>b.onclick=()=>this.finishGame(b.dataset.future))},
 finishGame(choice){this.state.futureChoice=choice;let code=choice==='keep'&&this.state.stats.connection>=5?'A':choice==='archive'?'B':choice==='mobile'?'C':'D';const d=this.endingData(code);this.state.lastEnding=code;if(!this.state.endings.includes(code))this.state.endings.push(code);this.save();this.updateCover();this.showEnding(code,d.title,d.text)},
 endingData(code){const titles={A:'暮光仍在',B:'把暗房借给大家',C:'移动的光',D:'最后一次显影'};const texts={A:'一年后，照相馆改成每周三天的预约制修复室。白棠把完整照与裁切版并排保存，阿潮开始带年轻船员看旧底片，杏禾在展览中标注了线路真相。你留下，但不再把留下等同于牺牲。',B:'旧暗房成为社区影像档案室。照片有“仅本人可看、家人共享、公开展览”三种标签。柏叔回来时只是普通志愿者，任何人都不再替别人独占解释权。',C:'旧店关闭后，你把咔嗒和便携灯箱装进小车。修复过的照片在不同城镇重新找到主人，原址只剩一面公共照片墙和傍晚准时亮起的灯。',D:'你将原片全部归还，把钥匙交回镇档案馆。柏叔的回信写着：“你愿意回来把照片看完，就已经不是逃走。”离开没有被拍成阴影，只是一条清楚的新路。'};return{title:titles[code]||titles.D,text:texts[code]||texts.D}},
 showEnding(code,title,text){const secret=this.state.memoryStamps.length===6;const choiceSummary=`坦诚 ${this.state.stats.honesty} · 边界 ${this.state.stats.boundary} · 连接 ${this.state.stats.connection}`;this.modal(`<h2>${code} · ${title}</h2><img class="ending-art" src="assets/endings/ending-${code}.svg" alt="${title}结局插画"><p>${text}</p><blockquote>六卷记录：${choiceSummary}</blockquote>${secret?'<div class="reveal-card"><h3>S · 第六张合影</h3><p>多年后，你主动站进一张新的合影，并在背面写下：“这一次，我没有要求把自己剪掉。”画面中的职业与地点会随常规结局变化，但每个人都在过自己的生活。</p><img class="ending-art" src="assets/endings/ending-S.svg" alt="第六张合影隐藏尾声插画"></div>':''}<div class="ending-actions"><button data-review>查看暗房笔记</button><button data-cover>返回封面</button><button data-replay>从第五卷重玩</button></div>`,el=>{if(secret&&!this.state.endings.includes('S')){this.state.endings.push('S');this.save(true)}el.querySelector('[data-review]').onclick=()=>this.showJournal();el.querySelector('[data-cover]').onclick=()=>{el.closest('.modal-backdrop').remove();this.showCover()};el.querySelector('[data-replay]').onclick=()=>{const idx=FLOW.findIndex(x=>x.chapter===5);this.state.flowIndex=idx;this.state.futureChoice=null;el.closest('.modal-backdrop').remove();this.save();this.renderStage()}})},
 showHints(){if(!this.currentPuzzle)return;const pid=this.currentPuzzle;const max=this.state.hints[pid]||0;const h=PUZZLES[pid].hints;const progress=this.hintProgress(pid);this.modal(`<h2>咔嗒的提示簿 · ${pid.toUpperCase()}</h2><p>提示会根据当前进度记录，可随时回看；第三级给出完整答案，不影响结局或成就。</p><div class="reveal-card"><b>当前进度</b><p>${progress}</p></div><div class="hint-levels">${h.map((t,i)=>`<div class="hint-level ${i>max?'locked':''}" data-level="${i+1}"><h4>${['第一级：观察方向','第二级：关联思路','第三级：完整答案'][i]}</h4><p>${i<max?t:'点击后显示'}</p><button ${i>max?'disabled':''}>${i<max?'已查看':'查看提示'}</button></div>`).join('')}</div>${max>=3?'<div class="ending-actions"><button data-assist>按完整答案辅助完成</button></div>':''}`,el=>{el.querySelectorAll('[data-level]').forEach(box=>{const lvl=+box.dataset.level;const btn=box.querySelector('button');btn.onclick=()=>{const cur=this.state.hints[pid]||0;if(lvl>cur+1)return;this.state.hints[pid]=Math.max(cur,lvl);this.state.hintLog.push({pid,level:lvl,text:h[lvl-1],chapter:this.current().chapter,time:Date.now()});this.save(true);el.closest('.modal-backdrop').remove();this.showHints()}});const a=el.querySelector('[data-assist]');if(a)a.onclick=()=>{this.assistPuzzle(pid);el.closest('.modal-backdrop').remove()}})},
 hintProgress(pid){const p=this.state.puzzleState[pid]||{};if(pid==='p01')return `已按对 ${p.seq?.length||0}/3 个焦点。`;if(pid==='p02')return `已放入 ${(p.slots||[]).filter(Boolean).length}/4 段负片，当前选中 ${this.selectedPiece||'无'}。`;if(pid==='p03'||pid==='p12')return `已执行 ${(p.steps||[]).length}/3 个折叠步骤。`;if(pid==='p04'||pid==='p11')return `已输入 ${(p.seq||[]).length}/4 个快门或光路节点。`;if(pid==='p05')return `当前刻度：${p.low??0} / ${p.speed??0} / ${p.voice??0}。`;if(pid==='p06')return `当前顺序：${(p.items||[]).join(' → ')||'未排列'}。`;if(pid==='p07')return `已选择 ${(p.selected||[]).length} 种材料。`;if(pid==='p08')return `已分配 ${Object.values(p.assign||{}).filter(x=>x!=='none').length}/6 个步骤。`;if(pid==='p09')return `已判断 ${Object.values(p.ans||{}).filter(Boolean).length}/6 封信。`;if(pid==='p10')return `当前位置 ${p.x??0}，透明度 ${p.opacity??0}%。`;return '尚未进行有效操作。'},
  assistPuzzle(pid){const answers={p01:{seq:[3,2,1]},p02:{slots:['A','B','C','D'],rot:{A:0,B:0,C:0,D:90}},p03:{steps:['v','h','o']},p04:{seq:['S','S','L','S']},p05:{low:70,speed:95,voice:60},p06:{items:['repair','tea','record']},p07:{selected:['jam','honey','lemon']},p08:{assign:{knead:'bro',bake:'bro',box:'bro',jam:'sis',cool:'sis',decorate:'sis'}},p09:{ans:{A:'hand',B:'dict',C:'hand',D:'dict',E:'child',F:'hand'}},p10:{x:18,opacity:55},p11:{seq:['R','O','L','N']},p12:{steps:['wall','roof','pocket']}};this.state.puzzleState[pid]=JSON.parse(JSON.stringify(answers[pid]));this.save(true);this.renderPuzzle(pid);this.toast('咔嗒已把完整步骤放到正确位置，请点击“确认答案”。','success')},
 collectMemory(){const c=this.current().chapter;if(c<1||c>6||this.state.memoryStamps.includes(c)){this.toast((c<1||c>6)?'这里没有遗漏的胶片标记。':'这一枚胶片标记已经收好了。','success');return}this.state.memoryStamps.push(c);this.state.stats.connection=Math.min(8,this.state.stats.connection+1);this.addJournal(`胶片标记 ${c}`,MEMORY_TEXT[c-1],c);this.save();AudioSys.bell();this.memory_hotspot.classList.add('collected');this.modal(`<h2>获得胶片标记 ${this.state.memoryStamps.length}/6</h2><img class="gallery" src="assets/ui/story-still.svg" alt="暗房胶片与相机静物插画"><p>${MEMORY_TEXT[c-1]}</p><p class="credits">集齐六枚胶片标记可在任意常规结局后追加隐藏尾声，不影响常规结局好坏。</p>`)},
 addJournal(title,text,chapter){this.state.journal.push({title,text,chapter,time:Date.now()})},
 showJournal(){const entries=this.state.journal.length?this.state.journal.map(e=>`<article class="journal-entry"><h4>${e.title}</h4><p>${e.text}</p><small>${CHAPTERS[e.chapter]?.kicker||''}</small></article>`).join(''):'<p>还没有记录。每完成谜题、作出选择或发现胶片标记，内容都会保存在这里。</p>';const hints=this.state.hintLog.length?this.state.hintLog.map(e=>`<article class="journal-entry"><h4>${e.pid.toUpperCase()} · 提示 ${e.level}</h4><p>${e.text}</p></article>`).join(''):'<p>还没有使用提示。</p>';this.modal(`<h2>回看簿</h2><div class="journal-tabs"><button data-tab="story">照片与线索</button><button data-tab="hints">咔嗒提示</button><button data-tab="stats">选择与结局</button></div><div id="journal-view" class="hint-log">${entries}</div>`,el=>{const view=el.querySelector('#journal-view');el.querySelector('[data-tab="story"]').onclick=()=>view.innerHTML=entries;el.querySelector('[data-tab="hints"]').onclick=()=>view.innerHTML=hints;el.querySelector('[data-tab="stats"]').onclick=()=>view.innerHTML=`<div class="reveal-card"><h3>你的处理方式</h3><p>坦诚 ${this.state.stats.honesty} · 边界 ${this.state.stats.boundary} · 连接 ${this.state.stats.connection}</p><p>胶片标记 ${this.state.memoryStamps.length}/6</p><p>结局卡：${this.state.endings.join('、')||'尚未获得'}</p></div>`})},
 showSettings(){const s=this.state.settings;this.modal(`<h2>设置</h2><div class="setting-row"><label>文字大小</label><select data-set="font"><option value="100" ${s.font==100?'selected':''}>100%</option><option value="115" ${s.font==115?'selected':''}>115%</option><option value="130" ${s.font==130?'selected':''}>130%</option></select></div><div class="setting-row"><label>总音量</label><input data-set="master" type="range" min="0" max="1" step=".05" value="${s.master}"></div><div class="setting-row"><label>环境音</label><input data-set="ambient" type="range" min="0" max="1" step=".05" value="${s.ambient}"></div><div class="setting-row"><label>交互音</label><input data-set="sfx" type="range" min="0" max="1" step=".05" value="${s.sfx}"></div><div class="setting-row"><label>功能开关</label><div><label class="toggle"><input data-set="sound" type="checkbox" ${s.sound?'checked':''}> 音效</label><label class="toggle"><input data-set="reducedMotion" type="checkbox" ${s.reducedMotion?'checked':''}> 减少动画</label><label class="toggle"><input data-set="highContrast" type="checkbox" ${s.highContrast?'checked':''}> 高对比</label><label class="toggle"><input data-set="dragAssist" type="checkbox" ${s.dragAssist?'checked':''}> 拖拽辅助</label></div></div><div class="ending-actions"><button data-export>导出存档</button><button data-import>导入存档</button><button data-clear>清除进度</button></div><input type="file" accept="application/json" data-file hidden>`,el=>{el.querySelectorAll('[data-set]').forEach(i=>{i.oninput=()=>{const k=i.dataset.set;s[k]=i.type==='checkbox'?i.checked:(i.type==='range'?+i.value:+i.value);this.applySettings();this.save(true)}});el.querySelector('[data-export]').onclick=()=>this.exportSave();const file=el.querySelector('[data-file]');el.querySelector('[data-import]').onclick=()=>file.click();file.onchange=()=>this.importSave(file.files[0],el);el.querySelector('[data-clear]').onclick=()=>{if(confirm('确定清除当前游戏进度？设置与结局卡也会清除。')){localStorage.removeItem(SAVE_KEY);localStorage.removeItem(BACKUP_KEY);this.state=defaultState();this.applySettings();el.closest('.modal-backdrop').remove();this.showCover();this.toast('进度已清除。','success')}}})},
 applySettings(){const s=this.state.settings;document.documentElement.style.setProperty('--font-scale',s.font/100);document.body.classList.toggle('reduced-motion',!!s.reducedMotion);document.body.classList.toggle('high-contrast',!!s.highContrast);document.body.classList.toggle('drag-assist',!!s.dragAssist);AudioSys.apply(s);if(this.cover_audio_btn)this.cover_audio_btn.textContent=`音效：${s.sound?'开':'关'}`},
 toggleAudio(){this.state.settings.sound=!this.state.settings.sound;this.applySettings();this.save(true);this.updateCover();this.toast(`音效已${this.state.settings.sound?'开启':'关闭'}`,'success')},
 exportSave(){const blob=new Blob([JSON.stringify(this.state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='暮光照相馆_存档.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)},
 importSave(file,el){if(!file)return;const r=new FileReader();r.onload=()=>{try{const data=JSON.parse(r.result);if(!data.saveVersion)throw new Error('invalid');this.state=Object.assign(defaultState(),data);this.applySettings();this.save();el.closest('.modal-backdrop').remove();this.updateCover();if(!this.game.classList.contains('is-hidden'))this.renderStage();this.toast('存档已导入。','success')}catch(e){this.toast('存档文件无法识别。','error')}};r.readAsText(file)},
 showAbout(){this.modal(`<h2>关于《暮光照相馆：未显影的第六张》</h2><img class="gallery" src="assets/concept-cover.webp" alt="暮光照相馆概念图"><p>一款温馨治愈的网页照片修复叙事解谜游戏。你将在六卷旧胶片中恢复被裁切的人、暴雨中的投影光、被拼接的镇史合影，以及童年主动要求消失的自己。</p><ul><li>主线约 50-60 分钟，全收集约 65-75 分钟。</li><li>12 个不同呈现形式的谜题，均支持三级动态提示与辅助完成。</li><li>四个常规结局与一个隐藏尾声；使用提示不会影响结局。</li><li>自愿 1 元支持不锁内容，存档仅保存在当前浏览器。</li></ul><p class="credits">操作：鼠标/触屏；空格推进；Esc 关闭弹窗；拖拽谜题均提供点击替代。</p>`)},
 modal(html,onReady){const tpl=document.getElementById('modal-template');const node=tpl.content.firstElementChild.cloneNode(true);node.querySelector('.modal-content').innerHTML=html;node.querySelector('.modal-close').onclick=()=>node.remove();node.addEventListener('click',e=>{if(e.target===node)node.remove()});this.modal_root.appendChild(node);onReady?.(node.querySelector('.modal-content'));setTimeout(()=>node.querySelector('.modal-close').focus(),20);return node},
 toast(text,type='success'){const t=document.createElement('div');t.className='paywall-toast';t.style.background=type==='error'?'#a85f55':'#6f8866';t.textContent=text;document.getElementById('toast-root').appendChild(t);setTimeout(()=>t.classList.add('show'),20);setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),350)},2600)}
};

window.Game=Game;
window.addEventListener('DOMContentLoaded',()=>Game.init());
})();
