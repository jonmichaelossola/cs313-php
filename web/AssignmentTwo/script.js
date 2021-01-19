function testFunction() {
	// Make request to server for shopping cart items
	// Should return html list of items to put into <ul>
	console.log('getting items');
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if (this.readyState === 4 && this.status === 200) {
			console.log(this.responseText);
			document.getElementById("test").innerHTML = this.responseText;
		}
	}
	xmlhttp.open("GET", "./eventsHandler.php?getItems=true");
	xmlhttp.send();
}