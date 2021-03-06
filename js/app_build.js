﻿/*########################################
####    HTML BUILDS ~ OPEN SETTINGS   ####
###################function openSettings*/
app.tab.settings = function(keepOpen) {
	//RAW HTML
	var settingsHtml = '\
	<a name="top"></a>\
	<div id="settingsWrapper">\
		<ul id="settingsList">\
			<li id="optionMeasure">\
				<div class="contentToggleTitle">\
					<p class="contentTitle" id="contentToggleTitle">' + LANG.MEASURE_SYSTEM[lang] + '<span>' + LANG.MEASURE_SYSTEM_INFO[lang] + '</span></p>\
					<div id="tapSwitch">\
						<div id="leftOption"><span>'  + LANG.IMPERIAL[lang] + ' </span></div>\
						<div id="rightOption"><span>' + LANG.METRIC[lang]   + ' </span></div>\
					</div>\
				</div>\
			</li>\
			<li id="optionFacebook"><div><p class="contentTitle">' + LANG.BACKUP_AND_SYNC[lang]      + '<span>' + LANG.SETTINGS_BACKUP_INFO[lang]   + '</span></p></div></li>\
			<li id="optionLang"><div><p class="contentTitle">'     + LANG.SETTINGS_SYSTEM_LANG[lang] + '<span>' + LANG.LANGUAGE_NAME[lang]          + '</span></p></div></li>\
			<li id="optionHelp"><div><p class="contentTitle">'     + LANG.SETTINGS_HELP[lang]        + '<span>' + LANG.SETTINGS_HELP_INFO[lang]     + '</span></p></div></li>\
		</ul>\
		<div id="optionWebsite"><span>' + appName + "</span> for " + app.get.platform() + '</div>\
		<div id="optionLastSync">' + LANG.LAST_SYNC[lang]  + '<span>--</span></div>\
		<div id="optionAdvanced">' + LANG.SETTINGS_ADVANCED[lang] + '</div>\
	</div>\
	';
	//#////////#//
	//# OUTPUT #//
	//#////////#//
	preTab(keepOpen);
	$('#appContent').html(settingsHtml);
	afterTab(keepOpen);
	///////////////////
	// last sync tap //
	///////////////////
	if(!app.read('lastSync','never')) {
		$('#optionLastSync span').html(dateDiff(app.read('lastSync'),app.now()));
	}
	$('#optionLastSync').on(touchend,function(evt) {
		evt.preventDefault();
		if(!$('body').hasClass('insync')) {
			syncEntries(app.read('facebook_userid'));
		}
		return false;
	});
	//#///////#//
	//# ABOUT #//
	//#///////#//
	app.about = function() {
		//////////
		// HTML //
		//////////
		var aboutHtml = '\
		<div id="appStores">\
			<span id="b000"></span>\
			<span id="b100"></span>\
			<span id="b200"></span>\
			<span id="b300"></span>\
			<span id="b400"></span>\
			<span id="b500"></span>\
			<span id="b600"></span>\
			<span id="b700"></span>\
			<span id="b800"></span>\
			<span id="b900"></span>\
		</div>\
		<div id="developedBy">' + LANG.DEVELOPED_BY[lang] + '<span id="contactDeveloper">support@kcals.net</span></div>\
		';
		/////////////
		// HANDLER //
		/////////////
		var aboutHandler = function() { 
			app.handlers.activeRow('#b000','button',function() { app.url('www');        });
			app.handlers.activeRow('#b100','button',function() { app.url('android');    });
			app.handlers.activeRow('#b200','button',function() { app.url('ios');        });
			app.handlers.activeRow('#b300','button',function() { app.url('wp8');        });
			app.handlers.activeRow('#b400','button',function() { app.url('windows8');   });
			app.handlers.activeRow('#b500','button',function() { app.url('firefoxos');  });
			app.handlers.activeRow('#b600','button',function() { app.url('osxapp');     });
			app.handlers.activeRow('#b700','button',function() { app.url('chromeos');   });
			app.handlers.activeRow('#b800','button',function() { app.url('blackberry'); });
			app.handlers.activeRow('#b900','button',function() { app.url('amazon'); });
			//CONTACT
			app.handlers.activeRow('#developedBy','button',function(evt) {
				app.url('mailto:support@kcals.net?Subject=KCals%20-%20Dev Support%20(' + app.get.platform(1) + ')'); 
			});
		};
		/////////////////
		// CALL WINDOW //
		/////////////////
		getNewWindow('KCals ' + appVersion, aboutHtml, aboutHandler);
	};
	$('#optionWebsite').on(touchend,function(evt) {
		app.about();
	});
	//////////////
	// HELP TAP //
	//////////////
	$('#optionHelp').on(touchend,function(evt) {
		$(this).addClass('activeRow');
		evt.preventDefault();
		buildHelpMenu();
		return false;
	});	
	//////////////
	// LANG TAP //
	//////////////
	$('#optionLang').on(touchend,function(evt) {
		buildLangMenu();
	});
	////////////////////////
	// SETTINGS: FACEBOOK //
	////////////////////////
	$('#optionFacebook').on(touchend, function(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		//fix exception 18
		if(app.device.android) {
			updateFoodDb();
		}
		if(!$('body').hasClass('insync') && !$('body').hasClass('setpush')) {
			if(app.read('facebook_logged')) {
				//CONFIRM DIALOG
				appConfirm(LANG.LOGOUT_TITLE[lang], LANG.ARE_YOU_SURE[lang], getLogoutFB, LANG.OK[lang], LANG.CANCEL[lang]);
			} else {
				app.remove('app_restart_pending');
				setTimeout(function() {
					getLoginFB();
				},100);
			}
		}
	});
	//TOGGLE ACTIVE
	$('#optionFacebook').on(touchstart,function(evt) {
		evt.preventDefault();
		$('#optionFacebook').addClass('activeRow');
	});
	$('#optionFacebook').on(touchend + ' mouseout',function(evt) {
		$('#optionFacebook').removeClass('activeRow');
	});
	//SET USERNAME (IF LOGGED)
	if(app.read('facebook_username') && app.read('facebook_logged')) {
		$('#optionFacebook span').html(LANG.LOGGED_IN_AS[lang] + ' ' + app.read('facebook_username'));
	}
	////////////////
	// ACTIVE ROW //
	////////////////
	$('#settingsList li').on(touchstart,function(evt) {
		evt.preventDefault();
		$(this).addClass('activeRow');
	});
	$('#settingsList,#settingsList li').on(touchend + ' mouseout',function(evt) {
		$('.activeRow').removeClass('activeRow');
		evt.preventDefault();
	});
	////////////////////////
	// SETTINGS: ADVANCED //
	////////////////////////
	$('#optionAdvanced').on(touchend, function(evt) {
		buildAdvancedMenu();
	});
	$('#optionAdvanced').on(touchstart,function(evt) {
		evt.preventDefault();
		$('#optionAdvanced').addClass('activeRow');
	});
	$('#optionAdvanced').on(touchend + ' mouseout',function(evt) {
		$('#optionAdvanced').removeClass('activeRow');
	});
	///////////////////////////
	// SETTINGS: UNIT TOGGLE //
	///////////////////////////
	$('#optionMeasure').on(touchstart,function(evt) {
		evt.preventDefault();
	});	
	$('#leftOption').on(touchstart,function(evt){
		evt.preventDefault();
		evt.stopPropagation();
		$('#leftOption').addClass('toggle');
		$('#rightOption').removeClass('toggle');
		//AUTO CONVERT
		if(!app.read('config_measurement','imperial')) {
			app.save('calcForm#pA3B',Math.round(app.read('calcForm#pA3B')/0.454));
			var calcInches = app.read('calcForm#inches')/2.54;
			var calcFeet   = 0;
			while(calcInches >= 12) {
				calcInches = calcInches-12;
				calcFeet   = calcFeet+1;
			}
			app.save('calcForm#feet',calcFeet);
			app.save('calcForm#inches',Math.round(calcInches));
		}
		app.save('config_measurement','imperial');
		app.save('calcForm#pA2C','inches');
		app.save('calcForm#pA3C','pounds');
		app.save('calcForm#pA6H','pounds');
		app.save('calcForm#pA6N','pounds');
		setPush();
	});
	$('#rightOption').on(touchstart,function(evt){
		evt.preventDefault();
		evt.stopPropagation();
		$('#rightOption').addClass('toggle');
		$('#leftOption').removeClass('toggle');
		//AUTO CONVERT
		if(!app.read('config_measurement','metric')) {
			app.save('calcForm#pA3B',Math.round(app.read('calcForm#pA3B')*0.454));
			app.save('calcForm#inches',Math.round(((app.read('calcForm#feet')*12) + app.read('calcForm#inches')) * 2.54));
			app.save('calcForm#feet','0');
		}
		app.save('config_measurement','metric');
		app.save('calcForm#pA2C','centimetres');
		app.save('calcForm#pA3C','kilograms');
		app.save('calcForm#pA6H','kilograms');
		app.save('calcForm#pA6N','kilograms');
		setPush();
	});
	//read stored
	if(app.read('config_measurement','metric')) {
		$('#rightOption').addClass('toggle');
	} else {
		$('#leftOption').addClass('toggle');
	}
};
/*#######################################
####    HTML BUILDS ~ OPEN STATUS    ####
#######################################*/
app.tab.status = function(keepOpen) {
//function openStatus(keepOpen) {
	////////////////////
	// TODAY OVERVIEW //
	////////////////////
	var totalConsumed = app.read('config_ttf') - (Math.abs(app.read('config_tte')));
	var totalIntake   = app.read('config_kcals_day_0');
	var totalPercent  = totalConsumed / (totalIntake / 100);
	//create empty intake html cache
	app.define('appStatusIntake',' ');
	/////////////////////////////
	// PRE-SET START/RESET BAR //
	/////////////////////////////
	var appStatusClass = 'start';
	var appStatusTitle = LANG.START[lang];
	if(app.read('appStatus','running')) {
		appStatusClass = 'reset'; 
		appStatusTitle = LANG.RESET[lang];
	}
	////////////////////
	// READ PIE CACHE //
	////////////////////
	var statusBlock2 = app.read('pieCache').length > 10 ? app.read('pieCache') : '\
		<div id="blockWrapper">\
		<div id="circlePercent"></div>\
		<div id="circlePercentInner"></div>\
		<div id="totalConsumed">' + totalConsumed + '</div>\
		<div id="totalIntake">/ ' + totalIntake + ' ' + LANG.KCAL[lang] + ' </div>\
		</div>\
		<div id="appDays">\
			<div id="appDayA">' + LANG.DAY[lang] + ' A</div>\
			<div id="appDayB">' + LANG.DAY[lang] + ' B</div>\
			<div id="appDayC">' + LANG.DAY[lang] + ' C</div>\
			<div id="appDayD">' + LANG.DAY[lang] + ' D</div>\
		</div>\
		<div id="todayInfo"></div>\
	';
	//RAW HTML
	var statusHtml = '\
	<a name="top"></a>\
	<div id="statusWrapper">\
		<div id="appStatusElapsed"><div><p></p><span></span></div>\
		<div id="elapsedIndicators"><div id="ind1"></div><div id="ind2"></div><div id="ind3"></div></div>\
		<div id="elapsedInfo"></div>\
		</div>\
		<div id="appStatusBlock2">' + statusBlock2 + '</div>\
		<div id="appStatusBalance" class=" ' + app.read('cssOver') + '"><div><p>' + app.read('appBalance') + '</p><span>' + LANG.CALORIC_BALANCE[lang] + '</span><div id="balanceBar"></div></div></div>\
		<div id="appStatusIntake">' + app.read('appStatusIntake') + '</div>\
		<div id="appStatusBars">\
			<div id="appStatusBarsPro"><p>' + LANG.PROTEINS[lang].toUpperCase() + '</p><span>0%</span></div>\
			<div id="appStatusBarsCar"><p>' + LANG.CARBS[lang].toUpperCase() + '</p><span>0%</span></div>\
			<div id="appStatusBarsFat"><p>' + LANG.FATS[lang].toUpperCase() + '</p><span>0%</span></div>\
		</div>\
		<div id="appStatusAddLeft"><div>'  + LANG.FOOD[lang]     + '</div></div>\
		<div id="appStatusAddRight"><div>' + LANG.EXERCISE[lang] + '</div></div>\
		<div id="appStatusFix">\
			<div id="startDateBar"><span id="startDateSpan"><input id="startDate" tabindex="-1" readonly /></span></div>\
			<div id="appStatusToggle"></div>\
			<div id="appStatus" class="' + appStatusClass + '">\
				<div id="appStatusTitle">' + appStatusTitle + '</div>\
				<div id="appStatusArrow"></div>\
				<div id="appStatusReload"></div>\
			</div>\
		</div>\
	</div>';
	//#////////#//
	//# OUTPUT #//
	//#////////#//
	preTab(keepOpen);
	$('#appContent').html(statusHtml);
	afterTab(keepOpen);
	//#//////////#//
	//# HANDLERS #//
	//#//////////#//
	//PRE
	getElapsed();
	updateNutriBars();
	balanceMeter(timerKcals);
	updateTodayOverview();
	intakeHistory();
	//////////////////
	// ELAPSED SWAP //
	//////////////////
	$('#appStatusElapsed').on(touchstart,function(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		if($('#timerDailyInput').is(':focus')) { $('#timerDailyInput').trigger('blur'); return false; }
		getElapsed('next');
	});
	//info block
	$('#elapsedInfo').on(touchstart,function(evt) {
		evt.stopPropagation();
		getNewWindow('Elapsed Time / Relative Time','<div id="blockInfo">' + LANG.HELP_TOPICS_ARRAY['en']['Elapsed Time / Relative Time'] + '</div>');
	});
	////////////////
	// LIMIT MENU //
	////////////////
	$('#appStatusBalance').on(touchstart,function(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		if($('#timerDailyInput').is(':focus')) { $('#timerDailyInput').trigger('blur'); return false; }
		getLimitMenu();
	});	
	/////////////////
	// CYCLIC MENU //
	/////////////////
	$('#appStatusBlock2').on(touchstart,function(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		if($('#timerDailyInput').is(':focus')) { $('#timerDailyInput').trigger('blur'); return false; }
		updateTodayOverview(1);
	});
	//cyclic block
	$('#todayInfo').on(touchstart,function(evt) {
		evt.stopPropagation();
		getCyclicMenu();
	});
	//////////////////
	// HISTORY MENU //
	//////////////////
	$('#appStatusIntake').on(touchstart,function(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		if($('#timerDailyInput').is(':focus')) { $('#timerDailyInput').trigger('blur'); return false; }
		getFullHistory();
	});
	////////////////
	// NUTRI MENU //
	////////////////
	$('#appStatusBars').on(touchstart,function(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		if($('#timerDailyInput').is(':focus')) { $('#timerDailyInput').trigger('blur'); return false; }
		getNutriSliders();
	});
	//#///////////#//
	//# START BAR #//
	//#///////////#//
	$('#appStatusTitle').on(touchend,function(evt) {
		if(app.read('appStatus','running')) {
			function appReset(button) {
				//ON CONFIRM
				if(button === 2) {
					setPush();
					$('#appStatus').removeClass('reset');
					$('#appStatus').addClass('start');
					$('#appStatusTitle').html(LANG.START[lang]);
					app.remove('appStatus');
					app.save('config_start_time',app.now());
					//RESET BACKPORT
					app.save('config_entry_sum',0);
					app.save('config_entry_f-sum',0);
					app.save('config_entry_e-sum',0);
					app.save('config_ttf',0);
					app.save('config_tte',0);
					$('#appStatusBars p').css('width',0);
					$('#appStatusBars span').html('0%');
					$('#appStatusBalance div p').html(LANG.BALANCED[lang]);
					updateTodayOverview();
				}
				return false;
			}
			//SHOW DIALOG
			appConfirm(LANG.RESET_COUNTER_TITLE[lang], LANG.ARE_YOU_SURE[lang], appReset, LANG.OK[lang], LANG.CANCEL[lang]);
		} else {
			setPush();
			$('#appStatus').removeClass('start');
			$('#appStatus').addClass('reset');
			$('#appStatusTitle').html(LANG.RESET[lang]);
			app.save('appStatus','running');
			app.save('config_start_time',app.now());
			/////////////////////////
			// INFO: CLOSE TO ZERO //
			/////////////////////////
			app.info('close_to_zero',LANG.CLOSE_TO_ZERO[lang]);
		}
		evt.preventDefault();
	});
	//#/////////////#//
	//# ADD BUTTONS #//
	//#/////////////#//
	/*
	app.handlers.activeRow('#appStatusAddLeft,#appStatusAddRight','clicked',function(targetId) {
		if(targetId == 'appStatusAddLeft') {
			app.save('searchType','food');
		} else {
			app.save('searchType','exercise');
		}
		$(document).trigger('pageReload');
	},function() {
		if($('#editable').is(':visible') || $('#pageSlideFood').hasClass('busy')) { 
			$('#editable').trigger('blur');
			return false;
		}
	});
	*/
	$('#appStatusAddLeft').on(touchstart,function(evt) {
		if($('#timerDailyInput').is(':focus')) { $('#timerDailyInput').trigger('blur'); return false; }
		evt.preventDefault();
		if(!$('#pageSlideFood').hasClass('busy')) {
			app.save('searchType','food');
		} else {
			//return false;
		}
		$(document).trigger('pageReload');
	});
	$('#appStatusAddRight').on(touchstart,function(evt) {
		if($('#timerDailyInput').is(':focus')) { $('#timerDailyInput').trigger('blur'); return false; }
		evt.preventDefault();
		if(!$('#pageSlideFood').hasClass('busy')) {
			app.save('searchType','exercise');
		} else {
			//return false;
		}
		$(document).trigger('pageReload');
	});
	//#/////////////////////#//
	//# APP STATUS/DATE BAR #//
	//#/////////////////////#//	
	////////////////
	// DATEPICKER //
	////////////////
	if($.mobiscroll) {
	$('#startDate').mobiscroll().datetime({
		preset: 'datetime',
		minDate: new Date((new Date().getFullYear() - 1),1,1, 0, 0), //LAST YEAR'S START
		maxDate: new Date(),
		theme: 'ios7',
		lang: 'en',
		dateFormat: 'yyyy/mm/dd',
		dateOrder:  'dd MM yy',
		timeWheels: 'HH:ii',
	    timeFormat: 'HH:ii',
		setText: LANG.OK[lang].capitalize(),
		closeText: LANG.CANCEL[lang].capitalize(),
		cancelText: LANG.CANCEL[lang].capitalize(),
		dayText: LANG.DAY[lang].capitalize(),
		monthText: LANG.MONTH[lang].capitalize(),
		yearText: LANG.YEAR[lang].capitalize(),
		hourText: LANG.HOURS[lang].capitalize(),
		minuteText: LANG.MINUTES[lang].capitalize(),
		display: 'modal',
		stepMinute: 1,
		animate: 'none',
		monthNames: LANG.MONTH_SHORT[lang].split(', '),
		monthNamesShort: LANG.MONTH_SHORT[lang].split(', '),
		mode: 'scroller',
		showLabel: true,
		useShortLabels: true
    });
	}
	$('#startDate').on(touchstart,function(evt) {
		if(app.device.android && app.device.android < 4.4)  {
			//
		} else {
			evt.preventDefault();
			evt.stopPropagation();	
			$('#startDate').click();
			return false;
		}
	});
	//////////////////
	// ENABLE DEBUG //
	//////////////////	
	$('#appStatusReload').on('longhold',function(evt) {
		if(app.read('config_debug','active')) {
			app.remove('config_debug');
			afterHide();
		} else {
			app.save('config_debug','active');
			afterHide();
		}
	});
	/////////////////
	// RELOAD ICON //
	/////////////////
	app.handlers.activeRow('#appStatusReload','false',function(evt) {
		$('#startDateBar').hide();
		$('#appStatusReload').off('longhold');
		afterHide();
	});
	////////////////////
	// SHOW STARTDATE //
	////////////////////
	app.handlers.activeRow('#appStatusToggle','button',function(evt) {
		if($('#appStatusFix').hasClass('open')) {
			$('#startDate').blur();
			$('#appStatusFix').removeClass('open');
		} else {
			$('#appStatusFix').addClass('open');
		}
		$('#startDate').scroller('setDate',new Date(app.read('config_start_time')), true);
		return false;
	});
	// ON BLUR //
	var onChange = 0;
	$('#startDate').change(function() {
		if($('.dwo').length) {
			onChange++;
		}
	});
	$('#startDate').blur(function(){
		//write if changed
		if(onChange > 0) {
			//if not future
			if(Number(Date.parse($('#startDate').val())) < Number((new Date().getTime())) ) {
				//write input date as time
				app.save('config_start_time',Date.parse($('#startDate').val()));
			}
			setPush();
			onChange = 0;
			updateTimer();
			app.exec.updateEntries();
		}
	});
	// AUTOCLOSE n' hide //
	$('#appHeader,#appContent').on(touchstart, function(evt) {
		//GLOBAL CLOSER
		if(evt.target.id == 'startDate' || evt.target.id == 'startDateBar' || evt.target.id == 'appStatusToggle') {
			return;
		}
		//TRIGGER BLUR (SAVE) & CLOSE
		if($('#appStatusFix').hasClass('open')) {
			$('#startDate').blur();
			$('#appStatusFix').removeClass('open');
		}
	});
	//prevent keyboard
	$('#startDate').on('focus', function(evt) {
		$('#startDate').blur();
	});
};
/*############################
## HTML BUILDS ~ OPEN DIARY ##
############################*/
app.tab.diary = function(entryListHtml,keepOpen) {
	if(keepOpen == 1) {
		app.exec.updateEntries();
		return;
	}
	if(!entryListHtml) { return; }
	//RAW HTML
	var diaryHtml = '';
	var lHour     = LANG.HOUR[lang];
	var lHours    = LANG.HOURS[lang];
	var lDay      = LANG.DAY[lang];
	var lDays     = LANG.DAYS[lang];
	var lAgo      = ' ' + LANG.AGO[lang];
	var lPreAgo   = LANG.PREAGO[lang] + ' ';
	//android 2.x select fix
	var formSelect = '<select id="entryTime" name="entryTime" tabindex="-1">\
		<option value="0">'   + LANG.NOW[lang]  +                 '</option>\
		<option value="1">'   + lPreAgo + '1 '  + lHour  + lAgo + '</option>\
		<option value="2">'   + lPreAgo + '2 '  + lHours + lAgo + '</option>\
		<option value="3">'   + lPreAgo + '3 '  + lHours + lAgo + '</option>\
		<option value="4">'   + lPreAgo + '4 '  + lHours + lAgo + '</option>\
		<option value="5">'   + lPreAgo + '5 '  + lHours + lAgo + '</option>\
		<option value="6">'   + lPreAgo + '6 '  + lHours + lAgo + '</option>\
		<option value="7">'   + lPreAgo + '7 '  + lHours + lAgo + '</option>\
		<option value="8">'   + lPreAgo + '8 '  + lHours + lAgo + '</option>\
		<option value="9">'   + lPreAgo + '9 '  + lHours + lAgo + '</option>\
		<option value="10">'  + lPreAgo + '10 ' + lHours + lAgo + '</option>\
		<option value="11">'  + lPreAgo + '11 ' + lHours + lAgo + '</option>\
		<option value="12">'  + lPreAgo + '12 ' + lHours + lAgo + '</option>\
		<option value="13">'  + lPreAgo + '13 ' + lHours + lAgo + '</option>\
		<option value="14">'  + lPreAgo + '14 ' + lHours + lAgo + '</option>\
		<option value="15">'  + lPreAgo + '15 ' + lHours + lAgo + '</option>\
		<option value="16">'  + lPreAgo + '16 ' + lHours + lAgo + '</option>\
		<option value="17">'  + lPreAgo + '17 ' + lHours + lAgo + '</option>\
		<option value="18">'  + lPreAgo + '18 ' + lHours + lAgo + '</option>\
		<option value="19">'  + lPreAgo + '19 ' + lHours + lAgo + '</option>\
		<option value="20">'  + lPreAgo + '20 ' + lHours + lAgo + '</option>\
		<option value="21">'  + lPreAgo + '21 ' + lHours + lAgo + '</option>\
		<option value="22">'  + lPreAgo + '22 ' + lHours + lAgo + '</option>\
		<option value="23">'  + lPreAgo + '23 ' + lHours + lAgo + '</option>\
		<option value="24">'  + lPreAgo + '1 '  + lDay   + lAgo + '</option>\
		<option value="48">'  + lPreAgo + '2 '  + lDays  + lAgo + '</option>\
		<option value="72">'  + lPreAgo + '3 '  + lDays  + lAgo + '</option>\
		<option value="96">'  + lPreAgo + '4 '  + lDays  + lAgo + '</option>\
		<option value="120">' + lPreAgo + '5 '  + lDays  + lAgo + '</option>\
		<option value="144">' + lPreAgo + '6 '  + lDays  + lAgo + '</option>\
		<option value="168">' + lPreAgo + '7 '  + lDays  + lAgo + '</option>\
	</select>';
	var textOrNumber = app.device.desktop || app.device.android ? 'text' : 'number';
	diaryHtml += '\
	<a name="top"></a>	\
	<div id="entryListForm">\
		<div id="sliderWrapper"><input id="slider" type="range" min="-750" max="750" step="25" value="0" data-carpe-targets="entryTitle" data-carpe-decimals="0" /></div>\
		<div id="sliderNum"><input type="' + textOrNumber + '" id="entryTitle" readonly value="0" />' + LANG.KCAL[lang] + '</div>\
		<div id="sliderNeg"><span></span>' + LANG.EXERCISE[lang] + '</div>\
		<div id="sliderPos">' + LANG.FOOD[lang] + '<span></span></div>\
		<input type="text" id="entryBody" placeholder="' + LANG.DESCRIPTION[lang] + '" tabindex="-1" />\
		<div id="entryBodySearch"><div></div></div>\
		' + formSelect + '\
		<div id="entrySubmit">' + LANG.ADD_ENTRY[lang] + '</div>\
	</div>\
	<div id="entryListWrapper">\
		<div class="heading" id="go">' + LANG.ACTIVITY_LOG[lang] + '<div id="diarySidebar"></div><div id="diaryNotes"></div></div>\
		<div id="entryList">';
	//////////////////////
	// CALLBACK CONTENT //
	//////////////////////
	diaryHtml += entryListHtml;
	///////////////////
	diaryHtml += '</div>\
		<div id="entryListBottomBar">' + LANG.CLEAR_ALL[lang] + '</div>\
		</div>\
	</div>';
	//#////////#//
	//# OUTPUT #//
	//#////////#//
	//block deferred
	if(!app.read('app_last_tab','tab2')) { return; }
	//HTML
	preTab(keepOpen);
	pageLoad('#appContent',diaryHtml);
	afterTab(keepOpen);
	//SET SLIDER+HEIGHT
	updateEntriesSum();
	$(document).trigger('sliderInit');
	//slider info
	app.info('slider_quick_add',LANG.SLIDER_QUICK_ADD[lang]);
	//#//////////#//
	//# HANDLERS #//
	//#//////////#//
	var slider = {};
	/////////////
	// SIDEBAR //
	/////////////
	app.define('config_sidebar',1);
	if(app.read('config_sidebar') == 1) {
		$('body').addClass('sidebar');
	} else {
		$('body').removeClass('sidebar');
	}
	//HANDLER	
	$('#diarySidebar').on(touchstart, function(evt) {
		if(app.read('config_sidebar') == 1) {
			$('body').removeClass('sidebar');
			app.save('config_sidebar',0);
		} else {
			$('body').addClass('sidebar');
			app.save('config_sidebar',1);
		}
		return false;
	});
	/////////////////////
	// SLIDER.UPDATE() //
	/////////////////////
	slider.update = function() {
		app.globals.XLock = 0;
		app.globals.MX    = 0;
		app.globals.MY    = 500;
		//NOT WHILE MANUAL
		if(!$('#entryTitle').attr('readonly')) { return; }
		/////////////////////
		// CACHE SELECTORS //
		/////////////////////
		var inputValue = (app.globals.recentResize == 0) ? parseInt($('#slider').val()) : parseInt($('#entryTitle').val());
		/////////////////
		// CHECK TRACK //
		/////////////////
		if(inputValue >= 1) {
			if($('.carpe-slider-track').attr('id') != 'positiveTrack') {
				$('.carpe-slider-track').attr('id','positiveTrack');
			}
		} else if(inputValue <= -1) {
			if($('.carpe-slider-track').attr('id') != 'negativeTrack') {
				$('.carpe-slider-track').attr('id','negativeTrack');
			}
		} else {
			if($('.carpe-slider-track').attr('id')) {
				$('.carpe-slider-track').removeAttr('id');
			}			
		}
		//////////////////
		// CHECK SUBMIT //
		//////////////////
		if(inputValue > -1 && inputValue < 1) {
			if($('#entrySubmit').hasClass('submitActive')) {
				$('#entrySubmit').removeClass('submitActive');
			}
		} else {
			if(!$('#entrySubmit').hasClass('submitActive')) {
				$('#entrySubmit').addClass('submitActive');
			}
		}
		////////////
		// UPDATE //
		////////////
		slider.lid(inputValue);
		$('#entryTitle').val(inputValue);
	};
	//////////////////
	// SLIDER.LID() //
	//////////////////
	clearTimeout(app.globals.lidTimer);
	slider.lid = function(inputValue) {
		var lidValue = Number($('#lid').val());
		clearTimeout(app.globals.lidTimer);
		clearTimeout(app.globals.lidInnerTimer);
		app.globals.lidTimer = setTimeout(function() {
			$('#loadingDiv').css(prefix + 'transition-duration','.2s');
			setTimeout(function() {
				$('#loadingDiv').css('opacity',0);
				app.globals.lidInnerTimer = setTimeout(function() {
					$('#loadingDiv').css('display','none');
					//POST SUBMIT RESET
					if($('#entryTitle').val() == 0) {
						$('#lid').val(0);
					}
				},200);
			},0);
		},600);
		//show zero~ing
		if(inputValue != 0) {
			$('#lid').val(inputValue);
		}
		//faded~show
		if(lidValue != 0) {
			$('#loadingDiv').css(prefix + 'transition-duration','0s');
			$('#loadingDiv').css('opacity',.66);
			$('#loadingDiv').css('display','block');
		}	
	};
	////////////////////
	// SLIDER.RESET() //
	////////////////////
	slider.reset = function() {
		if(document.getElementById('slider')) {
			clearTimeout(app.repeaterLoop);
			$('#entryTitle').trigger('blur');
			$('#entryBody').trigger('blur');
			$('#entryTime').trigger('blur');
			$('#timerDailyInput').trigger('blur');
			document.getElementById('slider').slider.setValue(0);
			//show zero-ing
			if(parseInt($('#lid').val()) != 0) {
				slider.lid(0);
			}
			$('#lid').val(0);
			$('#entryBody').val('');
			$('#entryTitle').val(0);
			$('#entryTitle').trigger('update');
			$('#entrySubmit').removeClass('submitActive');
		}
	};
	//////////////////
	// SLIDER.ADD() //
	//////////////////
	app.handlers.repeater('#sliderPos','activeArrow',400,25,function() {
		if(document.getElementById('slider')) {
			//Cannot read property increment of undefined
			if(typeof document.getElementById('slider').slider !== 'undefined') {
				var inputValue = Number($('#entryTitle').val());
				document.getElementById('slider').slider.increment(1);
				$('#entryTitle').val(inputValue+1);
				slider.lid(inputValue+1);
			}
		}
	});
	//////////////////
	// SLIDER.REM() //
	//////////////////
	app.handlers.repeater('#sliderNeg','activeArrow',400,25,function() {
		if(document.getElementById('slider')) {
			//Cannot read property increment of undefined
			if(typeof document.getElementById('slider').slider !== 'undefined') {
				var inputValue = Number($('#entryTitle').val());
				document.getElementById('slider').slider.increment(-1);
				$('#entryTitle').val(inputValue-1);
				slider.lid(inputValue-1);
			}
		}
	});
	///////////////////
	// SLIDER.SAVE() //
	///////////////////
	slider.save = function() {
		var title     = $('#entryTitle').val();
		var body      = $('#entryBody').val();
		var published = new Date().getTime();
		//not null
		if(title == 0) { return; }
		//hours ago
		if(Number($('#entryTime').val()) >= 1) {
			published = published - (Number($('#entryTime').val()) * (60 * 60 * 1000) );
		}
		//null default values
		if(body == LANG.FOOD[lang] || body == LANG.EXERCISE[lang]) {
			body = '';
		}
		////////////////
		// SAVE ENTRY //
		////////////////
		saveEntry({title:title,body:body,published:published},function() {
			//RESET
			slider.reset();
			slider.lid(title);
			//REFRESH DATA
			app.exec.updateEntries(published);
			updateTimer();
			updateEntriesSum();
			updateEntriesTime();
			//SCROLLBAR UPDATE
			niceResizer();
			kickDown();
			//////////////////////
			// PROMPT AUTOSTART //
			//////////////////////
			if(app.read('appStatus') != 'running') {
				appConfirm(LANG.NOT_RUNNING_TITLE[lang], LANG.NOT_RUNNING_DIALOG[lang], function(button) {
					if(button === 2) {
						app.save('config_start_time',published);
						app.save('appStatus','running');
						app.exec.updateEntries();
						setPush();
						$('#appStatus').removeClass('start');
						$('#appStatus').addClass('reset');
						$('#appStatusTitle').html(LANG.RESET[lang]);
					}
				}, LANG.OK[lang], LANG.CANCEL[lang]);
			}
			/////////////////////
			// SWIPE LEFT INFO //
			/////////////////////
			app.info('swipe_left',LANG.SWIPE_LEFT[lang],
			function() {
				$('.delete','#' + published).addClass('active open');
				$('.delete','#' + published).on(transitionend, function (evt) {
					$('.delete', '#' + published).removeClass('busy');
				});
			},function() {
				$('#go').trigger(tap);				
			});
		});		
	};
	///////////////////
	// ARROW BUTTONS //
	///////////////////
	$('#sliderNum').on(touchstart, function(evt) {
		if(document.getElementById('slider')) {
			document.getElementById('slider').slider.setValue(0);
			if(parseInt($('#lid').val()) != 0) {
				slider.lid(0);
			}
			$('#lid').val(0);
			$('#entryTitle').val('0');
			return false;
		}
	});
	////////////////////////////////
	// SAVE ENTRY (SUBMIT BUTTON) //
	////////////////////////////////
	$('#entrySubmit').on(touchstart, function(evt) {
		evt.preventDefault();
		slider.save();
	});
	/////////////////////////
	// SLIDER UPDATE EVENT //
	/////////////////////////
	if(document.getElementById('entryTitle')) {
		document.getElementById('entryTitle').update = slider.update;
	}
	//#//////////////#//
	//# HOLD TO EDIT #//
	//#//////////////#//
	$('#sliderNum').on('longhold',function(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		$('#entryTitle').removeAttr('readonly');
		$('#entryTitle').focus();
	});
	//CORE VALIDATION
	app.handlers.validate('#entryTitle',{maxLength:3,inverter:1},'',function() {
		//KEYUP
		if($('#entryTitle').val() == '' || $('#entryTitle').val() == 0) {
			$('#entrySubmit').removeClass('submitActive');
		} else {
			$('#entrySubmit').addClass('submitActive');
		}
	},function() {
		//FOCUS
		if($('#entryTitle').attr('readonly')) {
			$('#entryTitle').blur();
		}
	},function() {
		//BLUR
		$('#entryTitle').attr('readonly','readonly');
	});
	//////////////////
	// DEV KEYCODES //
	//////////////////
	$('#entryBody').on('keyup input paste', function(evt) {
		if((/dev/i).test($('#entryBody').val())) {
			//////////
			// GOTO //
			//////////
			if (/devgoto/i.test($('#entryBody').val())) {
				window.location.href = 'http://' + $('#entryBody').val().toLowerCase().split('devgoto').join('');
				$('#entryBody').val('');
				$('#entryBody').blur();
			}
			//////////
			// UUID //
			//////////
			if (/devuuid/i.test($('#entryBody').val())) {
				$('#entryBody').val('');
				$('#entryBody').blur();
				if(window.device) {
					if(window.device.uuid) {
						alert(window.device.uuid);
					}
				}
			}
			///////////
			// DEBUG //
			///////////
			if (/devdebug/i.test($('#entryBody').val())) {
				if (app.read('config_debug','active')) {
					app.save('config_debug','inactive');
					$('#entryBody').val('');
					$('#entryBody').blur();
					afterHide();
				} else {
					app.save('config_debug','active');
					$('#entryBody').val('');
					$('#entryBody').blur();
					afterHide();
				}
			}
			///////////
			// PURGE //
			///////////
			if (/devpurge/i.test($('#entryBody').val())) {
				app.remove('remoteSuperBlockJS');
				app.remove('remoteSuperBlockCSS');
				app.remove('app_autoupdate_hash');
				//buildRemoteSuperBlock('cached');
				$('#entryBody').val('');
				$('#entryBody').blur();
			}
			////////////
			// NOTIFY //
			////////////
			if (/devnotify/i.test($('#entryBody').val())) {
				if (app.read('app_notify_update')) {
					app.remove('app_notify_update');
				} else {
					app.save('app_notify_update', true);
				}
				$('#entryBody').val('');
				$('#entryBody').blur();
			}
			////////////
			// DRIVER //
			////////////
			if (/devdriver/i.test($('#entryBody').val())) {
				if (localforage) {
					alert(localforage._driver);
				}
				$('#entryBody').val('');
				$('#entryBody').blur();
			}
			///////////
			// CLEAR //
			///////////
			if (/devclear/i.test($('#entryBody').val())) {
				window.localStorage.clear();
				$('#entryBody').val('');
				$('#entryBody').blur();
			}
			////////////
			// RELOAD //
			////////////
			if (/devreload/i.test($('#entryBody').val())) {
				window.location.reload(true);
				$('#entryBody').val('');
				$('#entryBody').blur();
			}
			////////////////
			// INSTALLPKG //
			////////////////
			if (/devinstallpkg/i.test($('#entryBody').val())) {
				if (vendorClass == 'moz') {
					navigator.mozApps.install(app.https + 'kcals.net/manifest.webapp');
					$('#entryBody').val('');
					$('#entryBody').blur();
				}
			}
			/////////////////
			// INSTALLTIME //
			/////////////////
			if (/devinstalltime/i.test($('#entryBody').val())) {
				alert(dtFormat(app.read('config_install_time')));
			}
			//////////
			// EVAL //
			//////////
			if ((/deveval/i).test($('#entryBody').val())) {
				if($('#entryBody').val().split('deveval').join('') != '') {
					$('#entryBody').val( $('#entryBody').val().split('deveval').join('deveva') );
					try {
						eval( $('#entryBody').val().split('deveva').join(''));
					} catch(e) {
						alert(e);
					}
				}
			}
			///////////
			// DEVUA //
			///////////
			if (/devua/i.test($('#entryBody').val())) {
				alert(navigator.userAgent);
				$('#entryBody').val(navigator.userAgent);
				$('#entryBody').blur();
			}
			///////////
			// INTRO //
			///////////
			if ($('#entryBody').val().length == 10 && /devintro/i.test($('#entryBody').val())) {
				var introLang = 'en';
				if ((langArray).test($('#entryBody').val().toLowerCase().split('devintro').join(''))) {
					introLang = $('#entryBody').val().split('devintro').join('');
				}
				//text
				var introValue = '';
				introValue += LANG.INTRO_SLIDE_1[introLang] + '\n';
				introValue += LANG.INTRO_SLIDE_2[introLang] + '\n';
				introValue += LANG.INTRO_SLIDE_3[introLang] + '\n';
				introValue += LANG.INTRO_SLIDE_4[introLang] + '\n';
				introValue += LANG.INTRO_SLIDE_5[introLang] + '\n';
				introValue += LANG.INTRO_SLIDE_6[introLang] + '\n';
				//output
				console.log(introValue);
				alert(introValue);
				//reset
				$('#entryBody').val('devintro');
				$('#entryBody').blur();
			}
			////////////
			// DUMPDB //
			////////////
			if (/devdumpnames/i.test($('#entryBody').val())) {
				var rowsArray = app.rows.food;
				var rowsHtml = '';
				for(var i=0, len=rowsArray.length; i<len; i++) {
					
					rowsHtml += rowsArray[i].name + '<br>\n';
					//if(rowsArray[i].term) {
					//	delete rowsArray[i].term;
					//}
					//if(rowsArray[i].name) {
					//	console.log(JSON.stringify(rowsArray[i].name);
						//delete rowsArray[i].term;
					//}
				}
				$('#entryBody').val('devdumpd');
				$('#entryBody').blur();
				$('body').html(rowsHtml);
				//console.log(JSON.stringify(rowsArray));
			}
			/////////////////
			// DEVLANGPAIR //
			/////////////////
			if (/devlangpair/i.test($('#entryBody').val())) {
				var targetLang = $('#entryBody').val().split('devlangpair').join('');
				$('#entryBody').val($('#entryBody').val().split('devlangpair').join('devlangpai'));
				$('#entryBody').blur();
				var LANGa = LANG;
				delete LANGa.HELP_TOPICS_ARRAY;
				$.each(LANGa, function (key, value) {
					$.each(value, function (key, subvalue) {
						if (!key.contains('en') && !key.contains(targetLang)) {
							delete value[key];
						}
					});
				});
				alert('dumped: ' + targetLang);
				console.log(JSON.stringify(LANGa));
			}
			////////////
			// REWIPE //
			////////////
			if (/devrewipe/i.test($('#entryBody').val())) {
				deSetup();
				$('#entryBody').val('');
				$('#entryBody').blur();
				afterHide();
				return false;
			}
		}
	});
	///////////////
	// CLEAR ALL //
	///////////////
	app.handlers.activeRow('#entryListBottomBar','activeRow',function() {
		//CONFIRM DIALOG
		appConfirm(LANG.CLEAR_ALL_TITLE[lang], LANG.ARE_YOU_SURE[lang],function(button) {
			if(button === 2) {
				clearEntries(function() {
					app.exec.updateEntries();
					$(window).trigger('orientationchange');
					return false;
				});
			}
		}, LANG.OK[lang], LANG.CANCEL[lang]);
	},function() {
		//CALLBACK CONDITION
		if($('#entryList div').is(':animated') || $('.editableInput').is(':visible')) {
			return false;
		}
	});
	//#//////////////////#//
	//# FOOD SEARCH ICON #//
	//#//////////////////#//
	$('#entryBodySearch').on(touchstart,function(evt) {
		if($('#entryBody').is(':focus') || $('#entryTime').is(':focus') || evt.target.id == 'entryTime') {
			return;
		}
		evt.preventDefault();
		evt.stopPropagation();
		$('#timerDailyInput').blur();
		$('#entryTime').blur();
		$('#entryBody').blur();
		$(document).trigger('pageReload');
	});
	$('#entryListForm,#go,#entryListWrapper').click(function(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		if($('#entryBody').is(':focus') && evt.target.id == 'entryTime') {
			$('#entryTime').focus();
		} else if($('#entryTime').is(':focus') && evt.target.id == 'entryBody') {
			$('#entryBody').focus();
		} else if(evt.target.id != 'entryTime' && evt.target.id != 'entryBody') {
			if($('#timerDailyInput').is(':focus')) {
				$('#timerDailyInput').blur();
			}
			$('#entryTime').blur();
			$('#entryBody').blur();
		}
	});
	////////////////////////
	// QUICK FOCUS INPUTS //
	////////////////////////
	$('#entryBody').on(touchstart, function(evt) {
		//allow text select (ios)
		if($('#entryBody').is(':focus')) {
			//evt.preventDefault();
		} else {
			//critical re-keyboarding entrybody/entrytime
			if(!app.device.android) {
				evt.preventDefault();
			}
			evt.stopPropagation();
		}
		//android keyboard focus
		if(app.device.android) {
			$('#entryBody').focus();
		}
		if(!$('#entryBody').is(':focus') && !$('.delete').is(':visible')) {
			//ios, switch blur entrytime > entrybody || kitkat non-selectable focus
			if(app.device.ios) {
				evt.preventDefault();
			}
			$('#entryBody').focus();
		}
	});
	$('#entryTime').on(touchstart, function(evt) {
		//evt.preventDefault();
		evt.stopPropagation();	
		if(!$('#entryTime').is(':focus') && !$('.delete').is(':visible')) {
			if(!app.device.android && !app.device.windows8) {
				evt.preventDefault();
			}
			$('#entryTime').focus();
		}
		//force hide keyboard
		if(app.device.firefoxos) {
			$('#entryTime').on(touchstart,function() {
				evt.preventDefault();
				$('#entryBody').blur();
			});
		}
	});
	////////////////////////////////
	// IOS EASY FOCUS SUPERBORDER //
	////////////////////////////////
	if(app.device.ios) {
		$('#entryTime').focus(function(evt) {
			$('#entryBody').removeClass('focusMy');
			$('#entryBody').addClass('focusMe');
		});
		$('#entryBody').focus(function(evt) {
			$('#entryBody').removeClass('focusMe');
			$('#entryBody').addClass('focusMy');
		});	
		$('#entryTime,#entryBody').blur(function(evt) {
			$('#entryBody').removeClass('focusMe focusMy');
		});
	}
	//////////////////////////////
	// FIX KEYBOARD PROPAGATION //
	//////////////////////////////
	$('#entryListForm,#go').on(touchstart, function(evt) {
		app.globals.XLock = 0;
		app.globals.MX    = 0;
		app.globals.MY    = 500;
		if(evt.target.id != 'entryTime' && evt.target.id != 'entryBody') {
			if($('#entryTime').is(':focus') || $('#entryBody').is(':focus')) {
				//block re-keyboarding on dismiss
				evt.preventDefault();
				evt.stopPropagation();
				$('#entryBody').blur();
				$('#entryTime').blur();
			}
		}
	});
	//#/////////////#//
	//# DIARY NOTES #//
	//#/////////////#//
	$('#diaryNotes').on(touchstart, function(evt) {
		if($('#diaryNotesWrapper').length) { return; }
		//no overlap
		if($('#pageSlideFood').length || $('input,select').is(':focus') || $('.delete').hasClass('active') || $('#entryList div').is(':animated')) {
			$('#go').trigger(touchend);
			return;
		}
		//show
		$('#diaryNotesWrapper').remove();
		$('body').append('<div id="diaryNotesWrapper"><div id="diaryNotesButton"></div><textarea id="diaryNotesInput"></textarea><div id="diaryCloser"></div></div>');
		//load content
		if(app.read('appNotes')) {
			$('#diaryNotesInput').val(app.read('appNotes'));
		}
		//focus
		if(!app.device.wp8) {
			$('#diaryNotesInput').focus();
		}
		$('#diaryNotesInput').height($('body').height() - 32);
		$('#diaryNotesInput').width($('body').width() - 24);
		//load scroller & set window < height
		getNiceScroll('#diaryNotesInput',200,function() {
			$('#diaryNotesInput').height($('body').height() - 32);				
		});
		//cancel drag for non-overflow
		$('#diaryNotesInput').on(touchmove, function(evt) {
			if($('.nicescroll-rails').is(':visible')) { 
			//
			} else {
				evt.preventDefault();
				evt.stopPropagation();
			}
		});
		//fix android 4.4 scrolling bug
		if(app.device.android) {
			$('#diaryNotesInput').click(function(evt) {
				var notesScroll = $('#diaryNotesInput').scrollTop();
				//allow toolbar select
				if(Math.abs(lastScreenResize - lastScreenSize) > 48) {
					$('#diaryNotesInput').blur();
				}
				$('#diaryNotesInput').focus();
				$('#diaryNotesInput').scrollTop(notesScroll);
			});
		}
		//mostly ios focus re-scrolling fix
		$('#diaryNotesInput').on('focus', function(evt) {
			//window.scroll($('#diaryNotesInput').scrollTop,0,0);
			$('#diaryNotesInput').scrollTop($('#diaryNotesInput').scrollTop());
			$('#diaryNotesInput').height($('body').height() - 32);
			if($.nicescroll) {
				$('#diaryNotesInput').getNiceScroll().resize();	
			}
			setTimeout(function() {
				kickDown('#diaryNotesInput');
				//$('#diaryNotesInput').scrollTop($('#diaryNotesInput').scrollTop());
				$('#diaryNotesInput').height($('body').height() - 32);
				if($.nicescroll) {
					$('#diaryNotesInput').getNiceScroll().resize();	
				}
			},100);
		});
		//trigger resize (ios 7.1)
		$('#diaryNotesInput').on('blur',function(){
			$(window).trigger('resize');
		});
		$('#diaryNotesInput').on('focus',function(){
			$(window).trigger('resize');
		});
		//kb closer
		$('#diaryCloser').click(function(evt) {
			evt.preventDefault();
			evt.stopPropagation();
			$('body').append('<input type="number" id="dummyInput" style="opacity: 0.001;" />');
			$('#dummyInput').focus();
			$('#dummyInput').blur();
			$('#dummyInput').remove();
			return false;
		});
		//keypress save
		$('#diaryNotesInput').on('keypress', function(evt) {
			app.save('appNotes',$('#diaryNotesInput').val());
			$('#diaryNotesInput').height($('body').height() - 32);
			if($.nicescroll) {
				$('#diaryNotesInput').getNiceScroll().resize();
			}
		});
		//////////////////
		// notes closer //
		//////////////////
		var closeAction = $('body').hasClass('android2') ? 'click' : touchstart;
		$('#diaryNotesButton').on(closeAction,function(evt) {
			evt.preventDefault();
			evt.stopPropagation();
			$('#diaryNotesInput').off();
			if($('#diaryNotesInput').is(':focus')) {
				$('#diaryNotesInput').blur();
			}
			app.save('appNotes',$('#diaryNotesInput').val());
			$('#appHeader, #appContent').css('pointer-events','none');
			$('#diaryNotesWrapper').css(prefix + 'transition-duration','.2s');
			$('#diaryNotesWrapper').css(prefix + 'transition-timing-function','linear');
			setTimeout(function() {
				$('#diaryNotesWrapper').css('opacity', 0);
			}, 0);
			setTimeout(function() {
				$('#diaryNotesWrapper').remove();
				$('#appHeader, #appContent').css('pointer-events','auto');
				setPush();
			}, 400);
		});
	});
	//////////////////////
	// SLIDER ENDSCROLL //
	//////////////////////
	app.globals.topLock = 0;
	$('#appContent').scroll(function() {
		blockModal = true;
		clearTimeout(app.globals.topTimer);
		app.globals.topTimer = setTimeout(function() {
			blockModal = false;
			//HEIGHT
			var entryListHeight = $('#entryList').height() * 0.5;
			if(app.globals.topLock != 0)         { return; }
			if($('#go').hasClass('scrolled')) { return; }
			if($('#appContent').scrollTop()+500 > entryListHeight) {
				app.globals.topLock = 1;
				$('#go').addClass('scrolled');
				app.exec.updateEntries('','full');
			}
			//FIX
			android2Select();
		},300);
	});
};
/*##############################
## HTML BUILDS ~ OPEN PROFILE ##
##############################*/
app.tab.profile = function(keepOpen) {
//RAW HTML
var profileHtml = '\
<a name="top"></a>\
<div id="calcForm">\
	<form id="formc" name="formc" action="" method="post">\
		<!--<h2>Calories Per Day Calculator</h2>-->\
		<div class="calcRow">\
			<label>' + LANG.YOUR_GENDER[lang] + '</label>\
    		<span class="selectArrow">\
				<select id="pA1B" tabindex="1" onchange="recalc_onclick(&#39;pA1B&#39;)" size="1" name="pA1B">\
					<option value="Male" selected="selected">' + LANG.MALE[lang] + '</option>\
					<option value="Female">' + LANG.FEMALE[lang] + '</option>\
				</select>\
			</span>\
		</div>\
		<div class="calcRow">\
			<label>' + LANG.YOUR_HEIGHT[lang] + '</label>\
			<input type="hidden" class="ee101" id="pA2B" tabindex="2" size="8" value="70" name="pA2B" />\
			<input type="number" tabindex="2" id="feet" name="feet" value="5"><input tabindex="2" type="number" id="inches" name="inches" value="10" size="2">\
		    <span class="selectArrow">\
				<select id="pA2C" tabindex="3" onchange="recalc_onclick(&#39;pA2C&#39;)" name="pA2C">\
					<option value="centimetres">' + LANG.CENTIMETERS[lang] + '</option>\
					<option value="inches" selected="selected">' + LANG.FEET_INCHES[lang] + '</option>\
				</select>\
			</span>\
			<input class="ee101" id="pA2D" type="hidden" readonly name="pA2D" />\
		</div>\
		<div class="calcRow">\
			<label>' + LANG.YOUR_WEIGHT[lang] + '</label>\
			<input type="number" id="pA3B" onblur="this.value=eedisplayFloat(eeparseFloat(this.value));recalc_onclick(&#39;pA3B&#39;)" tabindex="4" size="8" value="160" name="pA3B" />\
		    <span class="selectArrow">\
				<select id="pA3C" tabindex="5" onchange="recalc_onclick(&#39;pA3C&#39;)" size="1" name="pA3C">\
					<option value="kilograms">' + LANG.KILOGRAMS[lang] + '</option>\
					<option value="pounds" selected="selected">' + LANG.POUNDS[lang] + '</option>\
				</select>\
			</span>\
		    <input class="ee101" id="pA3D" type="hidden" readonly size="4" value="0" name="pA3D" />\
		</div>\
		<div class="calcRow">\
			<label>' + LANG.YOUR_AGE[lang] + '</label>\
	<span class="selectArrow"><select class="ee100" id="pA4B" tabindex="6" onchange="recalc_onclick(&#39;pA4B&#39;)" size="1" name="pA4B">\
		<option value="10">10</option>\
		<option value="11">11</option>\
		<option value="12">12</option>\
		<option value="13">13</option>\
		<option value="14">14</option>\
		<option value="15">15</option>\
		<option value="16">16</option>\
		<option value="17">17</option>\
		<option value="18">18</option>\
		<option value="19">19</option>\
		<option value="20" selected="selected">20</option>\
		<option value="21">21</option>\
		<option value="22">22</option>\
		<option value="23">23</option>\
		<option value="24">24</option>\
		<option value="25">25</option>\
		<option value="26">26</option>\
		<option value="27">27</option>\
		<option value="28">28</option>\
		<option value="29">29</option>\
		<option value="30">30</option>\
		<option value="31">31</option>\
		<option value="32">32</option>\
		<option value="33">33</option>\
		<option value="34">34</option>\
		<option value="35">35</option>\
		<option value="36">36</option>\
		<option value="37">37</option>\
		<option value="38">38</option>\
		<option value="39">39</option>\
		<option value="40">40</option>\
		<option value="41">41</option>\
		<option value="42">42</option>\
		<option value="43">43</option>\
		<option value="44">44</option>\
		<option value="45">45</option>\
		<option value="46">46</option>\
		<option value="47">47</option>\
		<option value="48">48</option>\
		<option value="49">49</option>\
		<option value="50">50</option>\
		<option value="51">51</option>\
		<option value="52">52</option>\
		<option value="53">53</option>\
		<option value="54">54</option>\
		<option value="55">55</option>\
		<option value="56">56</option>\
		<option value="57">57</option>\
		<option value="58">58</option>\
		<option value="59">59</option>\
		<option value="60">60</option>\
		<option value="61">61</option>\
		<option value="62">62</option>\
		<option value="63">63</option>\
		<option value="64">64</option>\
		<option value="65">65</option>\
		<option value="66">66</option>\
		<option value="67">67</option>\
		<option value="68">68</option>\
		<option value="69">69</option>\
		<option value="70">70</option>\
		<option value="71">71</option>\
		<option value="72">72</option>\
		<option value="73">73</option>\
		<option value="74">74</option>\
		<option value="75">75</option>\
		<option value="76">76</option>\
		<option value="77">77</option>\
		<option value="78">78</option>\
		<option value="79">79</option>\
		<option value="80">80</option>\
		<option value="81">81</option>\
		<option value="82">82</option>\
		<option value="83">83</option>\
		<option value="84">84</option>\
		<option value="85">85</option>\
		<option value="86">86</option>\
		<option value="87">87</option>\
		<option value="88">88</option>\
		<option value="89">89</option>\
		<option value="90">90</option>\
		<option value="91">91</option>\
		<option value="92">92</option>\
		<option value="93">93</option>\
		<option value="94">94</option>\
		<option value="95">95</option>\
		<option value="96">96</option>\
		<option value="97">97</option>\
		<option value="98">98</option>\
		<option value="99">99</option>\
		<option value="100">100</option>\
	</select></span>\
</div>\
<div class="calcRow" id="yourActivity">\
		<label>' + LANG.YOUR_ACTIVITY[lang] + '</label>\
		<span class="selectArrow"><select id="pA5B" tabindex="7" onchange="recalc_onclick(&#39;pA5B&#39;)" size="1" name="pA5B">\
			<option selected="selected" value="Sedentary (little or no exercise, desk job)">' + LANG.YOUR_ACTIVITY_OPTION1[lang] + '</option>\
			<option value="Lightly active (light exercise/sports 1-3 days/wk)">'              + LANG.YOUR_ACTIVITY_OPTION2[lang] + '</option>\
			<option value="Moderately active (moderate exercise/sports 3-5 days/wk)">'        + LANG.YOUR_ACTIVITY_OPTION3[lang] + '</option>\
			<option value="Very active (hard exercise/sports 6-7 days/wk)">'                  + LANG.YOUR_ACTIVITY_OPTION4[lang] + '</option>\
		</select></span>\
</div>\
<div class="invisible"><input type="checkbox" checked="checked" value="ON" name="automatic_recalc" /><label>Automatic recalculation</label></div>\
<div class="invisible"><input onclick="recalc_onclick(&#39;&#39;)" type="button" value="Recalculate" name="do_recalc" id="do_recalc" /></div>\
<div class="invisible"><label>BMR</label><input class="ee101" id="pA6B" readonly size="8" value="0" name="pA6B" /></div>\
<div class="invisible"><h2>Nutrition requirements</h2></div>\
\
<h2 id="mantain"><span>A.</span> ' + LANG.KEEP_WEIGHT[lang] + '</h2>\
<div class="tapSelect"><input class="ee101" id="pA7B" readonly size="7" value="0" name="pA7B" /><span class="bold">' + LANG.KCAL[lang] + ' / ' + LANG.DAY[lang] + '</span></div>\
<div class="invisible">Carbohydrates (55%)<input class="ee101" id="pA8B" readonly size="7" value="0" name="pA8B" />cal =<input id="pA8D" readonly size="6" value="0" name="pA8D" />gm</div>\
<div class="invisible">Proteins (15%)<input class="ee101" id="pA9B" readonly size="7" value="0" name="pA9B" />cal =<input id="pA9D2" readonly size="6" value="0" name="pA9D" />gm</div>\
<div class="invisible">Fats (30%)<input class="ee101" id="pA10B" readonly size="7" value="0" name="pA10B" />cal =<input class="ee101" id="pA10D2" readonly size="6" value="0" name="pA10D" />gm</div>\
\
<h2><span>B.</span> ' + LANG.LOSE_WEIGHT[lang] + '</h2>\
<div class="calcResult">\
   <span class="selectArrow"> <select class="ee101" id="pA6G" onchange="this.value=eedisplayFloat(eeparseFloat(this.value));recalc_onclick(&#39;pA6G&#39;)" tabindex="8" size="1" value="1" name="pA6G">\
		<option value="0">0</option>\
		<option value="0.25">0.25</option>\
		<option value="0.5">0.5</option>\
		<option value="0.75">0.75</option>\
		<option value="1" selected="selected">1</option>\
		<option value="1.25">1.25</option>\
		<option value="1.5">1.5</option>\
		<option value="1.75">1.75</option>\
		<option value="2">2</option>\
		<option value="2.25">2.25</option>\
		<option value="2.5">2.5</option>\
		<option value="2.75">2.75</option>\
		<option value="3">3</option>\
		<option value="3.25">3.25</option>\
		<option value="3.5">3.5</option>\
		<option value="3.75">3.75</option>\
		<option value="4">4</option>\
		<option value="4.25">4.25</option>\
		<option value="4.5">4.5</option>\
		<option value="4.75">4.75</option>\
		<option value="5">5</option>\
	</select></span>\
	<input class="ee101" id="pA6J2" type="hidden" readonly size="2" value="0" name="pA6J" />\
	<span class="selectArrow"><select id="pA6H" tabindex="9" onchange="recalc_onclick(&#39;pA6H&#39;)" size="1" name="pA6H">\
		<option value="kilograms">' + LANG.KILOGRAMS[lang] + '</option>\
		<option value="pounds" selected="selected">' + LANG.POUNDS[lang] + '</option>\
	</select></span>\
	<span>' + LANG.PER_WEEK[lang] + '</span>\
</div>\
<div class="tapSelect"><input class="ee101" id="pA7F" readonly size="7" value="0" name="pA7F" /><span class="bold">' + LANG.KCAL[lang] + ' / ' + LANG.DAY[lang] + '</span></div>\
<div class="invisible">Carbohydrates (55%)<input class="ee101" id="pA8F" readonly size="7" value="0" name="pA8F" />cal =<input class="ee101" id="pA8H2" readonly size="7" value="0" name="pA8H" />gm</div>\
<div class="invisible">Proteins (15%)<input class="ee101" id="pA9F" readonly size="7" value="0" name="pA9F" />cal =<input class="ee101" id="pA9H2" readonly size="7" value="0" name="pA9H" />gm</div>\
<div class="invisible">Fats (30%)<input class="ee101" id="pA10F" readonly size="7" value="0" name="pA10F" />cal =<input class="ee101" id="pA10H2" readonly size="7" value="0" name="pA10H" />gm</div>\
\
<h2><span>C.</span> ' + LANG.GAIN_WEIGHT[lang] + '</h2>\
<div class="calcResult">\
    <span class="selectArrow"><select class="ee101" id="pA6M" onchange="this.value=eedisplayFloat(eeparseFloat(this.value));recalc_onclick(&#39;pA6M&#39;)" tabindex="10" size="1" value="1" name="pA6M">\
		<option value="0">0</option>\
		<option value="0.25">0.25</option>\
		<option value="0.5">0.5</option>\
		<option value="0.75">0.75</option>\
		<option value="1" selected="selected">1</option>\
		<option value="1.25">1.25</option>\
		<option value="1.5">1.5</option>\
		<option value="1.75">1.75</option>\
		<option value="2">2</option>\
		<option value="2.25">2.25</option>\
		<option value="2.5">2.5</option>\
		<option value="2.75">2.75</option>\
		<option value="3">3</option>\
		<option value="3.25">3.25</option>\
		<option value="3.5">3.5</option>\
		<option value="3.75">3.75</option>\
		<option value="4">4</option>\
		<option value="4.25">4.25</option>\
		<option value="4.5">4.5</option>\
		<option value="4.75">4.75</option>\
		<option value="5">5</option>\
	</select></span>\
	<input class="ee101" id="pA6O2" type="hidden" readonly size="2" value="0" name="pA6O" />\
	<span class="selectArrow"><select id="pA6N" tabindex="11" onchange="recalc_onclick(&#39;pA6N&#39;)" size="1" name="pA6N">\
		<option value="kilograms">' + LANG.KILOGRAMS[lang] + '</option>\
		<option value="pounds" selected="selected">' + LANG.POUNDS[lang] + '</option>\
	</select></span>\
	<span>' + LANG.PER_WEEK[lang] + '</span>\
</div>\
<div class="tapSelect"><input class="ee101" id="pA7L" readonly size="7" value="0" name="pA7L" /><span class="bold">' + LANG.KCAL[lang] + ' / ' + LANG.DAY[lang] + '</span></div>\
\
<div class="invisible">Carbohydrates (55%)<input class="ee101" id="pA8L" readonly size="7" value="0" name="pA8L" />cal =<input class="ee101" id="pA8N2" readonly size="7" value="0" name="pA8N" />gm</div>\
<div class="invisible">Proteins (15%)<input class="ee101" id="pA9L" readonly size="7" value="0" name="pA9L" />cal =<input class="ee101" id="pA9N2" readonly size="7" value="0" name="pA9N" />gm</div>\
<div class="invisible">Fats (30%)<input class="ee101" id="pA10L" readonly size="7" value="0" name="pA10L" />cal =<input class="ee101" id="pA10N2" readonly size="7" value="0" name="pA10N" />gm</div>\
</form>\
</div>';
//#////////#//
//# OUTPUT #//
//#////////#//
preTab(keepOpen);
$('#appContent').html(profileHtml);
afterTab(keepOpen);
//////////////////////////
// FIX ANDROID 2 SELECT //
//////////////////////////
android2Select();
var topLocko = 0;
var topTimero;
$('#appContent').scroll(function() {
	clearTimeout(topTimero);
	topTimero = setTimeout(function() {
		android2Select();
	},100);
});
//#//////////#//
//# HANDLERS #//
//#//////////#//
//enforce onchange
$('#pA2B').on('blur',function(evt) {
	$('#pA2B').val( eedisplayFloat(eeparseFloat( $(this).val() )) );
	recalc_onclick('pA2B');
	writeCalcValues();
});
$('#pA2B').on('change keypress',function(evt) {
	$('#pA2B').val( (Number($('#feet').val())*12)  +  Number($('#inches').val()) );
	writeCalcValues();
});
$('#inches').on('change keypress',function(evt) {
	$('#pA2B').val( Number(($('#feet').val()*12))  +  Number($('#inches').val()) );
	writeCalcValues();
});
$('#feet').on('change keypress',function(evt) {
	$('#pA2B').val( Number(($('#feet').val()*12))  +  Number($('#inches').val()) );
	writeCalcValues();
});
/////////////////////
// CORE VALIDATION //
/////////////////////
app.handlers.validate('#feet',{maxLength:2,maxValue:99});
app.handlers.validate('#inches,#pA3B',{maxLength:3,maxValue:999});
///////////////
// TAP VALUE //
///////////////
var tapVar;
$('#pA7B,#pA7F,#pA7L').on('focus', function(evt) {
	tapVar = this;
	setTimeout(function(){ if(tapVar) { tapVar.blur(); } },1);
	if(app.device.windows8 || (app.device.android && app.device.android < 4)) {
		$('body').append('<input type="number" id="dummyInput" style="opacity: 0.001;" />');
		$('#dummyInput').focus();
		$('#dummyInput').blur();
		$('#dummyInput').remove();
	}
});
//KEYBOARD PREVENT
if(app.device.firefoxos) {
	$('#pA7B,#pA7F,#pA7L').on(touchstart, function(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		$(this).trigger(tap);
		return false;
	});
}
///////////////
// TAP VALUE //
///////////////
app.handlers.activeRow('#pA7B,#pA7F,#pA7L','active',function(thisId) {
	//RELOAD INFO HTML
	var calcResult = Math.round($('#' + thisId).val());
	//check n'updt
	if(calcResult >= 100 && calcResult <= 9999) {
		app.save(app.get.kcals('key'),calcResult);
		$('#timerDailyInput').val(app.read(app.get.kcals('key')));
		//HIGHLIGH INPUT
		$('#timerDailyInput').css(prefix + 'transition-duration','0s');
		$('#timerDailyInput').css('color','rgba(255,255,255,1');
		setTimeout(function() {
			$('#timerDailyInput').css(prefix + 'transition-duration','.3s');
			$('#timerDailyInput').css('color','rgba(255,255,255,.72');
		},200);
		//HIGHLIGHT
		$('#' + thisId).addClass('tapActive');
		$('#' + thisId).stop().animate({ backgroundColor: 'rgba(255,255,0,0.2)' }, 1).animate({ backgroundColor: 'rgba(255,255,255,0.2)' }, 450);
		setTimeout (function() { $('#pA7B,#pA7F,#pA7L').removeClass('tapActive'); }, 200);
		updateTimer();
	} else {
		//shake error
		$('#' + thisId).addClass('tapActive');
		setTimeout (function() { $('#pA7B,#pA7F,#pA7L').removeClass('tapActive'); }, 400);
		$('#' + thisId).stop().parent('div').effect('shake',{times:3,direction:'left',distance:6}, 300);
	}
});
//////////////////////////////
// BLUR ON NULL ID TOUCHEND //
//////////////////////////////
//wp8 pan (quick drop)
$('#calcForm input, #calcForm select').on('blur',function(evt) {
	if(app.device.wp8) {
		kickDown('#appContent');
		return false;
	}
});
$('#calcForm').on(touchend, function(evt) {
	if(evt.target.id == '') {
		evt.preventDefault();
		if(app.device.ios) {
			evt.stopPropagation();
		}
		//PROTECT FROM CALCULATOR BLUR SLOWDOWN
		if($('#calcForm input').is(':focus') || $('#calcForm select').is(':focus')) {
			$('#calcForm input').each(function(evt) {
				if($(this).is(':focus') && vendorClass != 'moz') {
					$(this).blur();
				}
			});
			$('#calcForm select').each(function(evt) {
				if($(this).is(':focus') && vendorClass != 'moz') {
					$(this).blur();
				}
			});
		}
	}
});
/////////////////////////////
// SELECT MEASURE SWITCHER //
/////////////////////////////
$('#formc select').on(touchstart,function(evt) {
	var thisInput = this;
	if(/male|inches|pounds|centimetres|kilograms/i.test($(this).val())) {
		evt.preventDefault();
		evt.stopPropagation();
		$(thisInput).attr('readonly','readonly');
		$(thisInput).attr('disabled','disabled');
		setTimeout(function() {
			$(thisInput).removeAttr('disabled');
			$(thisInput).removeAttr('readonly','readonly');
		},0);
	}
	//prevent drag
	if(app.is.scrollable && app.device.desktop) {
		evt.stopPropagation();
	}
});
$('#formc select').focus(function(evt) {
	var thisInput = this;
	if(/male|inches|pounds|centimetres|kilograms/i.test($(this).val())) {
		evt.preventDefault();
		evt.stopPropagation();
		$(thisInput).removeAttr('disabled');
		$(thisInput).removeAttr('readonly','readonly');
		$(thisInput).blur();
	}
});
$('#formc select').on(touchend,function(evt) {
	//kitkat focus
	if(app.device.android && app.device.android < 4.4) {
		evt.preventDefault();
	}
	evt.stopPropagation();
	var thisInput = this;
	setTimeout(function() {
		$(thisInput).removeAttr('disabled');
		$(thisInput).removeAttr('readonly','readonly');
	},400);
	if(evt.target.id == 'pA1B') {
		$(this).attr('readonly','readonly');
		$(this).attr('disabled','disabled');
		var gender = app.read('calcForm#pA1B','Male') ? 'Female' : 'Male';
		app.save('calcForm#pA1B',gender);
		//GENERIC
		//feetInchesToMetric();
		loadCalcValues();
		$('#do_recalc').trigger('click');
		writeCalcValues();
		setPush();
		return false;
	} else if(/inches|pounds/.test($(this).val())) {
		$(this).attr('readonly','readonly');
		$(this).attr('disabled','disabled');
		app.save('config_measurement','metric');
		app.save('calcForm#pA2C','centimetres');
		app.save('calcForm#pA3C','kilograms');
		app.save('calcForm#pA6H','kilograms');
		app.save('calcForm#pA6N','kilograms');
		//GENERIC
		loadCalcValues();
		//feetInchesToMetric();
		$('#pA2C').change();
		$('#do_recalc').trigger('click');
		writeCalcValues();
		setPush();
		return false;
	} else if(/centimetres|kilograms/.test($(this).val())) {
		$(this).attr('readonly','readonly');
		$(this).attr('disabled','disabled');
		app.save('config_measurement','imperial');
		app.save('calcForm#pA2C','inches');
		app.save('calcForm#pA3C','pounds');
		app.save('calcForm#pA6H','pounds');
		app.save('calcForm#pA6N','pounds');
		//GENERIC
		loadCalcValues();
		feetInchesToMetric();
		$('#do_recalc').trigger('click');
		writeCalcValues();
		setPush();
		return false;
	}
});
//////////////////////
// ONCHANGE TRIGGER //
//////////////////////
// PREVENT INITIAL TAB-SYNC
var trackProfile = 0;
setTimeout(function() {
	trackProfile = 1;
},200);
$('#formc input').on('change',function() {
	$('#do_recalc').trigger('click');	
	writeCalcValues();
	if(trackProfile == 1) {
		setPush();
	}
});
$('#formc select').on('change',function() {
	$('#do_recalc').trigger('click');
	writeCalcValues();
	setPush();
});
$('#formc input').on('blur',function() {
	$('#do_recalc').trigger('click');
	writeCalcValues();
	setPush();
});
$('#formc select').on('blur',function() {
	$('#do_recalc').trigger('click');
	writeCalcValues();
	setPush();
});
$('#formc input').on('keyup',function() {
	writeCalcValues();
});
///////////////////
// WRITE CHANGES //
///////////////////
function writeCalcValues() {
	var preffix = 'calcForm';
	//male/female
	app.save(preffix + '#pA1B',$('#pA1B').val());
	//height (hidden)
	if(!isNaN(parseInt($('#pA2B').val()))) {
		$('#pA2B').val( Math.abs(parseInt($('#pA2B').val())) );
		app.save(preffix + '#pA2B',parseInt($('#pA2B').val()));
	}
	//cm/in
	app.save(preffix + '#pA2C',$('#pA2C').val());
	//weight
	if(!isNaN(parseInt($('#pA3B').val()))) {
		$('#pA3B').val( Math.abs(parseInt($('#pA3B').val())) );
		app.save(preffix + '#pA3B',parseInt($('#pA3B').val()));
	}
	//kg/lb
	app.save(preffix + '#pA3C',$('#pA3C').val());
	//age
	app.save(preffix + '#pA4B',$('#pA4B').val());
	//activity
	app.save(preffix + '#pA5B',$('#pA5B').val());
	//weight
	app.save(preffix + '#pA6G',$('#pA6G').val());
	//measure
	app.save(preffix + '#pA6H',$('#pA6H').val());
	//gain weight
	app.save(preffix + '#pA6M',$('#pA6M').val());
	//measure
	app.save(preffix + '#pA6N',$('#pA6N').val());
	//measure
	if(!isNaN(parseInt($('#feet').val()))) {
		$('#feet').val( Math.abs(parseInt($('#feet').val())) );
		app.save(preffix + '#feet',parseInt($('#feet').val()));
	}
	if(!isNaN(parseInt($('#inches').val()))) {
		$('#inches').val( Math.abs(parseInt($('#inches').val())) );
		app.save(preffix + '#inches',parseInt($('#inches').val()));	
	}
}
/////////////////
// LOAD VALUES //
/////////////////
function loadCalcValues() {
	var preffix = 'calcForm';
	//check
	if(app.read(preffix + '#pA1B')) {
		//male/female
		$('#pA1B').val(app.read(preffix + '#pA1B'));
		//height
		$('#pA2B').val(app.read(preffix + '#pA2B'));
		//cm/in
		$('#pA2C').val(app.read(preffix + '#pA2C'));
		//weight
		$('#pA3B').val(app.read(preffix + '#pA3B'));
		//kg/lb
		$('#pA3C').val(app.read(preffix + '#pA3C'));
		//age
		$('#pA4B').val(app.read(preffix + '#pA4B'));
		//activity
		$('#pA5B').val(app.read(preffix + '#pA5B'));
		//weight
		$('#pA6G').val(app.read(preffix + '#pA6G'));
		//measure
		$('#pA6H').val(app.read(preffix + '#pA6H'));
		//gain weight
		$('#pA6M').val(app.read(preffix + '#pA6M'));
		//measure
		$('#pA6N').val(app.read(preffix + '#pA6N'));
		//measure
		$('#feet').val(app.read(preffix + '#feet'));
		$('#inches').val(app.read(preffix + '#inches'));	
	}
	//recalc
	$('#do_recalc').trigger('click');
}
//go
loadCalcValues();
//////////////////////
// SWAP FEET/INCHES //
//////////////////////
function feetInchesToMetric() {
	if($('#pA2C').val() == 'centimetres') {
		$('#feet').removeClass('imperial');
		$('#inches').removeClass('imperial');
		$('#feet').addClass('metric');
		$('#inches').addClass('metric');
	} else {
		$('#feet').removeClass('metric');
		$('#inches').removeClass('metric');
		$('#feet').addClass('imperial');
		$('#inches').addClass('imperial');
	}
	//fix conversion
	loadCalcValues();
	//////////////////
	// AUTO CONVERT //
	//////////////////
	var calcInches = Number($('#inches').val());
	var calcFeet   = Number($('#feet').val());
	///////////////
	// TO METRIC //
	///////////////
	if($('#pA3C').val() == 'kilograms') {
		//TO KG
		$('#pA3B').val( Math.round($('#pA3B').val()*0.454) );
		//TO CM
		$('#inches').val( Math.round(((calcFeet*12) + calcInches) * 2.54) );
		$('#feet').val(0);
	/////////////////
	// TO IMPERIAL //
	/////////////////
	} else {
		//TO LB
		$('#pA3B').val(  Math.round($('#pA3B').val()/0.454) );
		//TO FT/IN
		calcInches = calcInches/2.54;
		//MAKE FEET
		while(calcInches >= 12) {
			calcInches = calcInches-12;
			calcFeet   = calcFeet+1;
		}
		$('#feet').val(calcFeet);
		$('#inches').val(Math.round(calcInches));
	}
	//glitch
	$('#pA2B').change();
}
$('#pA2C').on('change',function(evt) {
	feetInchesToMetric();
	$('#pA2B').val(  Number($('#inches').val())  );
	$('#pA2B').change();
	writeCalcValues();
});
if(document.getElementById('pA2C').value == 'centimetres') {
	$('#pA2B').val(  Number($('#inches').val())  );
	//
	$('#feet').removeClass('imperial');
	$('#inches').removeClass('imperial');
	$('#feet').addClass('metric');
	$('#inches').addClass('metric');
} else {
	$('#feet').removeClass('metric');
	$('#inches').removeClass('metric');
	$('#feet').addClass('imperial');
	$('#inches').addClass('imperial');		
}
/////////////
// ON LOAD //
/////////////
$('#pA2B').change();
writeCalcValues();
};

