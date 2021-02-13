<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title></title>
  <link rel="stylesheet" href="./styles.css">
</head>

<body onload="getSelfInformation()">
    <h1 class="selfHeader">Your Information</h1>
    <div class="selfCSSInfo" id="selfInfoWrapper">
        
    </div>

    <div class="createPlanWrapper">
        <h1>Create a Plan</h1>
        <input type="text" class="createPlanInput" placeholder="Description" />
        <input type="time" placeholder="Time" />
        <input type="text" class="createPlanInput" placeholder="Location" />
        <button onclick="submitPlan(event)">Submit</button>
    </div>

    <div>
        <h1 class="yourPostsHeaderYouKnow">Your Posts</h1>
        <div id="yourPostsWrapper"></div>
    </div>
  <script src="./script.js"></script>
</body>
</html>