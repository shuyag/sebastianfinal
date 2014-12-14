var BLOCKS_PER_HOUR = 2;
var BLOCK_LENGTH = 60/BLOCKS_PER_HOUR;
var BLOCK_HEIGHT = 40/BLOCKS_PER_HOUR;
var BLOCK_WIDTH = 52/BLOCKS_PER_HOUR;

var VIA_EMAIL = 0;
var VIA_LINK = 1;

function g(id, context) {
	if (context) 
		return context.document.getElementById(id);
	else
		return document.getElementById(id);
}


Date.prototype.getId = dateToString;
function dateToString(d, gmt) {
	if (!d) d = this;
	if (!d) return "";
	if (gmt)
		return ((d.getUTCMonth()+1) + "/" + d.getUTCDate() + "/" + d.getUTCFullYear());
	else
		return ((d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear());
}
function toggle(target, displayStyle) {
	if (!displayStyle) displayStyle = "block";
	var content = g(target);
	if (content == null)
		return;
			
	if (content.style.display == "none") {
		content.style.display = displayStyle;
	}
	else {
		content.style.display = "none";
	}
}

function getValue(id, returnInnerHtml) {
	var obj = g(id);
	if (!obj)
		return '';
	else if (obj.value)
		return obj.value;
	else if(returnInnerHtml && obj.innerHTML)
		return obj.innerHTML;
	else
		return '';
}

function setElementFocus(id) {
	var obj = g(id);
	if (!obj) return;
	if (obj.focus) obj.focus();
}

function setElementValue(id, v, setInnerHtml) {
	var obj = g(id);
	if (!obj) return;
	
	if (setInnerHtml && obj.innerHTML)
  	    obj.innerHTML = v;
	else
		obj.value = v;
		
}

function formatTimeFromDate(date, length_of_meridian) {
	return formatTimeFromHourMinute(date.getHours(), date.getMinutes(), length_of_meridian);
}

function formatTimeFromHourMinute(hour, minute, length_of_meridian) {
	
	if (length_of_meridian == 'none') {
		return hour + ':' + minute;
	}
	
	if (hour == 12 && minute == 0) {
		if (length_of_meridian == 2)
			return 'Noon';
		else
			return '12';
	}
	else if ( (hour == 24 || hour == 0) && minute == 0) {
		if (length_of_meridian == 2)
			return 'Midnight';
		else
			return '12';
	}
	
	
	if (length_of_meridian == 0)
		postfix = '';
	else {
		if (hour < 12 || hour >= 24)
			postfix = (length_of_meridian == 2) ? 'am' : 'a';
		else {
			postfix = (length_of_meridian == 2) ?'pm' : 'p';
		}
	}	
	
	if (hour > 24) {
		hour = hour - 24;
	}
	
	
	if (hour > 12) 
		hour = hour - 12;
		
	
	if (minute == 0)
		result = hour;
	else
		result = hour + ':' + minute;
	
	return result + postfix;
}

function formatTime(blockId, meridian) {
	
	var hour = Math.floor(blockId /BLOCKS_PER_HOUR);
	var minute = (blockId % BLOCKS_PER_HOUR) * BLOCK_LENGTH;

	return formatTimeFromHourMinute(hour, minute, meridian);
	
}

function createCopyOfDate(date, includeHoursMinutes) {
	var copyDate = new Date();
	copyDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
	if (includeHoursMinutes) {
		copyDate.setHours(date.getHours(), date.getMinutes());
	}
	return copyDate;
}

function convertBlockToDate(baseDate, blockId) {
	var hour = Math.floor(blockId / BLOCKS_PER_HOUR);
	var minute = (blockId % BLOCKS_PER_HOUR) * BLOCK_LENGTH;
	var copyDate = new Date();
	copyDate.setFullYear(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
	if (hour >= 24) {
	    copyDate.setDate(baseDate.getDate()+1);
		hour = hour - 24;
	}
	copyDate.setHours(hour, minute);
	return copyDate;
}


function formatDateTime(date, blockId, gmt) {
    var copyDate = convertBlockToDate(date, blockId);
	if (gmt) {
		return dateToString(copyDate) +  ' ' + copyDate.getUTCHours() + ':' + copyDate.getUTCMinutes();
	}
	else {
		return dateToString(copyDate) +  ' ' + copyDate.getHours() + ':' + copyDate.getMinutes();
	}
}



function toggleVisible(target) {
	var content = g(target);
	if (content == null)
		return;
			
	if (content.style.visibility == 'hidden') {
		content.style.visibility = 'visible';
	}
	else {
		content.style.visibility = 'hidden';
	}
}


function setVisible(layer_id, makeVisible) {
	if (!layer_id) return;	
	obj = g(layer_id);
	if (!obj) return;
	
	if (makeVisible)
		obj.style.visibility = 'visible';
	else
		obj.style.visibility = 'hidden';
}

function setDisplay(obj_id, displayAsBlock) {
	if (!obj_id) return;	
	obj = g(obj_id);
	if (!obj) return;
	
	if (displayAsBlock)
		obj.style.display = 'block';
	else
		obj.style.display = 'none';
}

function isVisible(id) {
	var obj = g(id);
	if (!obj) return false;
	if (obj.style.display == 'none' || obj.style.visibility == 'hidden')
		return false;
	else
		return true;
}



function goodday() {
	toggle('gd', 'inline');
	g('gd-link').className ='';
}


String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };

var _l = false;
function ld() {
	_l = true;
	try {if (self.afterLoad)afterLoad();}catch(x){}
} 


function setCookie(name, remove) {
	if (!name) return;
	if (remove)
		var url = '/remote/nocookie/' + name;
	else
		var url = '/remote/cookie/' + name;
	new ajax (url, {});
} 