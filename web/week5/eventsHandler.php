<?php
  session_start();
  $dbUrl = getenv('DATABASE_URL');

  $dbOpts = parse_url($dbUrl);

  $dbHost = $dbOpts["host"];
  $dbPort = $dbOpts["port"];
  $dbUser = $dbOpts["user"];
  $dbPassword = $dbOpts["pass"];
  $dbName = ltrim($dbOpts["path"],'/');

  $db = new PDO("pgsql:host=$dbHost;port=$dbPort;dbname=$dbName", $dbUser, $dbPassword);

  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  if (isset($_POST["username"]) && isset($_POST["password"])) {
    $name = "";
    foreach ($db->query('SELECT * FROM players WHERE name=\'' . $_POST["username"] . '\' AND password=\'' . $_POST["password"] . '\'') as $row)
    {
      $name = $row["name"] . ' ' . $row["password"];
    }
    if (empty($name)) {
      echo "failed";
    }
    $_SESSION["userID"] = $row["id"]; 
    echo $name;
  }

  if (isset($_GET["id"]) && isset($_GET["posts"])) {
    $plans = array();
    $test = array();
    $statement = $db->query('SELECT * FROM plans WHERE userId!=\'' . $_SESSION["userID"] . '\'');
    while ($row = $statement->fetch(PDO::FETCH_ASSOC))
    {
      $arr = array();
      array_push($arr, $row["time"], $row["location"], $row["description"], $row["timehours"]);
      array_push($plans, $arr);
      array_push($test, $row["description"])
    }
    echo json_encode($test);
  }
?>