<?php
	session_start();
	$_SESSION["cart"]
	if (!isset($_SESSION["cart"])) {
		$_SESSION["cart"] = array();
	}

	if (isset($_GET['getItems'])) {
		echo "<li>Bear<div><button>Add To Cart</button></div></li><li>Cougar<div><button>Add To Cart</button></div></li><li>Panda<div><button>Add To Cart</button></div></li><li>Lion<div><button>Add To Cart</button></div></li><li>Giraffe</li>";
	}

	if (isset($_GET['item'])) {
		$item = $_GET['item'];
		array_push($_SESSION["cart"], $item);
		$myJson = json_encode($_SESSION["cart"]);
		echo $myJson;
	}

?>
