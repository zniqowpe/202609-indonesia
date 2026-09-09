(function () {
  "use strict";

  function installStayDisclosure() {
    var stay = document.querySelector(".stay-section");
    if (!stay || document.querySelector(".hotel-chapter-fold")) return;
    var pending = Boolean(stay.querySelector(".stay-pending"));
    var fold = document.createElement("details");
    fold.className = "hotel-chapter-fold";
    fold.innerHTML = '<summary><span><small>STAY · 行程前先看住宿</small><b>' +
      (pending ? "住宿待確認" : "住宿與出行位置") + "</b><em>" +
      (pending ? "確認酒店後補齊地址、交通與物業圖片" : "展開檢視圖片、地址和附近交通") +
      '</em></span><i>＋</i></summary>';
    stay.parentNode.insertBefore(fold, stay);
    fold.appendChild(stay);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installStayDisclosure);
  } else {
    installStayDisclosure();
  }
})();
