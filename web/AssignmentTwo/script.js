console.log('hello?');

function testFunction() {
	// Make request to server for shopping cart items
	// Should return html list of items to put into <ul>
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if (this.readyState === 4 && this.status === 200) {
			console.log(this.responseText);
			// document.getElementById("test").innerHTML = this.responseText;
		}
	}
	xmlhttp.open("GET", "./eventsHandler.php?getItems=true");
	xmlhttp.send();
}

function addToCart(e) {
	console.log(e.target);
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if (this.readyState === 4 && this.status ===200) {
			console.log(this.responseText);
			var test = JSON.parse(responseText);
			// do stuff
			console.log(test);
		}
	}
	xmlhttp.open("GET", `./eventsHandler.php?item=${e.target.getAttribute("data-animal")}`);
	xmlhttp.send();
}