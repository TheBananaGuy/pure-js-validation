<?php
function registrationCorrect() {
	if ($_POST['username'] == "") return false;
	if ($_POST['email'] == "") return false;
	if ($_POST['password'] == "") return false;
	if ($_POST['duplicate'] == "") return false;
	if ($_POST['boxbot'] != "acceptYourFate") return false;
	if (strlen($_POST['username']) < 5) return false;
	if (strlen($_POST['password']) < 8) return false;
	if (!preg_match('/^([a-zA-Z0-9]{1,})(\w|-|_)+([a-zA-Z0-9]{1,})$/is', $_POST['username'])) return false;
	if (!preg_match('/^([a-z0-9])(\w|[.]|-|_)+([a-z0-9])@([a-z0-9])([a-z0-9.-]*)([a-z0-9])([.]{1})([a-z]{2,7})$/is', $_POST['email'])) return false;
	if (!preg_match('/^([a-zA-Z0-9]{1,})$/is', $_POST['password'])) return false;
 	if ($_POST['password'] != $_POST['duplicate']) return false;
	$login = $_POST['username'];
	$rez = mysql_query("SELECT * FROM users WHERE login=$login");
	if (@mysql_num_rows($rez) != 0) return false;
	return true;
}
?>