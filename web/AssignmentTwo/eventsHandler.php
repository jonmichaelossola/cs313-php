<?php
	session_start();

	if (!isset($_SESSION["cart"])) {
		$_SESSION["cart"] = array();
		$_SESSION["numItems"] = 0;
	}

	if (isset($_GET["getNumItems"])) {
		echo $_SESSION["numItems"];
	}

	if (isset($_GET["getItems"])) {
		$temp = array();
		array_push($temp, $_SESSION["cart"]);
		array_push($temp, $_SESSION["numItems"]);
		$myJson = json_encode($temp);
		echo $myJson;
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

	if (isset($_GET['removeItem'])) {
		$item = $_GET['removeItem'];
		if (($key = array_search($item, $_SESSION["cart"])) !== false) {
			array_splice($_SESSION["cart"], $key, 1);
			$_SESSION["numItems"] -= 1;
		}
		$temp = array();
		array_push($temp, $_SESSION["cart"]);
		array_push($temp, $_SESSION["numItems"]);
		$myJson = json_encode($temp);
		echo $myJson;
	}

	if (isset($_GET['confirmPurchase'])) {
		$address = htmlspecialchars($_GET["address"]);
		$_SESSION["address"] = $address;
		echo "success";
	}

	if(isset($_GET["getAllDetails"])) {
		$temp = array();
		array_push($temp, $_SESSION["cart"]);
		array_push($temp, $_SESSION["numItems"]);
		array_push($temp, $_SESSION["address"]);
		$myJson = json_encode($temp);
		echo $myJson;
	}

?>
