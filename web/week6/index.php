<!DOCTYPE html>
<html>
<head>
	<title>My Sweaty Gym</title>
	<link rel="stylesheet" href="./styles.css">
</head>
<body>
	<div class="loginWrapper">
		<h1>Login</h1>
		<input id="Username" placeholder="User Name" type="text" />
		<input id="Password" placeholder="Password" type="password" />
		<button onclick="getUserInformation(event)">Submit</button>
		<br />
		<br />
		<h1>Register</h1>
		<input type="text" placeholder="User Name" id="RegisterUsername" />
		<input type="password" placeholder="Password" id="RegisterPassword" />
		<input type="text" placeholder="Your City" id="City">
		<button onclick="submitRegistrationInformation(event)">Submit</button>
	</div>

	<script src="./script.js"></script>
</body>
</html>