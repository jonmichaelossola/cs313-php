document.getElementById("testButton").addEventListener("click", function() {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if (this.readyState==4 && this.status==200) {
			document.getElementById("testDiv").innerHTML = this.responseText;
		}
	}
	xmlhttp.open("GET","./test.php?test=true");
	xmlhttp.send();
})