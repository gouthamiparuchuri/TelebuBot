// var url = "http://localhost:4300/";
var url = "http://13.126.229.27:4200/"
var _args = {};
var TelebuBot = TelebuBot || (function () {

  return {
    load: function (Args) {
      if (Args) {
        _args = Args;
        if (_args.length > 0) {
          var g = document.createElement("link")
          g.setAttribute("rel", "stylesheet")
          g.setAttribute("type", "text/css")
          g.setAttribute("href", url + 'assets/css/bot.css');
          document.getElementsByTagName("head")[0].appendChild(g);


          // var aid = _args[0];
          // var a = document.referrer;
          // var host = window.location.hostname;
          // if ((localStorage.getItem("h") != null) && (localStorage.getItem("h") != "")) { a = ""; }
          // else if ((localStorage.getItem("AEname") != null) && (localStorage.getItem("AEname") != "")) { a = ""; }
          var e = url + "story/" + _args[0];
          var chatContent = '<div id="TelebuPOP_frame"><iframe src="' + e + '" id="pop_frame" name="pop_frame" width="100%" height="100%" border="0"></iframe></div>';
          // chatContent = chatContent + '<div id="TelebuChat-icon" class="iconBlock"><div id="telebu-pop-notify" class="notification animated fadeInRight"><table class="message" style="height:100%;"><tr><td id="telebu-welcomemsg"></td></tr></table></div>   <div class="chatIcon" ><div class="iconDots animated zoomIn"><span>...</span></div><div class="iconCount animated zoomIn" style="display:none">2</div><div class="iconClose animated rotateIn" style="display:none"><img src="' + url + '/assets/images/close-blue.png" alt="close-blue" /></div></div></div>';
          var f = document.createElement("div");
          // f.className = "mainSection"; 
          f.innerHTML = chatContent;
          document.body.appendChild(f);

          // window.frames['pop_frame'].postMessage('open', '*');

          // var aid = _args[0];
          // var a = document.referrer;
          // var host = window.location.hostname;
          // if ((localStorage.getItem("h") != null) && (localStorage.getItem("h") != "")) { a = ""; }
          // else if ((localStorage.getItem("AEname") != null) && (localStorage.getItem("AEname") != "")) { a = ""; }
          // var e = url + _args[0] + "/chat?domain=" + host + "&referrer=" + a;
          // var chatContent = '<div id="TelebuPOP_frame" class="frameBlock animated fadeInRight" style="display:none;"><iframe src="' + e + '" id="pop_frame" name="pop_frame" class="pop_frame" width="100%" height="100%" border="0"></iframe></div>';
          // chatContent = chatContent + '<div id="TelebuChat-icon" class="iconBlock"><div id="telebu-pop-notify" class="notification animated fadeInRight"><table class="message" style="height:100%;"><tr><td id="telebu-welcomemsg"></td></tr></table></div>   <div class="chatIcon" ><div class="iconDots animated zoomIn"><span>...</span></div><div class="iconCount animated zoomIn" style="display:none">2</div><div class="iconClose animated rotateIn" style="display:none"><img src="' + url + '/assets/images/close-blue.png" alt="close-blue" /></div></div></div>';
          // var f = document.createElement("div");
          // f.className = "mainSection"; f.innerHTML = chatContent;
          // document.body.appendChild(f);
          // document.getElementById("TelebuChat-icon").addEventListener("click", function () {
           
          //   var x = document.getElementById("TelebuPOP_frame");
          //   if (x.style.display === "none") {
          //     x.style.display = "block";
          //     document.getElementById("TelebuChat-icon").getElementsByClassName("iconDots")[0].style.display = "none";
          //     document.getElementById("TelebuChat-icon").getElementsByClassName("iconClose")[0].style.display = "block";
          //     document.getElementById('telebu-pop-notify').classList.add('fadeOutRight');
          //     window.frames['pop_frame'].postMessage('open', '*');
          //   } else {
          //     x.style.display = "none";
          //     document.getElementById("TelebuChat-icon").getElementsByClassName("iconDots")[0].style.display = "block";
          //     document.getElementById("TelebuChat-icon").getElementsByClassName("iconClose")[0].style.display = "none";
          //     document.getElementById('telebu-pop-notify').classList.remove('fadeOutRight');
          //     window.frames['pop_frame'].postMessage('close', '*');
          //   }

          // });
          // window.addEventListener("message", receiveMessage, false);
        }
        else { console.log("Bot Id is missing"); }

      }
      else { console.log("Bot Id is missing"); }
    }

  };
}());

function receiveMessage(event) {
  if (event.data["type"] == "load") {
    document.getElementById('telebu-welcomemsg').innerHTML = event.data["msg"];
    if(event.data["cnt"] >0){ 
      document.getElementById('iconCount').innerHTML=event.data["cnt"]; 
      document.getElementById("TelebuPOP_frame").style.display = "block"; }
    else{     
      document.getElementById("TelebuPOP_frame").style.display = "none"; 
    }   
  }
  else if (event.data["type"] == "close") {
    document.getElementById("TelebuPOP_frame").style.display = "none";
    document.getElementById("TelebuChat-icon").getElementsByClassName("iconDots")[0].style.display = "block";
    document.getElementById("TelebuChat-icon").getElementsByClassName("iconClose")[0].style.display = "none";
    document.getElementById('telebu-pop-notify').classList.remove('fadeOutRight');
    if(event.data["cnt"] >0){ 
      document.getElementById('iconCount').innerHTML=event.data["cnt"]; 
      document.getElementById("TelebuPOP_frame").style.display = "block"; }
    else{     
      document.getElementById("TelebuPOP_frame").style.display = "none"; 
    } 
  }

}
