<!DOCTYPE html>
<html>
<head>
	<title>My Sweaty Gym</title>
	<link rel="stylesheet" href="./styles.css">
</head>
<body>
	<div class="loginWrapper">
		<h1>Login</h1>
		<input id="Username" type="text" />
		<input id="Password" type="text" />
		<button onclick="getUserInformation(event)">Submit</button>
		<br />
		<br />
		<h1>Register</h1>
		<input type="text" id="RegisterUsername" />
		<input type="text" id="RegisterPassword" />
		<button onclick="submitRegistrationInformation(event)">Submit</button>
	</div>

	<script src="./script.js"></script>
</body>
</html>