(function(){'use strict';
function key(){var d=document.body&&document.body.dataset?document.body.dataset.handbookDestination||'guide':'guide';return'travel-handbook-theme:'+String(d).toLowerCase()}
var themes=[
  {id:'rainforest',name:'雨林綠',note:'自然與熱帶',swatch:'#176a5c'},
  {id:'coast',name:'海岸藍',note:'海島與濱海',swatch:'#155c70'},
  {id:'terracotta',name:'暖陶土',note:'古城與南歐',swatch:'#8a4937'},
  {id:'ink',name:'墨色',note:'日本與都市',swatch:'#34414c'},
  {id:'burgundy',name:'勃艮第',note:'酒紅與古典',swatch:'#7b3042'},
  {id:'midnight',name:'午夜紫',note:'夜色與精品',swatch:'#4f466f'}
];
function stored(){try{return localStorage.getItem(key())}catch(_){return null}}
function apply(id){if(!themes.some(function(t){return t.id===id}))id='rainforest';document.body.dataset.handbookTheme=id;try{localStorage.setItem(key(),id)}catch(_){}document.querySelectorAll('.handbook-theme-option').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.theme===id))})}
function init(){var launch=document.createElement('button');launch.className='handbook-theme-launch';launch.type='button';launch.setAttribute('aria-label','選擇手冊配色');launch.innerHTML='<span aria-hidden="true"></span>';var panel=document.createElement('section');panel.className='handbook-theme-panel';panel.hidden=true;panel.setAttribute('aria-label','手冊配色');panel.innerHTML='<header><strong>選擇手冊配色</strong><button type="button" aria-label="關閉">×</button></header><div class="handbook-theme-options">'+themes.map(function(t){return'<button class="handbook-theme-option" type="button" data-theme="'+t.id+'" style="--swatch:'+t.swatch+'"><i></i><b>'+t.name+'</b><small>'+t.note+'</small></button>'}).join('')+'</div>';document.body.appendChild(panel);document.body.appendChild(launch);function close(){panel.hidden=true;launch.setAttribute('aria-expanded','false')}launch.onclick=function(){panel.hidden=!panel.hidden;launch.setAttribute('aria-expanded',String(!panel.hidden))};panel.querySelector('header button').onclick=close;panel.querySelectorAll('[data-theme]').forEach(function(b){b.onclick=function(){apply(b.dataset.theme);close()}});document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});apply(stored()||document.body.dataset.handbookDefaultTheme||'rainforest')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
