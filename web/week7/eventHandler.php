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

  if (isset($_POST["register"])) {
    // create username / passwd in db
    $id = rand();
    $username = $_POST["username"];
    $passwd = password_hash($_POST["password"], PASSWORD_DEFAULT);

    // echo $id . " " . $username . " " . $passwd;

    $stmt = $db->prepare('INSERT INTO users (id, username, password) VALUES (:id, :username, :password)');
    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
    $stmt->bindValue(":username", $username, PDO::PARAM_STR);
    $stmt->bindValue(":password", $passwd, PDO::PARAM_STR);
    $stmt->execute();
    echo "registered";
  }

  if (isset($_POST["login"])) {
    $username = $_POST["username"];
    $passwd = password_hash($_POST["password"], PASSWORD_DEFAULT);
    $user = "";

    foreach ($db->query('SELECT * from users WHERE username=' . '\'' . $username . '\'') as $row)
    {
      if (password_verify($passwd, $row["password"])) {
        $user = $row;
      }
    }
    json_encode($user);
    echo $user;
  }

?>