//JS
if(document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1 && navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
	document.write("<script src='js/cordova.js'><\/script>");
}
document.write("<script src='js/jquery-2.0.3.min.js?"+newDate+"'><\/script>");
document.write("<script src='js/jquery-ui-1.10.3.min.js?"+newDate+"'><\/script>");
document.write("<script src='js/mobiscroll.2.9.0.js?"+newDate+"'><\/script>");
document.write("<script src='js/jquery.nicescroll.js?"+newDate+"'><\/script>");
document.write("<script src='js/jquery.color-2.1.0.min.js?"+newDate+"'><\/script>");
document.write("<script src='js/jquery.mobileCheckbox.js?"+newDate+"'><\/script>");
//document.write("<script src='" + hostLocal + "js/jquery.mobile-events.js?"+newDate+"'><\/script>");
document.write("<script src='js/jquery.touchSwipe.js?"+newDate+"'><\/script>");
document.write("<script src='js/spin.min.js?"+newDate+"'><\/script>");
document.write("<script src='js/quo.js?"+newDate+"'><\/script>");
document.write("<script src='js/html5sql.js?"+newDate+"'><\/script>");
document.write("<script src='js/UserVoice.js?"+newDate+"'><\/script>");
document.write("<script src='js/calculator.js?"+newDate+"'><\/script>");
document.write("<script src='js/carpe_slider.js?"+newDate+"'><\/script>");
document.write("<script src='" + hostLocal + "js/app_lang.js?"+newDate+"'><\/script>");
document.write("<script src='" + hostLocal + "js/app_setup.js?"+newDate+"'><\/script>");
document.write("<script src='" + hostLocal + "js/app_build.js?"+newDate+"'><\/script>");
document.write("<script src='" + hostLocal + "js/app_static.js?"+newDate+"'><\/script>");
document.write("<script src='" + hostLocal + "js/app_dynamic.js?"+newDate+"'><\/script>");
document.write("<script src='" + hostLocal + "js/app_custom_core.js?"+newDate+"'><\/script>");
//CSS
document.write("<style type'text/css'>@font-face { font-family: 'FontAwesome'; src: url('css/font/fontawesome-webfont.eot?v=4.0.3'); src: url('css/font/fontawesome-webfont.eot?#iefix&v=4.0.3') format('embedded-opentype'), url('css/font/fontawesome-webfont.woff?v=4.0.3') format('woff'), url('css/font/fontawesome-webfont.ttf?v=4.0.3') format('truetype'), url('css/font/fontawesome-webfont.svg#fontawesomeregular?v=4.0.3') format('svg'); font-weight: normal;  font-style: normal; } </style>");
document.write("<link rel='stylesheet' type='text/css' href='css/mobiscroll.2.9.0.css?"+newDate+"' />");
document.write("<link rel='stylesheet' type='text/css' href='" + hostLocal + "css/index.css?"+newDate+"' />");

