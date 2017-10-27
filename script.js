// get input objects
var username = document.forms['registrationForm']['username'];
var email = document.forms['registrationForm']['email'];
var password = document.forms['registrationForm']['password'];
var duplicate = document.forms['registrationForm']['duplicate'];
var boxbot = document.forms['registrationForm']['boxbot'];

// get error objects
var username__error = document.getElementById('username__error');
var email__error = document.getElementById('email__error');
var password__error = document.getElementById('password__error');
var duplicate__error = password__error;
var boxbot__error = document.getElementById('boxbot__error');

// set event listeners
username.addEventListener('blur', usernameVerify, true);
email.addEventListener('blur', emailVerify, true);
password.addEventListener('blur', passwordVerify, true);
duplicate.addEventListener('blur', duplicateVerify, true);
boxbot.addEventListener('blur', boxbotVerify, true);

// set conditions for validation
var username__length = 5;
var password__length = 8;
var username__regex = /^([a-zA-Z0-9]{1,})(\w|-|_)+([a-zA-Z0-9]{1,})$/;
var email__regex = /^([a-z0-9])(\w|[.]|-|_)+([a-z0-9])@([a-z0-9])([a-z0-9.-]*)([a-z0-9])([.]{1})([a-z]{2,7})$/;
var password__regex = /^([a-zA-Z0-9]{1,})$/;

// validation borders
var errorBorder = '1px solid red';
var validBorder = '1px solid #5e6e66';

// set border and label change actions
function returnError(field, error, message) {
	field.style.border = errorBorder;
	error.textContent = message;
	field.focus();
}
function returnValid(field, error) {
	field.style.border = validBorder;
	error.innerHTML = '';
}

// check for invalid input
function Validate() {

	// check the username
	if (username.value == '') {		// for empty
		returnError(username, username__error, 'Username is required');
		return false;
	} else if (username.value.length < username__length) {		// for minimum length
		returnError(username, username__error, 'Username should be at least 5 characters)');
		return false;
	} else if (!username__regex.test(username.value)) {		// for disallowed characters
		returnError(username, username__error, 'Username should consist only of letters and numbers and may be separated by a dash or an underline');
		return false;
	}

	// check the email
	if (email.value == '') {		// for empty
		returnError(email, email__error, 'Email is required');
		return false;
	} else if (!email__regex.test(email.value)) {		// for disallowed characters
		returnError(email, email__error, 'Please enter a valid email');
		return false;
	}

	// check the password
	if (password.value == '') {		// for empty
		returnError(password, password__error, 'Password is required');
		return false;
	} else if (password.value.length < password__length) {		// for minimum length
		returnError(password, password__error, 'Password should be at least 8 characters)');
		return false;
	} else if (!password__regex.test(password.value)) {		// for disallowed characters
		returnError(password, password__error, 'Password should consist only of letters and numbers');
		return false;
	}

	// check the duplicate
	if (duplicate.value !== password.value) {		// for mismatching content
		password.style.border = errorBorder;
		returnError(duplicate, duplicate__error, 'Passwords do not match');
		return false;
	}

	// check the boxbot
	if (!boxbot.checked) {		// for being forgotten
		returnError(boxbot, boxbot__error, 'A Boxbot is not allowed to register');
		return false;
	}
}

// check for valid input
function usernameVerify() {
	if (username__regex.test(username.value) && username.value.length >= username__length) {
		returnValid(username, username__error);
		return true;
	}
}
function emailVerify() {
	if (email__regex.test(email.value)) {
		returnValid(email, email__error);
		return true;
	}
}
function passwordVerify() {
	if (password__regex.test(password.value) && password.value.length >= password__length) {
		returnValid(password, password__error);
		return true;
	}
}
function duplicateVerify() {
	if (duplicate.value===password.value) {
		password.style.border = validBorder;
		returnValid(duplicate, duplicate__error);
		return true;
	}
}
function boxbotVerify() {
	if (boxbot.checked) {
		returnValid(username, username__error);
		return true;
	}
}

// ajax call
// function myFunction()
// {
// 	var elements = document.getElementsByClassName("formInput");
// 	var formData = new FormData(); 
// 	for(var i=0; i<elements.length; i++) {
// 		formData.append(elements[i].name, elements[i].value);
// 	}
// 	var xmlHttp = new XMLHttpRequest();
// 	xmlHttp.onreadystatechange = function() {
// 		if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
// 			alert(xmlHttp.responseText);
// 		}
// 	}
// 	xmlHttp.open("post", "server.php"); 
// 	xmlHttp.send(formData); 
// }