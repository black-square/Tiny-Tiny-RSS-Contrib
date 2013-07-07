(function(){var _1=20;var _2=0;var _3=null;var _4=null;var _5=0;var _6=location.hash;var _7="#_";var _8=[];var _9=0;var _a;var _b=false;var _c="portrait";var _d="landscape";window.iui={animOn:false,showPage:function(_e,_f){if(_e){if(_4){_4.removeAttribute("selected");_4=null;}if(hasClass(_e,"dialog")){showDialog(_e);}else{var _10=_3;_3=_e;if(_10){setTimeout(slidePages,0,_10,_e,_f);}else{updatePage(_e,_10);}}}},showPageById:function(_11){var _12=$(_11);if(_12){var _13=_8.indexOf(_11);var _14=_13!=-1;if(_14){_8.splice(_13,_8.length);}iui.showPage(_12,_14);}},showPageByHref:function(_15,_16,_17,_18,cb){var req=new XMLHttpRequest();req.onerror=function(){if(cb){cb(false);}};req.onreadystatechange=function(){if(req.readyState==4){if(_18){replaceElementWithSource(_18,req.responseText);}else{var _1b=document.createElement("div");_1b.innerHTML=req.responseText;iui.insertPages(_1b.childNodes);}if(cb){setTimeout(cb,1000,true);}}};if(_16){req.open(_17||"GET",_15,true);req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");req.setRequestHeader("Content-Length",_16.length);req.send(_16.join("&"));}else{req.open(_17||"GET",_15,true);req.send(null);}},insertPages:function(_1c){var _1d;for(var i=0;i<_1c.length;++i){var _1f=_1c[i];if(_1f.nodeType==1){if(!_1f.id){_1f.id="__"+(++_9)+"__";}var _20=$(_1f.id);if(_20){_20.parentNode.replaceChild(_1f,_20);}else{document.body.appendChild(_1f);}if(_1f.getAttribute("selected")=="true"||!_1d){_1d=_1f;}--i;}}if(_1d){iui.showPage(_1d);}},getSelectedPage:function(){for(var _21=document.body.firstChild;_21;_21=_21.nextSibling){if(_21.nodeType==1&&_21.getAttribute("selected")=="true"){return _21;}}},isNativeUrl:function(_22){for(var i=0;i<iui.nativeUrlPatterns.length;i++){if(_22.match(iui.nativeUrlPatterns[i])){return true;}}return false;},nativeUrlPatterns:[new RegExp("^http://maps.google.com/maps?"),new RegExp("^mailto:"),new RegExp("^tel:"),new RegExp("^http://www.youtube.com/watch\\?v="),new RegExp("^http://www.youtube.com/v/"),new RegExp("^javascript:"),]};addEventListener("load",function(_24){var _25=iui.getSelectedPage();var _26=getPageFromLoc();if(_25){iui.showPage(_25);}if(_26&&(_26!=_25)){iui.showPage(_26);}setTimeout(preloadImages,0);if(typeof window.onorientationchange=="object"){window.onorientationchange=orientChangeHandler;_b=true;setTimeout(orientChangeHandler,0);}setTimeout(checkOrientAndLocation,0);_a=setInterval(checkOrientAndLocation,300);},false);addEventListener("unload",function(_27){return;},false);addEventListener("click",function(_28){var _29=findParent(_28.target,"a");if(_29){function unselect(){_29.removeAttribute("selected");}if(_29.href&&_29.hash&&_29.hash!="#"&&!_29.target){_29.setAttribute("selected","true");iui.showPage($(_29.hash.substr(1)));setTimeout(unselect,500);}else{if(_29==$("backButton")){history.back();}else{if(_29.getAttribute("type")=="submit"){var _2a=findParent(_29,"form");if(_2a.target=="_self"){_2a.submit();return;}submitForm(_2a);}else{if(_29.getAttribute("type")=="cancel"){cancelDialog(findParent(_29,"form"));}else{if(_29.target=="_replace"){_29.setAttribute("selected","progress");iui.showPageByHref(_29.href,null,null,_29,unselect);}else{if(iui.isNativeUrl(_29.href)){return;}else{if(_29.target=="_webapp"){location.href=_29.href;}else{if(!_29.target){_29.setAttribute("selected","progress");iui.showPageByHref(_29.href,null,null,null,unselect);}else{return;}}}}}}}}_28.preventDefault();}},true);addEventListener("click",function(_2b){var div=findParent(_2b.target,"div");if(div&&hasClass(div,"toggle")){div.setAttribute("toggled",div.getAttribute("toggled")!="true");_2b.preventDefault();}},true);function getPageFromLoc(){var _2d;var _2e=location.hash.match(/#_([^\?_]+)/);if(_2e){_2d=_2e[1];}if(_2d){_2d=$(_2d);}return _2d;}function orientChangeHandler(){var _2f=window.orientation;switch(_2f){case 0:setOrientation(_c);break;case 90:case -90:setOrientation(_d);break;}}function checkOrientAndLocation(){if(!_b){if(window.innerWidth!=_5){_5=window.innerWidth;var _30=_5==320?_c:_d;setOrientation(_30);}}if(location.hash!=_6){var _31=location.hash.substr(_7.length);iui.showPageById(_31);}}function setOrientation(_32){document.body.setAttribute("orient",_32);setTimeout(scrollTo,100,0,1);}function showDialog(_33){_4=_33;_33.setAttribute("selected","true");if(hasClass(_33,"dialog")&&!_33.target){showForm(_33);}}function showForm(_34){_34.onsubmit=function(_35){_35.preventDefault();submitForm(_34);};_34.onclick=function(_36){if(_36.target==_34&&hasClass(_34,"dialog")){cancelDialog(_34);}};}function cancelDialog(_37){_37.removeAttribute("selected");}function updatePage(_38,_39){if(!_38.id){_38.id="__"+(++_9)+"__";}location.hash=_6=_7+_38.id;_8.push(_38.id);var _3a=$("pageTitle");if(_38.title){_3a.innerHTML=_38.title;}if(_38.localName.toLowerCase()=="form"&&!_38.target){showForm(_38);}var _3b=$("backButton");if(_3b){var _3c=$(_8[_8.length-2]);if(_3c&&!_38.getAttribute("hideBackButton")){_3b.style.display="inline";_3b.innerHTML=_3c.title?_3c.title:"Back";}else{_3b.style.display="none";}}}function slidePages(_3d,_3e,_3f){var _40=(_3f?_3d:_3e).getAttribute("axis");clearInterval(_a);if(canDoSlideAnim()&&_40!="y"){slide2(_3d,_3e,_3f,slideDone);}else{slide1(_3d,_3e,_3f,_40,slideDone);}function slideDone(){if(!hasClass(_3e,"dialog")){_3d.removeAttribute("selected");}_a=setInterval(checkOrientAndLocation,300);setTimeout(updatePage,0,_3e,_3d);_3d.removeEventListener("webkitTransitionEnd",slideDone,false);}}function canDoSlideAnim(){return (iui.animOn)&&(typeof WebKitCSSMatrix=="object");}function slide1(_41,_42,_43,_44,cb){if(_44=="y"){(_43?_41:_42).style.top="100%";}else{_42.style.left="100%";}scrollTo(0,1);_42.setAttribute("selected","true");var _46=100;slide();var _47=setInterval(slide,_2);function slide(){_46-=_1;if(_46<=0){_46=0;clearInterval(_47);cb();}if(_44=="y"){_43?_41.style.top=(100-_46)+"%":_42.style.top=_46+"%";}else{_41.style.left=(_43?(100-_46):(_46-100))+"%";_42.style.left=(_43?-_46:_46)+"%";}}}function slide2(_48,_49,_4a,cb){_49.style.webkitTransitionDuration="0ms";var _4c="translateX("+(_4a?"-":"")+window.innerWidth+"px)";var _4d="translateX("+(_4a?"100%":"-100%")+")";_49.style.webkitTransform=_4c;_49.setAttribute("selected","true");_49.style.webkitTransitionDuration="";function startTrans(){_48.style.webkitTransform=_4d;_49.style.webkitTransform="translateX(0%)";}_48.addEventListener("webkitTransitionEnd",cb,false);setTimeout(startTrans,0);}function preloadImages(){var _4e=document.createElement("div");_4e.id="preloader";document.body.appendChild(_4e);}function submitForm(_4f){iui.showPageByHref(_4f.action||"POST",encodeForm(_4f),_4f.method);}function encodeForm(_50){function encode(_51){for(var i=0;i<_51.length;++i){if(_51[i].name){args.push(_51[i].name+"="+escape(_51[i].value));}}}var _53=[];encode(_50.getElementsByTagName("input"));encode(_50.getElementsByTagName("textarea"));encode(_50.getElementsByTagName("select"));return _53;}function findParent(_54,_55){while(_54&&(_54.nodeType!=1||_54.localName.toLowerCase()!=_55)){_54=_54.parentNode;}return _54;}function hasClass(_56,_57){var re=new RegExp("(^|\\s)"+_57+"($|\\s)");return re.exec(_56.getAttribute("class"))!=null;}function replaceElementWithSource(_59,_5a){var _5b=_59.parentNode;var _5c=_59;while(_5b.parentNode!=document.body){_5b=_5b.parentNode;_5c=_5c.parentNode;}var _5d=document.createElement(_5c.localName);_5d.innerHTML=_5a;_5b.removeChild(_5c);while(_5d.firstChild){_5b.appendChild(_5d.firstChild);}}function $(id){return document.getElementById(id);}function ddd(){console.log.apply(console,arguments);}})();