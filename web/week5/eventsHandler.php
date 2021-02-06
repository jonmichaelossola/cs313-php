<?php
  try
  {
    $dbUrl = getenv('DATABASE_URL');

    $dbOpts = parse_url($dbUrl);

    $dbHost = $dbOpts["host"];
    $dbPort = $dbOpts["port"];
    $dbUser = $dbOpts["user"];
    $dbPassword = $dbOpts["pass"];
    $dbName = ltrim($dbOpts["path"],'/');

    $db = new PDO("pgsql:host=$dbHost;port=$dbPort;dbname=$dbName", $dbUser, $dbPassword);

    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }
  catch (PDOException $ex)
  {
    echo 'Error!: ' . $ex->getMessage();
    die();
  }

  if (isset($_POST["username"]) && isset($_POST["password"])) {
    echo $_POST["username"];
    // foreach ($db->query('SELECT name, password FROM note_user WHERE name=' . $_POST['username'] . ' AND password=' . $_POST['password']) as $row)
    // {
    //   if ($row['username'] === $_POST['username'] && $row['password'] === $_POST['password']) {
    //     echo "successfully logged in";
    //   }
    // }
  }

  // if (isset($_GET["id"]) && isset($_GET["posts"])) {
  //   echo "here we go";
  //   $plans = array();
  //   $statement = $db->query('SELECT * FROM plans WHERE userId!=' . $_GET["id"]);
  //   while ($row = $statement->fetch(PDO::FETCH_ASSOC))
  //   {
  //     $arr = array();
  //     array_push($arr, $row["time"], $row["location"], $row["description"], $row["timehours"], $row["playerid"])
  //     array_push($plans, )
  //   }
  //   echo "statement";
  // }
?>