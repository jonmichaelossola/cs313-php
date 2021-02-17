function submitRegistrationInfo() {
	console.log('hello world');
	// AJAX
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	let request = new XMLHttpRequest();
	  request.open("POST", "./eventHandler.php", true);
	  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	  request.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      console.log(this.responseText);
	      if (this.responseText !== "failed") {
	        window.location.href = "./home.php";
	      }
	    }
	  };

	  request.send(`register=true&username=${username}&password=${password}`);
}

function submitLoginInfo() {
	console.log('hello world 2');
	// AJAX
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	let request = new XMLHttpRequest();
	  request.open("POST", "./eventHandler.php", true);
	  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	  request.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      console.log(this.responseText);
	      // if (this.responseText !== "failed") {
	      //   window.location.href = "./home.php";
	      // }
	    }
	  };

	  request.send(`loginTest=true&username=${username}&password=${password}`);
}