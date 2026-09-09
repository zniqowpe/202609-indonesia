(function(){
  var rail=document.querySelector('.desktop-chapter-rail');
  var handbookDestination=document.body.dataset.handbookDestinationShort||document.body.dataset.handbookDestination||'TRAVEL';
  var handbookYear=document.body.dataset.handbookYear||new Date().getFullYear();
  var chapters=[['route','行程'],['sights','景點指南'],['shops','購物'],['move','當地特色體驗'],['food','餐飲指南'],['booking','出發前準備'],['words','語言隨行錦囊'],['tips','旅遊貼士']];
  var chapterMeta=[
    ['每日行程','住宿、路線、時間與停留'],
    ['景點指南','已安排與可選'],
    ['購物','店鋪、集市與伴手禮'],
    ['當地特色體驗','課程、SPA 與在地體驗'],
    ['餐飲指南','專程 · 近鄰 · 外賣'],
    ['出發前準備','預約、確認與行李清單'],
    ['語言隨行錦囊','高頻詞與現場表達'],
    ['在地旅行貼士','健康、安全與文化']
  ];
  function syncChapterNavigation(){
    var contents=document.querySelector('.contents-grid');
    if(contents){contents.innerHTML=chapters.map(function(c,i){return '<a href="#'+c[0]+'"><span>0'+(i+1)+'</span><b>'+chapterMeta[i][0]+'</b><em>'+chapterMeta[i][1]+'</em></a>'}).join('')}
    var mobile=document.querySelector('.mobile-menu-grid');
    if(mobile){mobile.innerHTML=chapters.map(function(c,i){return '<a href="#'+c[0]+'" tabindex="-1"><b>0'+(i+1)+'</b><span>'+c[1]+'</span><i>↗</i></a>'}).join('')}
  }
  syncChapterNavigation();
  var mobilePanel=document.querySelector('.mobile-menu-panel'),mobileTrigger=document.querySelector('.mobile-nav-trigger'),mobileBackdrop=document.querySelector('.mobile-menu-backdrop');
  if(mobilePanel){mobilePanel.addEventListener('click',function(event){if(!event.target.closest('a[href^="#"]'))return;mobilePanel.classList.remove('is-open');mobilePanel.setAttribute('aria-hidden','true');if(mobileTrigger){mobileTrigger.classList.remove('is-open');mobileTrigger.setAttribute('aria-expanded','false');var icon=mobileTrigger.querySelector('i');if(icon)icon.textContent='＋'}if(mobileBackdrop)mobileBackdrop.classList.remove('is-open')})}
  if(!rail){
    rail=document.createElement('aside');rail.className='desktop-chapter-rail';rail.setAttribute('data-guide-nav','desktop');
    rail.innerHTML='<a class="desktop-chapter-rail__brand" href="#top"><small>'+handbookYear+' · TRAVEL GUIDE</small><strong>'+handbookDestination+'</strong></a><nav>'+chapters.map(function(c,i){return '<a href="#'+c[0]+'"><b>0'+(i+1)+'</b><span>'+c[1]+'</span></a>'}).join('')+'</nav><a class="desktop-chapter-rail__foot" href="#contents">CONTENTS · 回到目錄</a>';
    document.body.insertBefore(rail,document.body.firstChild);
  }
  var links=[].slice.call(rail.querySelectorAll('nav a'));
  var sections=links.map(function(link){return document.querySelector(link.getAttribute('href'))}).filter(Boolean);
  function setActive(id){links.forEach(function(link){link.classList.toggle('is-active',link.getAttribute('href')==='#'+id)})}
  if('IntersectionObserver' in window){
    var observer=new IntersectionObserver(function(entries){
      var visible=entries.filter(function(entry){return entry.isIntersecting}).sort(function(a,b){return b.intersectionRatio-a.intersectionRatio});
      if(visible[0])setActive(visible[0].target.id);
    },{rootMargin:'-18% 0px -62% 0px',threshold:[0,.08,.2]});
    sections.forEach(function(section){observer.observe(section)});
  }
  links.forEach(function(link){link.addEventListener('click',function(){setActive(link.getAttribute('href').slice(1))})});
})();
