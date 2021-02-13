<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Update A Plan</title>
  <link rel="stylesheet" href="./styles.css">
</head>

<body>
    <div class="createPlanWrapper">
        <h1>Update your Plan</h1>
        <input type="text" id="PlanDescription" class="createPlanInput" placeholder="Description" value="<?php echo $_GET["description"]; ?>" />
        <input type="time" id="TimePlan" placeholder="Time" value="<?php echo $_GET["timeHours"]; ?>" />
        <input type="text" id="Location" class="createPlanInput" placeholder="Location" value="<?php echo $_GET["location"]; ?>" />
        <button data-id="<?php echo $_GET["id"]; ?>" onclick="updatePost(event)">Submit</button>
    </div>

  <script src="./script.js"></script>
</body>
</html>