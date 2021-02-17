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

  if (isset($_POST["loginTest"])) {
    $username = $_POST["username"];
    $passwd = password_hash($_POST["password"], PASSWORD_DEFAULT);
    $user = "failed";

    // echo $username . " " . $passwd;

    // $statement = $db->prepare('SELECT * from users WHERE username=:username');
    // $statement->bindValue(":username", $username, PDO::PARAM_STR);
    // $statement->execute();
    // while ($row = $statement->fetch(PDO::FETCH_ASSOC))
    // {
    // }

    foreach ($db->query('SELECT * from users WHERE username=' . '\'' . $username . '\'') as $row)
    {
      if (password_verify($row["password"], $passwd)) {
        $user = $row;
        $_SESSION["id"] = $row["id"];
      }
    }
    json_encode($user);
    echo $user;
  }

?>