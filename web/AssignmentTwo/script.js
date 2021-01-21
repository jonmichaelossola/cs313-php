function getItems(reason) {
	// Make request to server for shopping cart items
	// Should return html list of items to put into <ul>
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if (this.readyState === 4 && this.status === 200) {
			const data = JSON.parse(this.responseText);
			console.log(data);
			if (reason === "cart") {
				// parse items into items unordered list
				let str = "";
				if (data[0].length > 0) {
					console.log(data[0]);
					for (var i = 0; i < data[0].length; i++) {
						var item = data[0][i];
						str += `<li><h3>${item}</h3><div><button data-animal=${item} onclick="removeFromCart(event)">Remove From Cart</button></div></li>`
					}
				} else {
					str = "<li><h2>You have no items in your cart</h2></li>"
				}
				document.getElementById("cartItemsHeader").innerHTML = `Your Cart Items (${data[1]})`;
				document.getElementById("cartItems").innerHTML = str;
			} else if (reason === "index") {
				// do stuff
			}
		}
	}
	xmlhttp.open("GET", "./eventsHandler.php?getItems=true");
	xmlhttp.send();
}

function addToCart(e) {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if (this.readyState === 4 && this.status === 200) {
			var test = JSON.parse(this.responseText);
			document.getElementById("cartReference").innerHTML = `See Cart (${test[1]}) items`;
		}
	}
	xmlhttp.open("GET", `./eventsHandler.php?item=${e.target.getAttribute("data-animal")}`);
	xmlhttp.send();
}

function removeFromCart(e) {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if (this.readyState === 4 && this.status === 200) {
			// re display items in the cart.
			const data = JSON.parse(this.responseText);
			let str = "";
			console.log(data[0]);
			if (data[0].length > 0) {
				for (var i = 0; i < data[0].length; i++) {
					var item = data[0][i];
					str += `<li><h3>${item}</h3><div><button data-animal=${item} onclick="removeFromCart(event)">Remove From Cart</button></div></li>`
				}
			} else {
				str = "<li><h2>You have no items in your cart</h2></li>"
			}
			document.getElementById("cartItemsHeader").innerHTML = `Your Cart Items (${data[1]})`;
			document.getElementById("cartItems").innerHTML = str;
		}
	}
	xmlhttp.open("GET", `./eventsHandler.php?removeItem=${e.target.getAttribute("data-animal")}`);
	xmlhttp.send();
}

function completePurchase() {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if (this.readyState === 4 && this.status === 200) {
			const data = this.responseText;
			if (data === "success") {
				window.location.href = "./confirm.html";
			}
		}
	}
	xmlhttp.open("GET", `./eventsHandler.php?confirmPurchase=true&address=${document.getElementById('address').value}`);
	xmlhttp.send();
}

function getConfirmationInfo() {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if (this.readyState === 4 && this.status === 200) {
			// re display items in the cart.
			const data = JSON.parse(this.responseText);
			let str = "";
			if (data[0].length > 0) {
				for (var i = 0; i < data[0].length; i++) {
					var item = data[0][i];
					str += `<li><h3>${item}</h3><div></div></li>`
				}
			} else {
				str = "<li><h2>You have no items in your cart</h2></li>"
			}
			document.getElementById("cartItemsHeader").innerHTML = `Your Purchased Items (${data[1]})`;
			document.getElementById("address").innerHTML = `Address: ${data[2]}`;
			document.getElementById("cartItems").innerHTML = str;
		}
	}
	xmlhttp.open("GET", `./eventsHandler.php?getAllDetails=true`);
	xmlhttp.send();
}