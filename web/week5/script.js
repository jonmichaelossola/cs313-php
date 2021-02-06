function getUserInformation(e) {
	console.log('hello');
	const username = document.getElementById('Username').value;
	const password = document.getElementById('Password').value;

	let request = new XMLHttpRequest();
	request.open("POST", "./eventsHandler.php", true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	request.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	console.log(this.responseText);
	    	if (this.responseText === "success") {
	    		// window.location.href.push("home.php");
	    	}
	       // Typical action to be performed when the document is ready:
	       document.getElementById("demo").innerHTML = this.responseText;
	    }
	};

	request.send(`username=${username}&password=${password}`);
}

function submitRegistrationInformation(e) {
	// to make when we can update and create data
}