var userName;
var loggedin = false;
var targetMenu;

$(document).ready(function () {
	$('.nav-item').click(function setiFrameURL(menuItem) {
		//if (menuItem.currentTarget.id == 'logout') {
		//	$('#sfContainer').attr('src', 'http://13.239.36.220/spotfire/rest/security/logout');
		//	loggedout = true;
		//} else {
		$('#sfContainer').attr('src', './sfContainer.html');
		//}
		targetMenu = menuItem.currentTarget;

		$('li').removeClass('active');
		targetMenu.classList.add('active');
	});

	function getUserName() {
		var url = window.location.href;
		var name = 'sf_custom_login_userName';  //name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);

		if (!results) return null;
		if (!results[2]) return '';

		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	userName = getUserName();
	$("#userName").text(' | Welcome ' + userName);

	var loggedout = false;
	var refresh = false;
	$('#sfContainer').on('load', function () {
		if (loggedout) {
			window.top.location.href = "/sflogin";
			return;
		}
		if (refresh) {
			varsfheader = $('#sfContainer').contents().find('#tss-header');
			if (varsfheader)
				varsfheader.remove();

			refresh = false;
			return;
		}
		refresh = true;

		var url = '#';
		if (!targetMenu || targetMenu.id == 'dashboard') {
			url = 'http://13.239.36.220/spotfire/wp/analysis';
		} else if (targetMenu.id == 'reports') {
			url = 'http://13.239.36.220/spotfire/wp/startPage#/libraryBrowser';
		} else if (targetMenu.id == 'logout') {
			url = 'http://13.239.36.220/spotfire/rest/security/logout/';
			loggedout = true;
		}

		if (loggedout) {
			$('#sfContainer').contents().find('#sf_custom_login_userName').remove();
			$('#sfContainer').contents().find('#file').remove();
		} else {
			$('#sfContainer').contents().find('#sf_custom_login_userName').val(userName);
		}

		$('#sfContainer').contents().find('#sfauth').attr('action', url);
		$('#sfContainer').contents().find('#sfauth').submit();
	});
});
