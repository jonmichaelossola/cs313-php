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

  if (isset($_GET["test"])) {
    echo 'SELECT * FROM posts WHERE playerid!=\'' . $_SESSION["userID"] . '\'';
  }

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
    $statement = $db->query('SELECT * FROM posts WHERE playerid!=\'' . $_SESSION["userID"] . '\'');
    while ($row = $statement->fetch(PDO::FETCH_ASSOC))
    {
      $arr = array();
      array_push($arr, $row["time"], $row["location"], $row["description"], $row["timehours"]);
      array_push($plans, $arr);
    }
    echo json_encode($plans);
  }
?>