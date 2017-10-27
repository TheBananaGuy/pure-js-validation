<!DOCTYPE html>
<html>

<?php

include_once('dbconn.php');

include_once('regcheck.php');


$_SESSION['message'] = 'YO! Register yourself!';

if (isset($_POST['register'])) {
	$correct = registrationCorrect();
	if ($correct) {
		$login = htmlspecialchars($_POST['username']);
		$password = $_POST['password'];
		$mail = htmlspecialchars($_POST['email']);
		$salt = mt_rand(100, 999);
		$pepper = mt_rand(1000, 9999);
		$tm = time();
		$password = md5(md5(md5($password).$salt).$pepper);
		if (mysql_query("INSERT INTO users (login,password,salt,pepper,mail_reg,mail,last_act,reg_date) VALUES ('".$login."','".$password."','".$salt."','".$pepper."','".$mail."','".$mail."','".$tm."','".$tm."')")) {
			$_SESSION['username'] = $login;
			$_SESSION['message'] = 'You have successfully registered a user called '.$_SESSION['username'];
			header('location: index.php');
		}
	} else {
		$_SESSION['message'] = 'Something went wrong with the registration';
		header('location: index.php');
	}
}

?>

<head>
	<title>Salt'n'pepper</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<div id="wrapper">
		<h1><?php echo $_SESSION['message']; ?></h1>
		<form method="POST" action="index.php" onsubmit="return Validate()" name="registrationForm">
			<div>
				<input type="text" name="username" class="formInput textInput" placeholder="Username">
				<div id="username__error" class="val_error"></div>
			</div>
			<div>
				<input type="email" name="email" class="formInput textInput" placeholder="Email">
				<div id="email__error" class="val_error"></div>
			</div>
			<div>
				<input type="password" name="password" class="formInput textInput" placeholder="Password">
			</div>
			<div>
				<input type="password" name="duplicate" class="formInput textInput" placeholder="Repeat password">
				<div id="password__error" class="val_error"></div>
			</div>
			<div>
				<input type="checkbox" name="boxbot" class="formInput" value="acceptYourFate" />
				<label>Not a <a href="http://www.gunnerkrigg.com/?p=203">Boxbot!</a></label>
				<div id="boxbot__error" class="val_error"></div>
			</div>
			<div>
				<input type="submit" name="register" class="formInput btn" value="Register">
			</div>
		</form>
	</div>
	<script type="text/javascript" src="script.js"></script>
</body>
</html>