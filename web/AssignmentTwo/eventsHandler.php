<?php
	session_start();
	if (!isset($_SESSION["cart"])) {
		$_SESSION["cart"] = array();
		$_SESSION["numItems"] = 0;
	}

	if (isset($_GET['item'])) {
		$item = $_GET['item'];
		array_push($_SESSION["cart"], $item);
		$_SESSION["numItems"] += 1;
		$temp = array();
		array_push($temp, $_SESSION["cart"]);
		array_push($temp, $_SESSION["numItems"]);
		$myJson = json_encode($temp);
		echo $myJson;
	}

?>
