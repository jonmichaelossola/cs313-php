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

  if (isset($_POST["login"]) && isset($_POST["username"]) && isset($_POST["password"])) {
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

  if (isset($_GET["posts"])) {
    $plans = array();
    foreach ($db->query('SELECT * FROM posts WHERE playerid!=\'' . $_SESSION["userID"] . '\'') as $row)
    {
      $arr = array();
      array_push($arr, $row["description"], $row["time"], $row["location"], $row["timehours"]);
      array_push($plans, $arr);
    }
    echo json_encode($plans);
  }

  if (isset($_GET["selfposts"])) {
    $plans = array();
    foreach ($db->query('SELECT * FROM posts WHERE playerid=\'' . $_SESSION["userID"] . '\'') as $row)
    {
      array_push($plans, $row);
    }
    echo json_encode($plans);
  }

  if (isset($_GET["self"])) {
    $arr = array();
    foreach ($db->query('SELECT * FROM players WHERE id=\'' . $_SESSION["userID"] . '\'')  as $row)
    {
      array_push($arr, $row["name"], $row["city"]);
    }
    echo json_encode($arr);
  }

  // INSERT OPERATIONS
  if (isset($_POST["register"])) {
    $username = $_POST["username"];
    $passphrase = $_POST["passphrase"];
    $city = $_POST["city"];
    $id = 0;
    // get largest ID from database
    foreach ($db->query('SELECT id from players') as $row)
    {
      $id = $row["id"];
    }
    $id+=1;
    // Insert player into database
    $stmt = $db->prepare('INSERT INTO players (name, city, id, password) VALUES (:username, :city, :id, :passphrase)');
    $stmt->bindValue(":username", $username, PDO::PARAM_STR);
    $stmt->bindValue(":city", $city, PDO::PARAM_STR);
    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
    $stmt->bindValue(":passphrase", $passphrase, PDO::PARAM_STR);
    $stmt->execute();
    echo "registered";
  }

  if (isset($_POST["createPost"])) {
    $playerID = $_SESSION["userID"];
    $time = $_POST["time"];
    $location = $_POST["location"];
    $description = $_POST["description"];
    $timeInHours = $_POST["timeInHours"];

    $stmt = $db->prepare('INSERT INTO posts (playerid, time, location, description, timehours) VALUES (:playerID, :time, :location, :description, :timeInHours)');
    $stmt->bindValue(":playerID", $playerID, PDO::PARAM_STR);
    $stmt->bindValue(":time", $time, PDO::PARAM_STR);
    $stmt->bindValue(":location", $location, PDO::PARAM_STR);
    $stmt->bindValue(":description", $description, PDO::PARAM_STR);
    $stmt->bindValue(":timeInHours", $timeInHours, PDO::PARAM_STR);
    $stmt->execute();
    echo "Post Created";
  }

  if (isset($_POST["deletePost"])) {
    $id = $_POST["id"];
    $stmt = $db->prepare('DELETE FROM posts WHERE post_id=:id');
    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
    $stmt->execute();
    echo "Post Deleted";
  }

  if (isset($_POST["updatePost"])) {
    $id = $_POST["id"];
    $time = $_POST["time"];
    $location = $_POST["location"];
    $description = $_POST["description"];
    $timeInHours = $_POST["timeInHours"];
    // echo $id . " " . $location . " " . $time . " " . $description . " " . $timeInHours;
    $stmt = $db->prepare('UPDATE posts SET location = :location, time = :time, timehours = :timeInHours, description = :description WHERE post_id = :id');
    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
    $stmt->bindValue(":time", $time, PDO::PARAM_STR);
    $stmt->bindValue(":location", $location, PDO::PARAM_STR);
    $stmt->bindValue(":description", $description, PDO::PARAM_STR);
    $stmt->bindValue(":timeInHours", $timeInHours, PDO::PARAM_STR);
    $stmt->execute();
    echo "Post Updated";
  }

  if (isset($_POST["likePost"])) {
    $playerID = $_SESSION["userID"];
    $postID = $_POST["postID"];

    $stmt = $db->prepare('INSERT INTO likes (player_id, post_id) VALUES (:playerID, :postID)');
    $stmt->bindValue(":userID", $playerID, PDO::PARAM_STR);
    $stmt->bindValue(":postID", $postID, PDO::PARAM_INT);
    $stmt->execute();
    echo "Like Recorded";
  }
?>