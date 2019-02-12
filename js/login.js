$(document).ready(function () {
	$("#login").click(function () {
		var email = $("#email").val();
		var password = $("#password").val();

		var isValid = true;

		if (email == '') {
			$('input[type="email"]').css("border", "2px solid red");
			isValid = false;
		}

		if (password == '') {
			$('input[type="password"]').css("border", "2px solid red");
			isValid = false;
		}

		if (!isValid) {
			alert("Please enter all fields");
			return;
		}

		// Checking for blank fields.
		var data = "email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password) + "&grant_type=password&application=webportal";
		$.ajax({
			url: "https://staging.api.mygameday.app/accounts/login",
			type: "POST",
			contentType: "application/x-www-form-urlencoded", // send as JSON
			headers: { "x-api-key": "FVudnKY5Xl49zDiXtLsn39CAkNdUyDDja4iDQeyj" },
			context: document.body,
			data: data,

			complete: function (res, status, xhr) {
				//called when complete
			},

			success: function (res, status, xhr) {
				var sfuserName = res.userid;
				//alert(sfuserName);
				$("#sf_custom_login_userName").val(sfuserName);
				$("#sfauth").submit();
			},

			error: function (res, status, xhr) {
				alert(res.responseText);
			},
		});
	});
});
