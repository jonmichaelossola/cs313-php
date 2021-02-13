function getUserInformation(e) {
  const username = document.getElementById("Username").value;
  const password = document.getElementById("Password").value;

  let request = new XMLHttpRequest();
  request.open("POST", "./eventsHandler.php", true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      if (this.responseText !== "failed") {
        window.location.href = "./home.php";
      }
    }
  };

  request.send(`login=true&username=${username}&password=${password}`);
}

function test() {
  let request = new XMLHttpRequest();
  request.open("GET", `./eventsHandler.php?test=true`, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };

  request.send();
}

function getPosts(e) {
  let request = new XMLHttpRequest();
  request.open("GET", `./eventsHandler.php?posts=true`, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const posts = JSON.parse(this.responseText);
      console.log(posts);
      let str = `<ul class="plansList">`;
      posts.forEach(function(arr) {
        str += `<li class="plansListIndividual"><div><p class="location">Location: ${
          arr[2]
        }</p><p class="date">Time: ${
          Number(arr[3].split(":")[0]) > 12
            ? (Number(arr[3].split(":")[0]) - 12).toString()
            : arr[3].split(":")[0]
        }:${arr[3].split(":")[1]} ${
          Number(arr[3].split(":")[0]) > 11 ? "PM" : "AM"
        }</p><p class="description">${arr[0]}</p></div></li>`;
      });
      str += "</ul>";
      document.getElementById("PostsContainer").innerHTML = str;
    }
  };

  request.send();
}

function getSelfInformation() {
  getSelfPosts();
  getSelfInfo();
}

function getSelfPosts() {
  let request = new XMLHttpRequest();
  request.open("GET", `./eventsHandler.php?selfposts=true`, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const posts = JSON.parse(this.responseText);
      console.log(posts);
      let str = `<ul class="plansList">`;
      posts.forEach(function(arr) {
        str += `<li class="plansListIndividual"><div class="postsIndividualWrapper"><div><p class="location">Location: ${
          arr["location"]
        }</p><p class="date">Time: ${
          Number(arr["timehours"].split(":")[0]) > 12
            ? (Number(arr["timehours"].split(":")[0]) - 12).toString()
            : arr["timehours"].split(":")[0]
        }:${arr["timehours"].split(":")[1]} ${
          Number(arr["timehours"].split(":")[0]) > 11 ? "PM" : "AM"
        }</p><p class="description">${
          arr["description"]
        }</p></div><div><button data-id="${
          arr["post_id"]
        }" onclick="deletePost(event)">Delete</button><a href="./updatePlan.php?id=${
          arr["post_id"]
        }&location=${arr["location"]}&description=${
          arr["description"]
        }&timeHours=${arr["timehours"]}">Update</a></div></div></li>`;
      });
      str += "</ul>";
      document.getElementById("yourPostsWrapper").innerHTML = str;
    }
  };

  request.send();
}

function getSelfInfo() {
  let request = new XMLHttpRequest();
  request.open("GET", `./eventsHandler.php?self=true`, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const info = JSON.parse(this.responseText);
      const str = `<h3 class="text-center">Name: ${
        info[0]
      }</h3><p class="text-center">City: ${info[1]}</p>`;
      document.getElementById("selfInfoWrapper").innerHTML = str;
    }
  };

  request.send();
}

function submitRegistrationInformation() {
  const username = document.getElementById("RegisterUsername").value;
  const password = document.getElementById("RegisterPassword").value;
  const city = document.getElementById("City").value;

  console.log(username, password, city);
  let request = new XMLHttpRequest();
  request.open("POST", "./eventsHandler.php", true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      if (this.responseText === "registered") {
        window.location.href = "./home.php";
      }
    }
  };

  request.send(
    `register=true&username=${username}&passphrase=${password}&city=${city}`
  );
}

function formatDateForToday() {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function submitPlan() {
  const description = document.getElementById("PlanDescription").value;
  const timePlan = document.getElementById("TimePlan").value + ":00";
  const location = document.getElementById("Location").value;
  const timeDays = formatDateForToday();

  console.log(description, timePlan, location, timeDays);
  let request = new XMLHttpRequest();
  request.open("POST", "./eventsHandler.php", true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      if (this.responseText === "registered") {
        window.location.href = "./home.php";
      }
    }
  };

  request.send(
    `createPost=true&time=${timeDays}&location=${location}&description=${description}&timeInHours=${timePlan}`
  );
}

function deletePost(e) {
  const id = e.target.getAttribute("data-id");

  console.log(id);
  let request = new XMLHttpRequest();
  request.open("POST", "./eventsHandler.php", true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      if (this.responseText === "Post Deleted") {
        location.reload();
      }
    }
  };

  request.send(`deletePost=true&id=${id}`);
}

function updatePost(e) {
  const id = e.target.getAttribute("data-id");
  const description = document.getElementById("PlanDescription").value;
  const timePlan = document.getElementById("TimePlan").value + ":00";
  const location = document.getElementById("Location").value;
  const timeDays = formatDateForToday();

  let request = new XMLHttpRequest();
  request.open("POST", `./eventsHandler.php`, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      if (this.responseText === "Post Deleted") {
        window.location.href = "./plan.php";
      }
    }
  };

  request.send(
    `updatePost=true&id=${id}&time=${timeDays}&timeInHours=${timePlan}&description=${description}&location=${location}`
  );
}

function likePost() {}
